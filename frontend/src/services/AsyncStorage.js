import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageService {

  static async setItem(key, data) {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
      console.log(`Saved ${key} successfully.`);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  }


  static async getItem(key) {
    try {
      const response = await AsyncStorage.getItem(key);
      return response ? JSON.parse(response) : null;
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      throw error;
    }
  }


  static async clearItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Removed ${key} successfully.`);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }


  static async clear() {
    try {
      await AsyncStorage.clear();
      console.log('Cleared all data from AsyncStorage.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      throw error;
    }
  }
}
