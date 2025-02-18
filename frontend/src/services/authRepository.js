import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthActionTypes } from "../redux/reducers/authReducer"
import { AsyncStorageService } from "./AsyncStorage"
import https from "./https"


export class AuthRepo {
    static signup(data) {
        return async (dispatch, getState) => {
            try {
                console.log(data, 'jjj')
                const res = await https.post("/auth/signup", data)
                console.log(res, 'fafaa')
            }
            catch (e) {
                console.log(e)
                dispatch({ type: AuthActionTypes.LOGIN_REQUEST_FAILURE, payload: e })
            }
        }
    }
    static login(data) {
        return async (dispatch, getState) => {
            try {
                dispatch({ type: AuthActionTypes.LOGIN_REQUEST })
                const res = await https.post("/auth/login", data)
                dispatch({ type: AuthActionTypes.LOGIN_REQUEST_SUCCESS, payload: res?.data })
                console.log(res,'login')
                await AsyncStorage.setItem('user', res?.token)
            }
            catch (e) {
                console.log(e,'error h')
                dispatch({ type: AuthActionTypes.LOGIN_REQUEST_FAILURE, payload: e })
            }
        }
    }
    static updateUser() {
        return async (dispatch, getState) => {
            try {
                const user = await AsyncStorage.getItem('user');
                console.log(user,'updateUser')
                if (user) {
                    dispatch({ type: AuthActionTypes.USER_UPDATE, payload: user });
                }
                return;
            } catch (error) {
                console.log(error,'error upadte')
                return Promise.reject(error);
            }
        };
    }
    static logout() {
        return async (dispatch) => {
           await AsyncStorage.multiRemove(['user']); 
           dispatch({ type: AuthActionTypes.USER_LOGOUT });
        };
     }
}
