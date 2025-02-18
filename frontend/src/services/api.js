import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'YOUR_API_BASE_URL';

const getAuthToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const fetchTasks = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

// Similar implementations for:
// createTask, getTask, updateTask, deleteTask
// Example for createTask:
export const createTask = async (taskData) => {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  return response.json();
};