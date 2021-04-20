import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-community/async-storage"
import {v4 as uuid } from 'uuid';

const updateStoragedCurrentList = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
}

const updateStoragedCurrentCart = (list) => {
    AsyncStorage.setItem('@@GroceryCart/currentCart', JSON.stringify(list))
}

const updateStoragedFavouriteList = (list) => {
    AsyncStorage.setItem('@@GroceryCart/favouritesList', JSON.stringify(list))
}

export const useCurrentList = () => {
    const [ list, setList ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ cart, setCart ] = useState([])
    // const [ isFavorited, setIsFavorited ] = useState(false)
    const [ favoritesList, setFavoritesList ] = useState([])
    
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

    const addToCart = (item) => {
        removeItem(item.id)
        const newCart = [item, ...cart] 
        setCart(newCart)
        updateStoragedCurrentCart(newCart)
    }

    // const handleFavorite = (id) => {
    //     alert('Favorite', id)
    // }

    const addToFavouriteList = (item) => {
        const favoritedList  = list.filter(i => {
            if (i.id === item.id) {
                return i.isFavorite = true
            }
        })
        const newList = [item, ...favoritesList]
        // setList(favoritesList)
        setFavoritesList(newList)
        updateStoragedFavouriteList(newList)
        updateStoragedFavouriteList(favoritedList)
    }

    useEffect(() => {
        setTimeout(() => {            
            Promise.all([
                AsyncStorage.getItem('@@GroceryList/currentList'), 
                AsyncStorage.getItem('@@GroceryCart/currentCart'),
                AsyncStorage.getItem('@@GroceryCart/favouritesList'),
            ])
            .then(([list, cartItems, favoritesItem ]) => [JSON.parse(list), JSON.parse(cartItems), JSON.parse(favoritesItem)])
            .then(([list, cartItems, favoritesItem ]) => {
                if (list) {
                    setList(list)
                }
                if (cartItems) {
                    setCart(cartItems)
                }
                if (favoritesItem) {
                    setFavoritesList(favoritesItem)
                }
                setLoading(false)
            })
        }, 1000);
    }, [])

    return {
        list,
        loading,
        addItem,
        removeItem,
        cart,
        addToCart,
        favoritesList,
        addToFavouriteList
    }
}