import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-community/async-storage"
import {v4 as uuid } from 'uuid';

const updateStoragedCurrentList = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
}

export const useCurrentList = () => {
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

    return {
        list,
        loading,
        addItem,
        removeItem,
    }
}