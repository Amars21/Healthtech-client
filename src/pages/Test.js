import React from "react";
import './Homepage.css'
import { useNavigate } from "react-router-dom";
import { Button, Stack, ChakraProvider, extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
    styles: {
      global: {
        body: {
          bg: 'linear-gradient(#1c92d2, #f2fcfe)',
        },
      },
    },
  });

function Test(){

    const navigate = useNavigate();
    
    const goToLogin = () =>{
        navigate("/login")
    }
    const goToSignUp = () =>{
        navigate("/signup")
    }

      
    return( 

        <ChakraProvider theme={customTheme}>

            <div className="buttons">
            <Stack direction='row' spacing={4} align='center'>
            <Button onClick={goToLogin} colorScheme='black' variant='outline'> Login </Button>
            <Button onClick={goToSignUp} colorScheme='black' variant='outline'> Sign Up </Button>
        </Stack>
            </div>
            
        <div className="homeContainer">
        

    <div className="text">
        <h1>Everyone deserves <br></br> a great healthcare.</h1>
        <h3>Your health companion</h3>
    </div>

    <div className="content">
        <div className="items">
            <i className="bi bi-clock"></i>
            <p>Less time-consuming</p>
        </div>

        <div className="items">
            <i className="bi bi-chat-dots"></i>
            <p>Enhanced communication</p>
        </div>

        <div className="items">
        <i className="bi bi-card-checklist"></i>
            <p>Health test</p>
        </div>

        <div className="items">
        <i className="bi bi-person-check"></i>
            <p>Personalized suggestions</p>
        </div>

    </div>
</div>

     
</ChakraProvider>
    
    );
}

export default Test;