import React from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import CurrentList from '../screens/CurrentList'
import ItemDetails from '../screens/ItemDetails'

const Stack = createStackNavigator()

const CurrentListStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="CurrentList" component={CurrentList} />
                <Stack.Screen 
                    name='ItemDetails'
                    component={ItemDetails} 
                    options={({ route }) => {
                        return {
                            headerTitle: () => (
                                <Text>{route.params.item.name}</Text>
                            )
                        }
                    }
                }/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default CurrentListStack
