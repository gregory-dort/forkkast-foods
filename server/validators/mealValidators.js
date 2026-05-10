const validateName = (name) => {
    /* 
    This method checks if meal name is not empty, is a string and that the name exists.

    The last section of this method verifies the meal name is less than 100 characters to prevent large inputs.
    */

    if (!name || typeof name !== 'string') {
        return { valid: false, error: 'Invalid meal name' };
    }

    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
        return { valid: false, error: 'Meal name cannot be empty' };
    }

    if (trimmedName.length > 100) {
        return { valid: false, error: 'Meal name is too long' };
    }

    return { valid: true, value: trimmedName };
};

const validateServings = (servings) => {
    /*
    This methods checks if the servings input is a number, is greater than 0 and less than 20 (most users won't cooking for more than 20 people at a time).

    Rounding decimal servings to one decimal place (4.6667 becomes 4.7).
    */

    const numServings = Number(servings);
    if (isNaN(numServings)) {
        return { valid: false, error: 'Invalid servings value' };
    }

    if (numServings <= 0) {
        return { valid: false, error: 'Servings must be greater than zero' };
    }

    if (numServings > 20) {
        return { valid: false, error: 'Servings value is too large' };
    }

    const roundedServings = Math.round(numServings * 10) /10;
    return { valid: true, value: roundedServings }
};

const validatePrepTime = (prepTime) => {
    /* 
    This method validates the prep time input by checking if the value exists, is a number, is greater than 0 and less than 24 hours. 
    */
   const numPrepTime = Number(prepTime);
   if (isNaN(numPrepTime)) {
    return { valid: false, error: 'Invalid prep time value' };
   }

   if (numPrepTime < 0) {
    return { valid: false, error: 'Prep time can not be negative' };
   }

   if (numPrepTime > 500) {
    return { valid: false, error: 'Prep time value is too large' };
   }

   return { valid: true, value: Math.round(numPrepTime) };
};

const validateIngredients = (ingredients) => {
    /*
    This method validates the ingredients input by checking if the value exists, is an array and every element within the array is a non-empty string.
    */

    if (!ingredients || !Array.isArray(ingredients)) {
        return { valid: false, error: 'Invalid ingredients value' };
    }

    if (ingredients.length === 0) {
        return { valid: false, error: 'There must be at least one ingredient' };
    }

    // for loop iterates through each ingredient while doing object checks
    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];

        if (typeof ingredient !== 'object' || ingredient == null) {
            return { valid: false, error: 'Invalid ingredient format' };
        }

        if (!ingredient.name || typeof ingredient.name !== 'string' || ingredient.name.trim().length === 0) {
            return { valid: false, error: 'Ingredient must have a name' };
        }

        if (ingredient.amount !== undefined && ingredient.amount !== null && ingredient.amount !== '') {
            if (isNaN(ingredient.amount) || ingredient.amount <= 0) {
                return { valid: false, error: 'Invalid ingredient amount'};
            }
            
            if (ingredient.amount <= 0) {
                return { valid: false, error: 'Ingredient must be greater than zero'};
            }
        }

        if (ingredient.unit !== undefined && ingredient.unit !== null && ingredient.unit !== '') {
            if (typeof ingredient.unit !== 'string' || ingredient.unit.trim().length === 0) {
                return { valid: false, error: 'Invalid ingredient unit' };
            }
        }
    }

    return { valid: true, value: ingredients };
};

const validateInstructions = (instructions) => {
    /*
    This method validates the instructions input by checking if the value exists, is in string format and if the instructions are too long. 
    
    This field could be left empty as some users may want to save the meal name and ingredients only.
    */

    if (!instructions || instructions === '') {
        return { valid: true, value: null };
    }

    if (typeof instructions !== 'string') {
        return { valid: false, error: 'Invalid instructions format or value' };
    }

    if (instructions.length > 10000) {
        return { valid: false, error: 'Instructions value is too long' };
    }

    return { valid: true, value: instructions.trim() };
};


const validateCategory = (category) => {
    /*
    This method validates the category input by checking if the value exists, if the value is one of the four pre-selected categories (breakfast, lunch, dinner, snack) and that the value is a string.

    This value is required on the meal entry form as it helps filter user meals by category.
    */

    const allowedCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

    if (!category || typeof category !== 'string') {
        return { valid: false, error: 'Invalid category' };
    }

    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    if (!allowedCategories.includes(capitalizedCategory)) {
        return { valid: false, error: 'Category must be one of the following: Breakfast, Lunch, Dinner, Snack' };
    }

    return { valid: true, value: capitalizedCategory };
};

module.exports = {
    validateName,
    validateServings,
    validatePrepTime,
    validateIngredients,
    validateCategory,
    validateInstructions
};
