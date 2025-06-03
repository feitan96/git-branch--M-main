import { useState } from "react";

export const useUserForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [editingUser, setEditingUser] = useState(null);
    const [showForm, setShowForm] = useState(false);

    //reset form to initial state
    const resetForm = () => {
        setUserData({
            name: '',
            email: '',
            password: '',
        });
        setEditingUser(null);
        setShowForm(false);
    }

    //start editing user
    const startEditingUser = (user) => {
        setEditingUser(user);
        setUserData({
            name: user.name,
            email: user.email,
            password: ''
        });
        setShowForm(true);
    }

    //update form field
    const updateFormField = (field, value) => {
        setUserData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    //toggle form visibility
    const toggleForm = () => {
        if (showForm) {
            resetForm();
        } else {
            setShowForm(true);
        }
    }

    //validate form data
    const validateForm = () => {
        const errors = {};

        if (!userData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!userData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!userData.password.trim()) {
            errors.password = 'Password is required';
        } else if (userData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        return errors;
    }

    return {
        userData,
        editingUser,
        showForm,
        resetForm,
        startEditingUser,
        updateFormField,
        toggleForm,
        validateForm,
    }   
}