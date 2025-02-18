import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import AppStack from "./AppStack"
import AuthStack from "./AuthStack"
import { useState } from "react";
import NavigationService from "../services/NavigationService";
import { useDispatch, useSelector } from 'react-redux';
import { AuthRepo } from '../services/authRepository';
import { Text, View } from 'react-native';
import SplashScreen from '../screens/SplashScreen';

export default () => {
    const [loading, setLoading] = useState(true);
    const { loggedIn } = useSelector((state) => state.auth || {});
    const dispatch = useDispatch();

    React.useEffect(() => {
        (() => {
            try {
                dispatch(AuthRepo.updateUser())
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => setLoading(false), 3000);
            }
        })()

    }, [])


    if (loading) {
        return <SplashScreen/>
    }

    return (
        <NavigationContainer ref={NavigationService.navigationRef}>
            { loggedIn ? <AppStack /> : <AuthStack /> }
        </NavigationContainer>
    )

}