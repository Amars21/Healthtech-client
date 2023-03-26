import React,{useContext} from "react";
import { TestContext } from "../../helpers/Context";
import { Button } from '@chakra-ui/react'

function StartScreen() {

    const {setGameState} = useContext(TestContext);
    const firstName = sessionStorage.getItem("firstName");

    return(
        <>
        <p>Hi, {firstName}</p>
        <p>Please select one of the tests</p>
        <Button marginTop='100px' onClick={() => {setGameState("everyDay")}} colorScheme='teal' variant='outline'>
        Everyday You test
      </Button>
      <Button marginTop='100px' onClick={() => {setGameState("yourEnergy")}} colorScheme='teal' variant='outline'>
        Your energy Test
      </Button>
      </>
        
    );

    
    }


export default StartScreen;