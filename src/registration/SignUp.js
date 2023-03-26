import React from "react";
import './Registration.css';
import { ChakraProvider, Input, Stack, Button, InputRightElement , InputGroup, Select, Link, Text} from '@chakra-ui/react';
import { useState } from "react";
import {useFormik} from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Axios from "axios";

function SignUp() {
        const [show, setShow] = useState(false);
        const handleClick = () => setShow(!show);

        const [confirm, setConfirm] = useState(false);
        const Confirm = () => setConfirm(!confirm);
        const navigate = useNavigate();

        const onSubmit = (data) => {
          Axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data);
            navigate("/login");
          });
        };

        const initialValues = {
            firstName: "",
            lastName: "",
            address: "",
            date: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            role: ""
        }

        const validationSchema = Yup.object().shape({
            firstName: Yup.string().required("First name is required field"),
            lastName: Yup.string().required("Last name is required field"),
            address: Yup.string().required("Address is required field"),
            password: Yup.string()
                .min(8, "Password must contain at least 8 charachters")
                .required("Password is required field"),
            date: Yup.string().required("Date is required field"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required field"),
            passwordConfirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
            role: Yup.string().required("Role is required field")
        });
    
        const formik = useFormik({
            initialValues,
            validationSchema,
            onSubmit: onSubmit,
        });

    return(
        <ChakraProvider>
            <Stack spacing={3}>
              
              
            
  <Input 
  variant='outline'
   placeholder='First name'
  onBlur={formik.handleBlur}
  value={formik.values.firstName} 
  onChange={formik.handleChange} 
  id='firstName' 
  name="firstName" />

  {formik.errors.firstName && formik.touched.firstName ? (
     <p className='error-message'>{formik.errors.firstName}</p>) 
     : null}

  <Input 
  variant='outline' 
  placeholder='Last name'  
  onBlur={formik.handleBlur} 
  value={formik.values.lastName} 
  onChange={formik.handleChange} 
  id='lastName' 
  name="lastName" />

  {formik.errors.lastName && formik.touched.lastName ? (
     <p className='error-message'>{formik.errors.lastName}</p>) 
     : null}

  <Input 
  variant='outline' 
  placeholder='Address' 
  onBlur={formik.handleBlur} 
  value={formik.values.address} 
  onChange={formik.handleChange} 
  id='address' 
  name="address" />

  {formik.errors.address && formik.touched.address ? (
     <p className='error-message'>{formik.errors.address}</p>) 
     : null}

  <Input 
  variant='outline' 
  type="date"  
  placeholder='Date of birth'
  onBlur={formik.handleBlur} 
  value={formik.values.date} 
  onChange={formik.handleChange} 
  />
 {formik.errors.date && formik.touched.date ? (
     <p className='error-message'>{formik.errors.date}</p>) 
     : null}
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

    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={confirm ? 'text' : 'password'}
        placeholder='Confirm password'
        onBlur={formik.handleBlur} 
        value={formik.values.passwordConfirmation}
        onChange={formik.handleChange}
        id='passwordConfirmation' 
        name="passwordConfirmation"
      />

      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={Confirm}>
          {confirm ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
    {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation ? ( 
        <p className='error-message'>{formik.errors.passwordConfirmation}</p>) 
        : null}

   
<Select value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur}  id='role' 
        name="role"   placeholder='Select role'>
  <option  >Doctor</option>
  <option  >Patient</option>
</Select>

{formik.errors.role && formik.touched.role ? (
     <p className='error-message'>{formik.errors.role}</p>) 
     : null}

    <Button type="submit" colorScheme='teal' size='lg'  disabled={!formik.isValid || !formik.dirty} onClick={formik.handleSubmit}>
    Sign Up
  </Button>

         <Text>
          Already have an account?{' '}
        <Link color='teal.500' href='/login'>
          Log in now
        </Link>
        </Text>
  
  
      </Stack>
        </ChakraProvider>
    );
}

export default SignUp;