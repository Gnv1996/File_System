import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Camera from "./Camera";
import Map from "./Map";
import Audio from './Audio.js'
import Imgpicker from "./Imgpicker";


const Bottom=createBottomTabNavigator();

const MyNav=()=>{
    return(
        <Bottom.Navigator>
            <Bottom.Screen name='Audio_Rec' component={Audio}/>
            <Bottom.Screen name='Camera' component={Camera}/>
            <Bottom.Screen name='Map' component={Map}/>
            <Bottom.Screen name='Upload' component={Imgpicker}/>
            
          
        </Bottom.Navigator>

    )
}
export default MyNav;