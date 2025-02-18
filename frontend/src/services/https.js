import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class Http {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "http://192.168.1.3:5000",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.axiosInstance.interceptors.request.use(
            async (config) => {
                const tokenData = await AsyncStorage.getItem('user');
                console.log(tokenData,'jjj')
                if (tokenData && tokenData) {
                    config.headers.Authorization = `Bearer ${tokenData}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.axiosInstance.interceptors.response.use(
            (response) => { return response.data },
            (error) => Promise.reject(error)
        );

    }

    async get(url, config = {}) {
        try {
            return await this.axiosInstance.get(url, config);
        } catch (error) {
            return this.handleErrors(error);
        }
    }

    async post(url, data = {}, config = {}) {
        try {
            return await this.axiosInstance.post(url, data, config);
        } catch (error) {
            return this.handleErrors(error);
        }
    }

    async put(url, data = {}, config = {}) {
        try {
            return await this.axiosInstance.put(url, data, config);
        } catch (error) {
            return this.handleErrors(error);
        }
    }

    async patch(url, data = {}, config = {}) {
        try {
            return await this.axiosInstance.patch(url, data, config);
        } catch (error) {
            return this.handleErrors(error);
        }
    }

    async delete(url, config = {}) {
        try {
            return await this.axiosInstance.delete(url, config);
        } catch (error) {
            return this.handleErrors(error);
        }
    }
    handleErrors(error) {
        if (error.response) {
            const { data, status } = error.response;
            console.error(`Error ${status}:`, data);
            Alert.alert('Error', data.message || 'Something went wrong');
        } else if (error.request) {
            console.error('No response received:', error.request);
            Alert.alert('Network Error', 'No response from server');
        } else {
            console.error('Request setup error:', error.message);
            Alert.alert('Error', error.message);
        }
        return Promise.reject(error);
    }

}


export default new Http()