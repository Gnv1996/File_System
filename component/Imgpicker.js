import React from "react"
import {View,Text,Platform,Button} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {useState,useEffect} from 'react-native'
import { StatusBar } from "expo-status-bar"




const Imgpicker=()=>{
    const[image,setImage]=useState('')

    useEffect(async()=>{
        if(Platform.OS !=='web'){
            const {status}=await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status !=='granted'){
                alert('Permission Deined!')
            }

        }

    },[])

    const PickImage=async ()=>{
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        console.log(result)
        if(!result.canceled){
            setImage(result.uri)
        }
    }

    return(
        <View>
            <Text>Upload Image</Text>
            <Button title='Choose Image' onPress={PickImage}/>
           {image && <Image source={{uri:image}} style={{width:200,height:200}}/>}
           <StatusBar style="auto"/>
        </View>

    )
}
export default Imgpicker;