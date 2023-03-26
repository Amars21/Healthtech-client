import React, { useContext, useState } from "react";
import { EnergyQuestions } from "../../helpers/EnergyQuestions";
import { TestContext } from "../../helpers/Context";
import { Button, Stack, ButtonGroup } from '@chakra-ui/react'



function YourEnergyTest() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const {setGameState} = useContext(TestContext); 

    const nextQuestion = () =>{
        setCurrentQuestion(currentQuestion+1);
    }

    return(
<Stack direction='column'>
        <div>

            <p>{EnergyQuestions[currentQuestion].question}</p>

            <ButtonGroup gap='4'>
  {EnergyQuestions[currentQuestion].optionD ?
    <>
      <Button marginTop='10px' onClick={() => { setAnswer("optionA") }} colorScheme='teal'>{EnergyQuestions[currentQuestion].optionA}</Button>
      <Button marginTop='10px' onClick={() => { setAnswer("optionB") }} colorScheme='teal'>{EnergyQuestions[currentQuestion].optionB}</Button>
      <Button marginTop='10px' onClick={() => { setAnswer("optionC") }} colorScheme='teal'>{EnergyQuestions[currentQuestion].optionC}</Button>
      <Button marginTop='10px' onClick={() => { setAnswer("optionD") }} colorScheme='teal'>{EnergyQuestions[currentQuestion].optionD}</Button>

      {EnergyQuestions[currentQuestion].optionE &&
        <Button marginTop='10px' onClick={() => { setAnswer("optionE") }} colorScheme='teal'>{EnergyQuestions[currentQuestion].optionE}</Button>
      }

      {EnergyQuestions[currentQuestion].optionF &&
        <Button marginTop='10px' onClick={() => { setAnswer("optionF") }} colorScheme='teal'>{EnergyQuestions[currentQuestion].optionF}</Button>
      }
    </>
    :
    <>
      <Button marginTop='10px' onClick={() => { setAnswer("optionA") }} colorScheme='teal'>{EnergyQuestions[currentQuestion].optionA}</Button>
      <Button marginTop='10px' onClick={() => { setAnswer("optionB") }} colorScheme='teal'>{EnergyQuestions[currentQuestion].optionB}</Button>
      <Button marginTop='10px' onClick={() => { setAnswer("optionC") }} colorScheme='teal'>{EnergyQuestions[currentQuestion].optionC}</Button>
    </>
  }
</ButtonGroup>

            {currentQuestion===EnergyQuestions.length-1 ? (
                
                <Button marginTop='10px' onClick={() => {setGameState("endGame");
        
                }} colorScheme='teal'variant='outline' size='md'>
                Finish Quiz
              </Button>                
                
            ) : (
                <Button marginTop='10px' onClick={nextQuestion} colorScheme='teal' variant='outline' size='md'> Next Question</Button>
            )}
           


        </div>
        </Stack>
        
    )

    


    
    }


export default YourEnergyTest;