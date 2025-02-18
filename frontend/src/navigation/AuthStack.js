import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/Signup';
import Login from '../screens/Login';


const Stack = createStackNavigator();

const authScreens = [
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'Signup',
    component: SignUp,
  },
];

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {authScreens.map(({ name, component }) => (
      <Stack.Screen key={name} name={name} component={component} />
    ))}
  </Stack.Navigator>
);

export default AuthStack;
