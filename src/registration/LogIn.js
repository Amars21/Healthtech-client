import React from "react";
import './Registration.css';
import { ChakraProvider, Input, Stack, Button, InputRightElement , InputGroup, Link, Text,Alert,
  AlertIcon
  } from '@chakra-ui/react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import Axios from "axios";

function LogIn() {

    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
  
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
   

    const login = () => {
        const data = { email: formik.values.email, password: formik.values.password };
        Axios.post("http://localhost:3001/auth/login", data).then((response) => {
          if (response.data.error) {
            setShowAlert(response.data.error);
          } else {
            const { accessToken, role, firstName, lastName } = response.data;
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("role", role);
            sessionStorage.setItem("firstName", firstName);
            sessionStorage.setItem("lastName", lastName);
            
            if (role === "Doctor") {
            navigate("/doctor-page");
            } else if (role === "Patient") {
            navigate("/patient-page");
            }
          }
        });
      };

    const initialValues = {
        email: "",
        password: ""
    }
    
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, "Password must contain at least 8 charachters")
            .required("Password is required field"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required field")
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
    });

   return(
       <ChakraProvider>

          <Stack spacing={3} mt={200} px={4}>
            {showAlert && (
          <Alert status='error'>
          <AlertIcon />
          {showAlert}
          </Alert>
          )}
            <Input 
            variant='outline' 
            placeholder='E-mail'  
            onBlur={formik.handleBlur} 
            value={formik.values.email} 
            onChange={formik.handleChange} 
            id='email' 
            name="email"   />

            {formik.errors.email && formik.touched.email ? ( 
            <p className='error-message'>{formik.errors.email}</p>) 
             : null}

        <InputGroup size='md'>
        <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        onBlur={formik.handleBlur} 
        value={formik.values.password}
        onChange={formik.handleChange} 
        id='password' 
        name="password"
      />
      
        <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
        </InputRightElement>
        </InputGroup>
        {formik.errors.password && formik.touched.password ? ( 
        <p className='error-message'>{formik.errors.password}</p>) 
        : null}

        <Button colorScheme='linkedin' size='lg' onClick={login}>
            Log in
        </Button>

        <Text>
           Do not have an account yet?{' '}
        <Link color='linkedin.500' href='/signup'>
          Sign up now
        </Link>
        </Text>
       </Stack>
       
        </ChakraProvider>
   );
}

export default LogIn;