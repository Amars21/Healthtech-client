import React, { useContext, useState } from "react";
import { questions } from "../../helpers/Questions";
import { TestContext } from "../../helpers/Context";
import { Button, Stack, ButtonGroup } from '@chakra-ui/react'



function EverydayYouTest() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const {setGameState} = useContext(TestContext); 

    const nextQuestion = () =>{
        setCurrentQuestion(currentQuestion+1);
    }

    return(
<Stack direction='column'>
        <div>

            <p>{questions[currentQuestion].question}</p>

            <ButtonGroup gap='4'>
  {questions[currentQuestion].optionC ?
    <>
      <Button marginTop='10px' onClick={() => { setAnswer("optionA") }} colorScheme='teal'>{questions[currentQuestion].optionA}</Button>
      <Button marginTop='10px' onClick={() => { setAnswer("optionB") }} colorScheme='teal'>{questions[currentQuestion].optionB}</Button>
      <Button marginTop='10px' onClick={() => { setAnswer("optionC") }} colorScheme='teal'>{questions[currentQuestion].optionC}</Button>

      {questions[currentQuestion].optionD &&
        <Button marginTop='10px' onClick={() => { setAnswer("optionD") }} colorScheme='teal'>{questions[currentQuestion].optionD}</Button>
      }

      {questions[currentQuestion].optionE &&
        <Button marginTop='10px' onClick={() => { setAnswer("optionE") }} colorScheme='teal'>{questions[currentQuestion].optionE}</Button>
      }

      {questions[currentQuestion].optionF &&
        <Button marginTop='10px' onClick={() => { setAnswer("optionF") }} colorScheme='teal'>{questions[currentQuestion].optionF}</Button>
      }
    </>
    :
    <>
      <Button marginTop='10px' onClick={() => { setAnswer("optionA") }} colorScheme='teal'>{questions[currentQuestion].optionA}</Button>
      <Button marginTop='10px' onClick={() => { setAnswer("optionB") }} colorScheme='teal'>{questions[currentQuestion].optionB}</Button>
    </>
  }
</ButtonGroup>

            {currentQuestion===questions.length-1 ? (
                
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


export default EverydayYouTest;