import { useState } from "react";
import { userSevice } from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  //fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await userSevice.getAllUsers();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //fetch user by id
  const fetchUserById = async (id) => {
    setLoading(true);
    setError('');
    try {
      const data = await userSevice.getUserById(id);
      setUsers([data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //create new user
  const createUser = async (userData) => {
    setLoading(true);
    setError('');
    try {
      const newUser  = await userSevice.createUser(userData);
      setUsers(prevUsers => [...prevUsers, newUser]);
      return newUser;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  //update existing user
  const updateUser = async (id, userData) => {
    setLoading(true);
    setError('');
    try {
        const updatedUser = await userSevice.updateUser(id, userData);
        setUsers(prevUsers => 
            prevUsers.map(user => user.id === id ? updatedUser : user)
        );
        setSuccess('User updated successfully');
        return updatedUser;
    } catch (error) {
        setError(error.message);
        throw error;
    } finally {
        setLoading(false);
    }
  }

  //delete existing user
  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
        return false;
    }

    setLoading(true);
    setError('');
    try {
        await userSevice.deleteUser(id);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        setSuccess('User deleted successfully');
        return true;
    } catch (error) {
        setError(error.message);
        throw error;
    } finally {
        setLoading(false);
    }
  }

  return {
    users,
    loading,
    error,
    success,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser
  }

}