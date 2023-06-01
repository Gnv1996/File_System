import React from "react";
import {View,Text,Image} from 'react-native';
import { useState,useEffect } from "react";


const Test=()=>{
    const[data,setData] =useState([])

    useEffect(()=>{
        fetch('https://fakestoreapi.com/products?sort=desc')
        .then((res)=>res.json())
        .then((data)=>setData(data))
    })

   
    return(
        <View>
    
                {data.map((user,index)=>{
                    return(
                        <View key={index}>
                            <Text>{user.title}</Text>
                            <Image source={require(user.image)} alt='Loading...'/>
                            <Text>{user.description}</Text>
                            </View>
                    )
                })}
           
        </View>
        
    )
}
export default Test;