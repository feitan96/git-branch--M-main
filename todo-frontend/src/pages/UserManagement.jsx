import React, { useEffect } from 'react'
import { useUsers } from '../hooks/useUsers'
import { useUserForm } from '../hooks/userUserForm'
import UserTable from '../components/UserTable'
import UserForm from '../components/UserForm'

const UserManagement = () => {
  const {
    users,
    loading,
    error,
    success,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  } = useUsers();

  const {
    userData,
    editingUser,
    showForm,
    resetForm,
    startEditingUser,
    updateFormField,
    toggleForm,
    validateForm,
  } = useUserForm();

  //fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, [])

  //handel form submit
  const handleSubmit = async () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      //handle form validation errors
      const errorMessages = Object.values(errors).join(', ')
      alert(errorMessages)
      return
  }

      try {
        if (editingUser) {
          await updateUser(editingUser.id, userData)
        } else {
          await createUser(userData)
        }
        resetForm();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }

    //handle edit 
    const handleEdit = (user) => {
      startEditingUser(user)
    }

    //handle delete
    const handleDelete = async (userId) => {
      try {
        const confirmed = window.confirm('Are you sure you want to delete this user?')
        if (confirmed) {
          await deleteUser(userId)
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }

    //handle cancel
    const handleCancel = () => {
      resetForm()
    }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-gray-600">
            Manage your application users - create, edit, and delete user accounts.
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Add User Button */}
        {!showForm && (
          <div className="mb-6">
            <button
              onClick={toggleForm}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add New User
            </button>
          </div>
        )}

        {/* User Form */}
        {showForm && (
          <div className="mb-8">
            <UserForm
              userData={userData}
              onFieldChange={updateFormField}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Users Table */}
        <UserTable
          users={users}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default UserManagement