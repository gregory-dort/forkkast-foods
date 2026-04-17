import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AccountSettingsForm = () => {
    const { user, isAuthenticated } = useAuth();

    return (
        <div>

        </div>
    )
}

export default AccountSettingsForm;