import React,{useContext} from "react";
import { TestContext } from "../../helpers/Context";
import { Button } from '@chakra-ui/react'


function EndScreen() {

    const {setGameState} = useContext(TestContext);

    const Restart = () =>{
        setGameState("startGame")
    }


    return(
        <div>
             <Button onClick={Restart} colorScheme='teal' variant='outline'>Restart Quiz</Button>
        </div>
    )
    
    }


export default EndScreen;