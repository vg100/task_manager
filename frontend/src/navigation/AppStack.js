import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddTaskScreen from '../screens/AddTaskScreen';
import HomeScreen from '../screens/HomeScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';



const Stack = createStackNavigator();


const appScreens = [
    {
        name: 'home',
        component: HomeScreen,
    },
    {
        name: 'addTask',
        component: AddTaskScreen,
    },

    {
        name: 'taskDetail',
        component: TaskDetailsScreen,
    },
];

const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false,}}>
        {appScreens.map(({ name, component }) => (
            <Stack.Screen key={name} name={name} component={component} />
        ))}
    </Stack.Navigator>
);

export default AppStack;
