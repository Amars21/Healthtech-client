import React,{useContext, useState} from "react";
import { useMediaQuery } from 'react-responsive';
import { TestContext } from "../../helpers/Context";
import { Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure, Card, CardBody, CardFooter, Image, Heading, Text, Input  } from '@chakra-ui/react';
  import { QuestionIcon } from '@chakra-ui/icons';
  import socket from "../../helpers/socket";
  import Chat from "../Chat";
  import "../Chat.css";

function StartScreen() {

    const {setGameState} = useContext(TestContext);
    const [modalText, setModalText] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstName = sessionStorage.getItem("firstName");
  
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
    const openModal = (testName) => {
      if (testName === 'everyDay') {
        setModalText('This test consists of 10 multiple-choice questions covering topics such as eating habits, physical activity, and lifestyle choices. You can quickly evaluate your overall health score and identify areas where you can make positive changes.');
      } else if (testName === 'yourEnergy') {
        setModalText('This test consists of 9 multiple-choice questions covering topics such as sleep quality, social connections, stress level, and productivity. By answering these questions, you can evaluate your overall energy levels and identify areas where you can improve your physical and mental well-being.');
      }
      onOpen();
    };

    return(
        <>
        <Heading margin={8} as='h4' size='md'>
        Hi {firstName}
        </Heading>
        <Text as='abbr'>Please select one of the tests</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About test</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           {modalText}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Stack spacing={4} className={useMediaQuery({ query: '(max-width: 480px)' }) ? 'vertical-stack' : ''}>
      <Card
      marginTop={2}
      maxW='850px'
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      >
        <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src='https://domf5oio6qrcr.cloudfront.net/medialibrary/7291/boosting-your-energy.jpg'
        alt='Energy'
        />

      <Stack>
       <CardBody>
       <Heading size='md'>Your Energy Test</Heading>

      <Text py='2'>
      An energy test is a method of assessing an individual's overall energy levels
      and identifying areas that may be causing physical, emotional, or mental imbalances.
      </Text>
      </CardBody>

      <CardFooter>
        <Stack spacing={4} direction='row'>

        <Button  onClick={() => {setGameState("yourEnergy")}} colorScheme='linkedin' variant='outline' size='md'>
        Take test
        </Button>

        <Button mx='auto' rightIcon={<QuestionIcon />} colorScheme='linkedin' variant='solid' size='md'  
      onClick={() => openModal('yourEnergy')} >
        Find out more
        </Button>

        </Stack>
      </CardFooter>
        </Stack>
    </Card>

   <Card
      margin={4}
      maxW='850px'
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
    <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://media.istockphoto.com/id/1138208247/vector/3d-wire-frame-human-body-polygonal-low-poly.jpg?s=612x612&w=0&k=20&c=iVw_Ib6BKJ9ON7pGc-8DIOTOPsINo5dyHsNHQCDHTPE='
    alt='Human Body'
    />

    <Stack>
    <CardBody>
      <Heading size='md'>Everyday You Test</Heading>

      <Text py='2'>
      Everyday You Test is a tool that helps individuals assess their overall wellness and energy levels by 
      answering a series of questions about their lifestyle habits.
      </Text>

    </CardBody>

    <CardFooter>
      <Stack spacing={4} direction='row'>

      <Button onClick={() => {setGameState("everyDay")}} colorScheme='linkedin' variant='outline' size='md'>
        Take test
      </Button>

      <Button mx='auto' rightIcon={<QuestionIcon />} colorScheme='linkedin' variant='solid' size='md' 
      onClick={() => openModal('everyDay')}>
        Find out more
      </Button>

      </Stack>
      </CardFooter>
      </Stack>
    </Card>
    </Stack>
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
      </>
        
    );

    
    }


export default StartScreen;