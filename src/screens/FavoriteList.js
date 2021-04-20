import React from 'react'
import { SectionList, Text, SafeAreaView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'

import { useCurrentList } from '../util/ListManager';
import ListItem, { SectionHeader, Separator } from '../component/ListItem'

export default ({route}) => {
    const { 
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart,
        favoritesList,
        addToFavouriteList
    } = useCurrentList()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
            <SectionList
                    sections={[
                        {data: favoritesList}
                    ]}
                    renderItem={({item, index}) => (
                        <ListItem
                            name={item.name}
                            onFavoritePress={() => addToFavouriteList()}
                            isFavorite={item.id}
                        />
                    )}
                    KeyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Separator />}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
