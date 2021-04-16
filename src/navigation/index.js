import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import CurrentList from '../screens/CurrentList'

const Stack = createStackNavigator()

const CurrentListStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="CurrentList" component={CurrentList} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default CurrentListStack
