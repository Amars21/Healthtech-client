import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import StartScreen from "./PatientTest/StartScreen";
import EverydayYouTest from "./PatientTest/EverydayYouTest";
import YourEnergyTest from "./PatientTest/YourEnergyTest";
import EndScreen from "./PatientTest/EndScreen";
import { TestContext } from "../helpers/Context";
import { ChakraProvider } from '@chakra-ui/react'

function PatientPage(){
    const [gameState, setGameState]= useState("startGame");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
      };

    return(
        <ChakraProvider>
           
        <TestContext.Provider value={{gameState, setGameState}}>
        {gameState==="startGame" && <StartScreen/>}
        {gameState==="everyDay" && <EverydayYouTest/>}
        {gameState==="yourEnergy" && <YourEnergyTest/>}
        {gameState==="endGame" && <EndScreen/>}
        <button onClick={logout}>Log out</button>
        </TestContext.Provider>  

    </ChakraProvider>
    
    ); 
}

export default PatientPage;