import React, { useEffect, useState } from 'react';
import { SectionList, Text, SafeAreaView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'

import nachos from '../data/nachos';
import ListItem, { SectionHeader, Separator } from '../component/ListItem';
import AddItem from '../component/AddItem';
import { useCurrentList } from '../util/ListManager';

export default ({route,  navigation }) => {
    const { 
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart,
        favoritesList,
        addToFavouriteList,
    } = useCurrentList()
    
    if (loading) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>            
        )
    }
    // console.log(favoritesList);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <SectionList
                    sections={[
                        {title: 'List', data: list},
                        {title: 'Cart', data: cart}
                    ]}
                    renderSectionHeader={({section}) => (<SectionHeader title={section.title} />)}
                    renderItem={({item, index}) => (
                        <ListItem
                            name={item.name}
                            onFavoritePress={() => addToFavouriteList(item)}
                            isFavorite={item.isFavorite}
                            onAddedSwipe={() => addToCart(item)}
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