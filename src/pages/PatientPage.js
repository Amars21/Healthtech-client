import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import StartScreen from "./PatientTest/StartScreen";
import EverydayYouTest from "./PatientTest/EverydayYouTest";
import YourEnergyTest from "./PatientTest/YourEnergyTest";
import EndScreen from "./PatientTest/EndScreen";
import { TestContext } from "../helpers/Context";
import { ChakraProvider, Button } from '@chakra-ui/react'

function PatientPage(){
    const [gameState, setGameState]= useState("startGame");
    const [score, setScore]= useState(0);
    const [HighRiskLevel, setHighRiskLevel] = useState("");
    const [MediumRiskLevel, setMediumRiskLevel] = useState("");
    const [LowRiskLevel, setLowRiskLevel] = useState("");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
      };

    return(
        <ChakraProvider>
           
        <TestContext.Provider value={{gameState, setGameState, 
            score, setScore, 
            HighRiskLevel, setHighRiskLevel, 
            MediumRiskLevel, setMediumRiskLevel, 
            LowRiskLevel, setLowRiskLevel}}>

        {gameState==="startGame" && <StartScreen/>}
        {gameState==="everyDay" && <EverydayYouTest/>}
        {gameState==="yourEnergy" && <YourEnergyTest/>}
        {gameState==="endGame" && <EndScreen/>}

        <Button margin={3} colorScheme='linkedin' variant='outline' size='md' onClick={logout}>Log out</Button>
        </TestContext.Provider>  

    </ChakraProvider>
    
    ); 
}

export default PatientPage;