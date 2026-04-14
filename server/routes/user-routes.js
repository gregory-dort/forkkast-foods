const express = require('express');
module.exports = (supabase) => {
    /*
    These routes handle user login, logout and sign up operations of the web application utilizing the supabase authentication system by calling the appropriate APIs provided by supabase.

    The routes are as follows:
    signup (POST): creates a new user account and profile within the database
    signin (POST): allows a user to login with their credentials
    signout (POST): ends the users session by removing their JWT
    */

    const router = express.Router();

    router.post("/signup", async (req, res) => {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ error: "Missing required field: Name, Email, or Password." });
        }

        if (username.trim() === '' || /^\d+$/.test(username)) {
        return res.status(400).json({ error: "Username cannot be blank or contain only numbers." });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one symbol." });
        }

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                name: username,
                password: password
            })

            if (authError) {
                console.error('Supabase Auth Error: ', authError);
                return res.status(400).json({ error: authError.message });
            }

            const userID = authData.user.id;
            const { data: userData, error: userError } = await supabase
            .from('users')
            .insert({ id: userID, email: email, name: username});

            if (userError) {
                console.error('Supabase User Insert Error: ', userError);
                return res.status(500).json({ error: "Error creating user profile"});
            }

            return res.status(201).json({ 
                message: "User account created successfully",
                user: { userData }
             });

        } catch (error) {
            res.status(500).json({ error: "Unexpected error occurred" });
        }
    });

    router.post("/signin", async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing field required: email or password" });
        }

        try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword ({
                email: email,
                password: password
            });

            if (authError) {
                console.error('Invalid Credentials. Please try again.', authError);
                return res.status(400).json({ error: authError.message });
            }

            const { data: userData } = await supabase
            .from('users')
            .select('name')
            .eq('id', authData.user.id)
            .single();

            return res.status(200).json({ 
                message: 'User signed in successfully',
                user: { id: authData.user.id, name: userData.name }
            });

        } catch (error) {
            return res.status(500).json({ error: "Unexpected error occurred" });
        };
    });

    router.post("/signout", async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'No token provided' });
            }

            const { error } = await supabase.auth.admin.signOut(token);

            if (error) {
                console.error('Error signing out: ', error);
                return res.status(500).json({ error: "Unable to sign out. Please try again." });
            }

            return res.status(200).json({ message: "User signed out successfully" });
        }
        catch (error) {
            return res.status(500).json({ error: "Unexpected error occurred" });
        }
    });

    return router;
}