import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'

import nachos from '../data/nachos';
import ListItem, { Separator } from '../component/ListItem';
import AddItem from '../component/AddItem';
import { useCurrentList } from '../util/ListManager';

export default ({route,  navigation }) => {
    const { 
        list,
        loading,
        addItem,
        removeItem,
    } = useCurrentList()
    
    if (loading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>            
        )
    }

    // const { itemId } = route.params

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
                            onRowPress={() => {
                                navigation.navigate('ItemDetails', { item })
                            }}
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