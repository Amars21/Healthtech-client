import React, { useContext, useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import './Button.css';
import Axios from "axios";
import { TestContext } from "../../helpers/Context";
import { Button, Stack, Card, CardBody, CardFooter, Text, Divider, Image, ButtonGroup } from '@chakra-ui/react'



function YourEnergyTest() {

  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [fetchedQuestions, setFetchedQuestions] = useState([]);
    const [answer, setAnswer] = useState("");
    const [image, setImage] = useState(0);
    const {setGameState, setScore, score, setHighRiskLevel, setMediumRiskLevel, setLowRiskLevel} = useContext(TestContext); 

    useEffect(() => {
      fetchEnergyQuestions();
    }, []);
  
    const fetchEnergyQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3001/energy/energyQuestions");
        const data = await response.json();
        setFetchedQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    let numOptions = fetchedQuestions[currentQuestion]?.numOptions;

    const nextQuestion = async () =>{
      const currentAnswer = {
        question: fetchedQuestions[currentQuestion]?.question,
        firstName: firstName,
        lastName: lastName,
        answer,
      };
  
      try {
        await Axios.post("http://localhost:3001/patient/patientAnswers", {
          answer: JSON.stringify(currentAnswer),
        });
        
      } catch (error) {
        console.error("Error storing patient answer:", error);
      }

      
      setCurrentQuestion(currentQuestion+1);
      setImage(image+1);
      setAnswer("");
     
      if (numOptions >= 5) {
        if (fetchedQuestions[currentQuestion]?.optionA && answer===fetchedQuestions[currentQuestion]?.optionA) {
          setLowRiskLevel((prevOptions) => [...prevOptions, fetchedQuestions[currentQuestion]?.label]);
          setScore(score+5);
        }
        if (fetchedQuestions[currentQuestion]?.optionB && answer===fetchedQuestions[currentQuestion]?.optionB) {
          setMediumRiskLevel((prevOptions) => [...prevOptions, fetchedQuestions[currentQuestion]?.label ]);
          setScore(score+4);
        }
        if (fetchedQuestions[currentQuestion]?.optionC && answer===fetchedQuestions[currentQuestion]?.optionC) {
          setMediumRiskLevel((prevOptions) => [...prevOptions, fetchedQuestions[currentQuestion]?.label]);
          setScore(score+3);
        }
        if (fetchedQuestions[currentQuestion]?.optionD && answer===fetchedQuestions[currentQuestion]?.optionD) {
          setHighRiskLevel((prevOptions) => [...prevOptions, fetchedQuestions[currentQuestion]?.label]);
          score(score+2);
        }
        if (fetchedQuestions[currentQuestion]?.optionE && answer===fetchedQuestions[currentQuestion]?.optionE) {
          setHighRiskLevel((prevOptions) => [...prevOptions, fetchedQuestions[currentQuestion]?.label]);
          score(score+0);
        }
      }
     else if(numOptions===4) {
      if (fetchedQuestions[currentQuestion]?.optionA && answer===fetchedQuestions[currentQuestion]?.optionA) {
        setLowRiskLevel((prevOptions) => [...prevOptions, fetchedQuestions[currentQuestion]?.label]);
        setScore(score+4);
      }
      if (fetchedQuestions[currentQuestion]?.optionB && answer===fetchedQuestions[currentQuestion]?.optionB) {
        setMediumRiskLevel((prevOptions) => [...prevOptions, fetchedQuestions[currentQuestion]?.label ]);
        setScore(score+3);
      }
      if (fetchedQuestions[currentQuestion]?.optionC && answer===fetchedQuestions[currentQuestion]?.optionC) {
        setMediumRiskLevel((prevOptions) => [...prevOptions, fetchedQuestions[currentQuestion]?.label]);
        setScore(score+2);
      }
      if (fetchedQuestions[currentQuestion]?.optionD && answer===fetchedQuestions[currentQuestion]?.optionD) {
        setHighRiskLevel((prevOptions) => [...prevOptions, fetchedQuestions[currentQuestion]?.label]);
        setScore(score+1);
      }
     }
     else {
      if (fetchedQuestions[currentQuestion]?.optionA && answer===fetchedQuestions[currentQuestion]?.optionA) {
        setLowRiskLevel((prevOptions) => [...prevOptions, fetchedQuestions[currentQuestion]?.label]);
        setScore(score+3);
      }
      if (fetchedQuestions[currentQuestion]?.optionB && answer===fetchedQuestions[currentQuestion]?.optionB) {
        setMediumRiskLevel((prevOptions) => [...prevOptions, fetchedQuestions[currentQuestion]?.label ]);
        setScore(score+2);
      }
      if (fetchedQuestions[currentQuestion]?.optionC && answer===fetchedQuestions[currentQuestion]?.optionC) {
        setHighRiskLevel((prevOptions) => [...prevOptions, fetchedQuestions[currentQuestion]?.label]);
        setScore(score+1);
      }
     }
     
   
      
  }

    return(

        <Card maxW='700px' variant='outline' align='center' margin={8} >
          <CardBody>
            <Image
             src={fetchedQuestions[currentQuestion]?.image}
            borderRadius='lg'
          />

        <Stack mt='6' spacing='3'>
         
          <Text>
          {fetchedQuestions[currentQuestion]?.question}
          </Text>
        </Stack>

          </CardBody>
      <Divider />
      <CardFooter>
      <ButtonGroup gap={4} className={useMediaQuery({ query: '(max-width: 480px)' }) ? 'button-group-vertical' : ''}>
        
        {fetchedQuestions[currentQuestion]?.optionD ?
        <>
   
      <Button marginTop='10px' size='md' onClick={() => { setAnswer(fetchedQuestions[currentQuestion]?.optionA) }} colorScheme='linkedin'>{fetchedQuestions[currentQuestion]?.optionA}</Button>
      <Button marginTop='10px' size='md' onClick={() => { setAnswer(fetchedQuestions[currentQuestion]?.optionB) }} colorScheme='linkedin'>{fetchedQuestions[currentQuestion]?.optionB}</Button>
      <Button marginTop='10px' size='md' onClick={() => { setAnswer(fetchedQuestions[currentQuestion]?.optionC) }} colorScheme='linkedin'>{fetchedQuestions[currentQuestion]?.optionC}</Button>
      <Button marginTop='10px' size='md' onClick={() => { setAnswer(fetchedQuestions[currentQuestion]?.optionD) }} colorScheme='linkedin'>{fetchedQuestions[currentQuestion]?.optionD}</Button>

      {fetchedQuestions[currentQuestion]?.optionE &&
        <Button marginTop='10px' size='md' onClick={() => { setAnswer(fetchedQuestions[currentQuestion]?.optionE) }} colorScheme='linkedin'>{fetchedQuestions[currentQuestion]?.optionE}</Button>
      }

      {fetchedQuestions[currentQuestion]?.optionF &&
        <Button marginTop='10px' size='md' onClick={() => { setAnswer(fetchedQuestions[currentQuestion]?.optionF) }} colorScheme='linkedin'>{fetchedQuestions[currentQuestion]?.optionF}</Button>
      }
     
      </>
      :
      <>
    
      <Button marginTop='10px' size='md' onClick={() => { setAnswer(fetchedQuestions[currentQuestion]?.optionA) }} colorScheme='linkedin'>{fetchedQuestions[currentQuestion]?.optionA}</Button>
      <Button marginTop='10px' size='md' onClick={() => { setAnswer(fetchedQuestions[currentQuestion]?.optionB) }} colorScheme='linkedin'>{fetchedQuestions[currentQuestion]?.optionB}</Button>
      <Button marginTop='10px' size='md' onClick={() => { setAnswer(fetchedQuestions[currentQuestion]?.optionC)  }} colorScheme='linkedin'>{fetchedQuestions[currentQuestion]?.optionC}</Button>
     
     </>
     
    }
      {currentQuestion===fetchedQuestions.length-1 ? (
                
                <Button marginTop='10px' onClick={() => {setGameState("endGame");
                nextQuestion();
                }} colorScheme='linkedin'variant='outline' size='md'>
                Finish Test
              </Button>                
                
            ) : (
                <Button marginTop='10px' onClick={nextQuestion} colorScheme='linkedin' variant='outline' size='md'> Next Question</Button>
            )}

      
      </ButtonGroup>
      </CardFooter>
      </Card>

    )
    
    }


export default YourEnergyTest;