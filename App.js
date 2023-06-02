import React from "react";
import MyNav from "./component/MyNav.js";
import { NavigationContainer } from "@react-navigation/native";


const App=()=>{
  return(
    <NavigationContainer>
      <MyNav/>
    </NavigationContainer>
  )
}
export default App;