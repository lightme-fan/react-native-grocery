import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-community/async-storage"
import {v4 as uuid } from 'uuid';

const updateStoragedCurrentList = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
}

const updateStoragedCurrentCart = (list) => {
    AsyncStorage.setItem('@@GroceryCart/currentCart', JSON.stringify(list))
}

export const useCurrentList = () => {
    const [ list, setList ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ cart, setCart ] = useState([])
    
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

    useEffect(() => {
        setTimeout(() => {            
            Promise.all([
                AsyncStorage.getItem('@@GroceryList/currentList'), 
                AsyncStorage.getItem('@@GroceryCart/currentCart'),
            ])
            .then(([list, cartItems ]) => [JSON.parse(list), JSON.parse(cartItems)])
            .then(([list, cartItems ]) => {
                if (list) {
                    setList(list)
                }

                if (cartItems) {
                    setCart(cartItems)
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
        addToCart
    }
}