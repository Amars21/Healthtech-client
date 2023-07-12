import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import {
    ChakraProvider,
    Input,
    Button,
    Box,
    Stack,
     Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  } from '@chakra-ui/react'
  import Axios from "axios";
  import socket from '../helpers/socket';
  import Chat from './Chat';
  import './Chat.css';

function DoctorPage(){

    const firstName = sessionStorage.getItem("firstName");
   
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
      };
     
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [prescription, setPrescription] = useState("");

    const joinRoom = () => {
      if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
      }
    };
    

      const [data, setData] = useState("");
      const [institutionName, setInstitutionName] = useState("");
      const [doctorName, setDoctorName] = useState("");

      const handleSubmit = async (e) => {
        console.log("Data to be sent:", data);
        e.preventDefault();
      
        try {
          const requestData = {
            data: JSON.stringify(data),
            institutionName: JSON.stringify(institutionName) ,
            doctorName: JSON.stringify(doctorName)
          };
          
          const response = await Axios.post("http://localhost:3001/api/integration", requestData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const { id } = response.data;
      
          
          console.log("Integration successful. Document ID:", id);
        } catch (error) {
          console.error("Error integrating data:", error);
        }

        setData("");
        setDoctorName("");
        setInstitutionName("");
      };
      
      
      const onSubmit = async (e) => {
       
        try {
          const requestData = {
            prescription: JSON.stringify(prescription),
          };
          
          const response = await Axios.post("http://localhost:3001/electronic/prescription", requestData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const { id } = response.data;
      
          
          console.log("Integration successful. Document ID:", id);
        } catch (error) {
          console.error("Error integrating data:", error);
        }

        setPrescription("");
      };
          

      const fetchPatientAnswers = async () => {
        try {
          const response = await fetch("http://localhost:3001/doctor/answers");
          if (response.ok) {
            const data = await response.json();
            setAnswers(data.answers);
          } else {
            throw new Error("Error fetching answers: " + response.status);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchPatientAnswers();
      }, []);

      

    
    return(

        <ChakraProvider>
            Hi {firstName}
            <Stack spacing={4} className={useMediaQuery({ query: '(max-width: 480px)' }) ? 'vertical-stack' : ''}></Stack>
            <p>This is a list of your patients:</p>
            <br></br>
      <Accordion allowToggle>
        {answers.map((item, index) => (
          <AccordionItem>
          <h2 key={index}>
            <AccordionButton _expanded={{ bg: '#0A66C2', color: 'white' }}>
        <Box as="span" flex='1' textAlign='left'>
          Patient full name: {item.patientAnswer.firstName} {item.patientAnswer.lastName}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      </h2>
           <AccordionPanel pb={4}>
          Question: {item.patientAnswer.question}

          <br></br>

          Answer: {item.patientAnswer.answer}
          </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

        <br></br>
        <h3>E-Prescription</h3>
      
        <Box m={4} width="300px">
        <Input
        variant="outline"
        placeholder="Write a prescription"
        value={prescription} 
        onChange={(e) => setPrescription(e.target.value)}
        />
        </Box>

      <Button m={2} type="submit" colorScheme='linkedin' size='md' onClick={onSubmit}>
      Submit prescription
      </Button>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <br></br>

      <h3>Hospital Integration Form</h3>

      <form onSubmit={handleSubmit}>
      
        <Box width='300px'>
        <Input marginTop={3} variant="outline" placeholder='Doctor name' type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
        <Input marginTop={3} variant="outline" placeholder='Institution name' type="text" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} />
        <Input marginTop={3} variant="outline" placeholder='Facility information' type="text" value={data} onChange={(e) => setData(e.target.value)}  />
        
        </Box>
      
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button marginTop={5} type="submit" colorScheme='linkedin' size='md'>Submit data</Button>
      </div>
      </form>
      </div>

      <div className="Chat">
        {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <Input 
            variant='outline' 
            placeholder='Enter your name'  
            onChange={(event) => {
              setUsername(event.target.value);
            }}   />

          <Input 
            variant='outline' 
            placeholder='Enter Room ID'  
            onChange={(event) => {
              setRoom(event.target.value);
            }}  />
          <Button colorScheme='linkedin' variant='solid' size='sm' onClick={joinRoom}>Join A Room</Button>
        </div>
        ) : (
        <Chat socket={socket} username={username} room={room} />
        )}
      </div>
  
        <Button margin={3} colorScheme='linkedin' variant='outline' size='md' onClick={logout}>Log out</Button>
        </ChakraProvider>
       
    ); 
}

export default DoctorPage;