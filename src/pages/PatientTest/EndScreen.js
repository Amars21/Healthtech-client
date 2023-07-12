import React,{useContext, useState, useEffect} from "react";
import { TestContext } from "../../helpers/Context";
import { Button, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure, 
  useColorModeValue,
  Stack
} from '@chakra-ui/react';
import jsPDF from "jspdf";


function EndScreen() {

    const {setGameState, score, HighRiskLevel, MediumRiskLevel, LowRiskLevel} = useContext(TestContext);
    const [high, setHigh] = useState('');
    const [medium, setMedium] = useState('');
    const [low, setLow] = useState('');

    const [highEnergy, setHighEnergy] = useState('');
    const [mediumEnergy, setMediumEnergy] = useState('');
    const [lowEnergy, setLowEnergy] = useState('');

    const [modalText, setModalText] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tabIndex, setTabIndex] = useState(0);

    const colors = useColorModeValue(
      ['red.400', 'orange.300', 'green.100'],
      
    )

    const bg = colors[tabIndex];

    const Restart = () =>{
        setGameState("startGame");
    }

    useEffect(() => {
      fetchRecommendations();
    }, []);

    useEffect(() => {
      fetchEnergyRecommendations();
    }, []);
  
    const fetchRecommendations = async () => {
      try {
        const response = await fetch("http://localhost:3001/everyDay/everyDayQuestions");
        const data = await response.json();
        setHigh(data.recommendations);
        setMedium(data.recommendations);
        setLow(data.recommendations);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const fetchEnergyRecommendations = async () => {
      try {
        const response = await fetch("http://localhost:3001/energy/energyQuestions");
        const data = await response.json();
        setHighEnergy(data.recommendations);
        setMediumEnergy(data.recommendations);
        setLowEnergy(data.recommendations);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text(`Your score is: ${score}`, 10, 10);
    
        doc.text("High risk levels:", 10, 20);
        HighRiskLevel.forEach((level, index) => {
          doc.text(`${index + 1}. ${level}`, 20, 30 + index * 10);
        });
    
        doc.text("Medium risk levels:", 10, 70);
        MediumRiskLevel.forEach((level, index) => {
          doc.text(`${index + 1}. ${level}`, 20, 80 + index * 10);
        });
    
        doc.text("Low risk levels:", 10, 120);
        LowRiskLevel.forEach((level, index) => {
          doc.text(`${index + 1}. ${level}`, 20, 130 + index * 10);
        });
    
        doc.save("survey_results.pdf");
      };

      const openModal = (rec,label) => {
        
        
        const highRecommendation = high.find((q) => q.label === label)?.highRec;
        const lowRecommendation = low.find((q) => q.label === label)?.lowRec;
        const mediumRecommendation = medium.find((q) => q.label === label)?.midRec;

        const energyHigh = highEnergy.find((q) => q.label === label)?.highRec;
        const energyLow = lowEnergy.find((q) => q.label === label)?.lowRec;
        const energyMedium = mediumEnergy.find((q) => q.label === label)?.midRec;
    

        if (rec==='high' && highRecommendation) {
          setModalText(highRecommendation);
        }

        if (rec==='low' && lowRecommendation) {
          setModalText(lowRecommendation)
        }

        if (rec==='mid' && mediumRecommendation) {
          setModalText(mediumRecommendation)
        }

        if (rec==='high' && energyHigh) {
          setModalText(energyHigh)
        }

        if (rec==='low' && energyLow) {
          setModalText(energyLow)
        }

        if (rec==='mid' && energyMedium) {
          setModalText(energyMedium)
        }

        onOpen();
      };
    
    return(
            <ChakraProvider>
              
                <Tabs onChange={(index) => setTabIndex(index)} bg={bg} margin={10}>
                    <TabList>
                        <Tab>High risk levels</Tab>
                        <Tab>Medium risk levels</Tab>
                        <Tab>Low risk levels</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                          <div>
                          {HighRiskLevel.map((risk) => (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                          <p style={{ marginRight: '10px' }}>{risk}</p>
                          <i onClick={() => openModal('high', risk)} class="bi bi-question-circle-fill" style={{ fontSize: '1.2rem' }}></i>
                          </div>
                          ))}
                        </div>
                        </TabPanel>

                        <TabPanel>
                          <div>
                        {MediumRiskLevel.map((risk) => (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                          <p style={{ marginRight: '10px' }}>{risk}</p>
                          <i onClick={() => openModal('mid', risk)} class="bi bi-question-circle-fill" style={{ fontSize: '1.2rem' }}></i>
                          </div>
                        ))}
                        </div>
                        </TabPanel>

                        <TabPanel>
                          <div>
                        {LowRiskLevel.map((risk) => (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                          <p style={{ marginRight: '10px' }}>{risk}</p>
                          <i onClick={() => openModal('low', risk)} class="bi bi-question-circle-fill" style={{ fontSize: '1.2rem' }}></i>
                          </div>
                        ))}
                        </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
        
                <Stack spacing={3}>
                <p>Your score is: {score}</p>
                
                <Button onClick={Restart} colorScheme='linkedin' variant='outline'>Restart Test</Button>
             <Button onClick={generatePDF} colorScheme="linkedin" variant="outline" ml={4}>
                Save as PDF
            </Button>
            
                </Stack>
             
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Our recommendations</ModalHeader>
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
            </ChakraProvider>
            
        
    )
    
    }


export default EndScreen;