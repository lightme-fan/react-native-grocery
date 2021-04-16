import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import {v4 as uuid } from 'uuid';

import nachos from '../data/nachos';
import ListItem, { Separator } from '../component/ListItem';
import AddItem from '../component/AddItem';

const updateStoragedCurrentList = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
}

export default () => {
    const [ list, setList ] = useState([])
    const [ loading, setLoading ] = useState(true)
    
    const addItem = (text) => {
        const newList = [{id: uuid(), name: text}, ...list] 
        setList(newList)
        updateStoragedCurrentList(newList)
    } 

    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id)
        setList(newList)
        updateStoragedCurrentList(newList)
    }

    useEffect(() => {
        setTimeout(() => {            
            AsyncStorage.getItem('@@GroceryList/currentList')
            .then(data => JSON.parse(data))
            .then(data => {
                if (data) {
                    setList(data)
                }
                setLoading(false)
            })
        }, 1000);
    }, [])

    if (loading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>            
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <FlatList
                    data={list}
                    renderItem={({item, index}) => (
                        <ListItem
                            name={item.name}
                            onFavoritePress={() => alert('todo: handle favorite')}
                            isFavorite={index < 2}
                            onAddedSwipe={() => removeItem(item.id)}
                            onDeleteSwipe={() => removeItem(item.id)}
                        />
                    )}
                    KeyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator />}
                    ListHeaderComponent={() => (
                        <AddItem 
                            onSubmitEditing={({ nativeEvent: { text } }) => addItem(text)}
                        />
                    )}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}