const API_BASE_URL = 'http://localhost:8080/api/users';

export const userSevice = {
    //getAllUsers
    async getAllUsers() {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return await response.json();
        } catch (error) {
            throw new Error('Error fetching users:', error);
        }
    },

    //getUserById
    async getUserById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch user with ID ${id}: ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Error fetching user with ID ${id}:`, error);
        }
    },

    //create
    async createUser(userData) {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create user: ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error('Error creating user:', error);
        }
    },

    //update existing user
    async updateUser(id, userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update user with ID ${id}: ${errorText}`);   
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Error updating user with ID ${id}:`, error);
        }
    },

    //delete
    async deleteUser(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete user with ID ${id}: ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Error deleting user with ID ${id}:`, error);
        }
    }
}