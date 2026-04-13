const express = require('express');
const verifyAuth = require('../middleware/auth');
const { validateName, validateIngredients, validatePrepTime, validateServings, validateCategory, validateInstructions } = require('../validators/mealValidators');

module.exports = (supabase) => {
  /*
  These routes handle the CRUD operations for meals. Each route is protected by verifyAuth to make sure only authenticated users can access them. 

  The routes are as follows: 
  add-meal (POST): Adds a new meal to a users collection
  delete-meal/:id (DELETE): deletes a meal within a users collection by searching for it by its mealID
  update-meal/:id (PUT): updates the information for a meal within a users collection
  get-meal/:id (GET): requests the information for one meal in a users collection
  all-meals (GET): requests the information for all meals in a users collection
  */

  const router = express.Router();

  router.post('/add-meal', verifyAuth, async(req, res) => {
    /*
        This route handles adding a meal to a user's collection. It validates the user is logged in prior to adding the meal to the database. mealValidators are used to validate the meal information before it is successfully added to the database.

        If any information is invalid an error is returned to the user with a message describing the issue. If the information is valid a success message is returned instead
    */

    try {
      const userID = req.user.id;

      if (!userID) {
        return res.status(401).json({ success: false, error: 'Authentication required' });
      }

      const { name, ingredients, servings, instructions, prep_time_minutes, category } = req.body;

      const nameValidation = validateName(name);
      if (!nameValidation.valid) {
        return res.status(400).json({ success: false, error: nameValidation.error });
      }

      const ingredientsValidation = validateIngredients(ingredients);
      if (!ingredientsValidation.valid) {
        return res.status(400).json({ success: false, error: ingredientsValidation.error });
      }

      const servingsValidation = validateServings(servings);
      if (!servingsValidation.valid) {
        return res.status(400).json({ success: false, error: servingsValidation.error });
      }

      const instructionsValidation = validateInstructions(instructions);
      if (!instructionsValidation.valid) {
        return res.status(400).json({ success: false, error: instructionsValidation.error });
      }

      const prepTimeValidation = validatePrepTime(prep_time_minutes);
      if (!prepTimeValidation.valid) {
        return res.status(400).json({ success: false, error: prepTimeValidation.error });
      }

      const categoryValidation = validateCategory(category);
      if (!categoryValidation.valid) {
        return res.status(400).json({ success: false, error: categoryValidation.error });
      }

      const {data, error} = await supabase
        .from('meals')
        .insert({
          user_id: userID,
          name: nameValidation.value,
          ingredients: ingredientsValidation.value,
          servings: servingsValidation.value,
          instructions: instructionsValidation.value,
          prep_time_minutes: prepTimeValidation.value,
          category: categoryValidation.value
        })
      
      if (error) {
        console.error('Database error creating meal', error);
        return res.status(500).json({ success: false, error: 'Unable to create meal. Please try again.' });
      }

      res.status(201).json({ success: true, message: 'Meal added successfully', meal: data });

    } catch (error) {
      console.error('Error adding meal', error);
      return res.status(500).json({ success: false, error: 'An unexpected error occurred. Please try again.' });
    }
  });

  router.delete('/delete-meal/:id', verifyAuth, async(req, res) => {
    /*
        This route handles deleting a meal from a user's collection. It validates the user is logged in prior to deleting the meal from the database. mealValidators are used to validate the meal information before it is successfully deleted from the database.

        If there is an issue with removing the meal an error is returned with a message describing the issue. If the meal is removed successfully a success message is returned instead.
    */

    try {
      const userID = req.user.id;
      const mealID = req.params.id;

      const { data, error } = await supabase
      .from('meals')
      .delete()
      .eq('id', mealID)
      .eq('user_id', userID)
      .select();

      if (error) {
      console.error('Database error deleting meal', error);
      return res.status(500).json({ success: false, error: 'Unable to delete meal. Please try again.' });
      }

      if (data.length === 0) {
        return res.status(404).json({ success: false, error: 'Meal not found' });
      }

      return res.status(200).json({ success: true, message: 'Meal deleted successfully.', meal: data });

    } catch (error) {
      console.error('Error deleting meal', error);
      return res.status(500).json({ success: false, error: 'An unexpected error occurred. Please try again.' });
    }
  });

  router.put('/update-meal/:id', verifyAuth, async(req, res) => {
    /*
      This route handles the logic to update a meal's information within a user's collection. It validates the user is logged in and that the meal exists prior to updating the meal information in the database. mealValidators are used to validate the updated information before it is successfully updated in the database.

      If there is an issue which updating the meal an error is returned with a message describing the issue. If the meal is updated successfully a success message is returned instead.

      This route allows partial updates so the user can send any combination of meal information they would like to update and only that information will be updated. 
      Ex: Updating meal name and prep time only vs. updating entire meal information.
    */
    try {
      const userID = req.user.id;
      const mealID = req.params.id;
      const { name, ingredients, servings, instructions, prep_time_minutes, category } = req.body;

      const updatedInformation = {};

      if (name !== undefined) {
        const validation = validateName(name);
        
        if (!validation.valid) { 
          return res.status(400).json({ success: false, error: nameValidation.error });
        }
        updatedInformation.name = validation.value;
      }
      
      if (ingredients !== undefined) {
        const validation = validateIngredients(ingredients);

        if (!validation.valid) {
          return res.status(400).json({ success: false, error: validation.error });
        }
        updatedInformation.ingredients = validation.value;
      }

      if (servings !== unddefined) {
        const validation = validateServings(servings);

        if (!validation.valid) {
          return res.status(400).json({ success: false, error: validation.error });
        }
        updatedInformation.servings = validation.value;
      }
      
      if (instructions !== undefined) {
        const validation = validateInstructions(instructions);

        if (!validation.valid) {
          return res.status(400).json({ success: false, error: validation.error });
        }
        updatedInformation.instructions = validation.value;
      }
      
      if (prep_time_minutes !== undefined) {
        const validation = validatePrepTime(prep_time_minutes);

        if (!validation.valid) {
          return res.status(400).json({ success: false, error: validation.error });
        }
        updatedInformation.prep_time_minutes = validation.value;
      }
      
      if (category !== undefined) {
        const validation = validateCategory(category);
        
        if (!validation.valid) {
          return res.status(400).json({ success: false, error: validation.error });
        }
        updatedInformation.category = validation.value;
      }

      if (Object.keys(updatedInformation).length === 0) {
        return res.status(400).json({ success: false, error: 'No information provided to update' });
      }

      const { data, error } = await supabase
        .from('meals')
        .eq('id', mealID)
        .eq('user_id', userID)
        .update(updatedInformation)
        .select()
        .single();
      
      if (error) {
        console.error('Database error updating meal', error);
        return res.status(500).json({ success: false, error: 'Unable to update meal. Please try again.' });
      }

      if (!data) {
        return res.status(404).json({ success: false, error: 'Meal not found' });
      }

      return res.status(200).json({ success: true, message: 'Meal updated successfully', meal: data });

    } catch (error) {
      console.error('Error updating meal', error);
      return res.status(500).json({ success: false, error: 'An unexpected error occurred. Please try again.' });
    }
  });

  router.get('/get-meal/:id', verifyAuth, async(req, res) => {
    /*
      This route handles retrieving a single meal from a user's collection by its id. It validates the user is logged in prior to retrieving the meal information from the database.

      If there is an issue with retrieving the meal information an error is returned with a message decribing the issue. If the meal is retrieved successfully a success message is returned along with the meal information instead.
    */

    try {
      const userID = req.user.id;
      const mealID = req.params.id;

      const { data, error } = await supabase
        .from('meals')
        .eq('id', mealID)
        .eq('user_id', userID)
        .select()
        .single();
      
      if (error) {
        console.error('Database error retrieving meal', error);
        return res.status(500).json({ success: false, error: 'Unable to retrieve meal. Please try again.' });
      }

      if (!data) {
        return res.status(404).json({ success: false, error: 'Meal not found.' });
      }

      return res.status(200).json({ success: true, meal: data });

    } catch (error) {
      console.error('Error retrieving meal', error);
      return res.status(500).json({ success: false, error: 'An unexpected error occurred. Please try again.' });
    }
  })

  router.get('/all-meals', verifyAuth, async(req, res) => {
    try {
      const userID = req.user.id;

      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', userID)
        .order('category', { ascending: true });
      
        if (error) {
          console.error('Database error retrieving meals', error)
          return res.status(500).json({ success: false, error: 'Unable to retrieve meals. please try again.' });
        }

        return res.status(200).json({ success: true, meals: data });

    } catch (error) {
      console.error('Error retrieving meals', error);
      return res.status(500).json({ success: false, error: 'An unexpected error occurred. Please try again.' });
    }
  });

  return router;
};