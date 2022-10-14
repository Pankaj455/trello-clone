import React, { useState } from 'react'
import logo from '../../assets/updated-logo-bold.svg'
import {
    FormControl,
    FormErrorMessage,
    Button,
    Input,
    Image,
    InputGroup,
    InputLeftElement,
    Icon
  } from '@chakra-ui/react'
import { MdEmail, MdHttps, MdPermIdentity } from 'react-icons/md'

const SignUp = () => {
  const [name, setName] = useState('')
  const [nameErr, setNameErr] = useState(false)
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState(false)
  const [password, setPassword] = useState('')
  const [passErr, setPassErr] = useState(false)
  const [confirmPass, setConfirmPass] = useState('')
  const [confirmPassErr, setConfirmPassErr] = useState(false)

  const handleSubmit = e => {
    e.preventDefault();
    if(nameErr || name.trim().length < 3){
      if(!nameErr) setNameErr(true)
      return
    }else if(emailErr || !email.includes("@")){
      if(!emailErr) setEmailErr(true)
      return
    }
    else if(passErr || password.trim().length < 6){
      if(!passErr)  setPassErr(true)
      return;
    }else if(confirmPass !== password){
      setConfirmPassErr(true)
      return;
    }

  }

  return (
  <>
    <Image
        boxSize='150px'
        objectFit='fill'
        src={logo}
        alt="Logo"
    />
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={nameErr}>
        <InputGroup>
          <InputLeftElement
              pointerEvents='none'
              children={<Icon as={MdPermIdentity} color='blackAlpha.500' />}
          />
          <Input
            size='md'
            value={name}
            placeholder='Username'
            onChange={e => {
              if(e.target.value.trim() === '')    setNameErr(true)
              else{
                  if(nameErr)  setNameErr(false)
              }
              setName(e.target.value)
          }}
          />
        </InputGroup>
        {
          nameErr && <FormErrorMessage>
            {
              name === '' ? "Please enter username"
              : "Username must have atleast 3 characters without any whitespace"
            }
          </FormErrorMessage>
        }
      </FormControl>
      <FormControl mt={4} isInvalid={emailErr}>
        <InputGroup>
          <InputLeftElement
              pointerEvents='none'
              children={<Icon as={MdEmail} color='blackAlpha.500' />}
          />
          <Input
            size='md'
            value={email}
            placeholder='Email'
            onChange={e => {
              if(e.target.value.trim() === '')    setEmailErr(true)
              else{
                  if(emailErr)  setEmailErr(false)
              }
              setEmail(e.target.value)
          }}
          />
        </InputGroup>
        {
          emailErr && <FormErrorMessage>
            {
                email === '' ? "Please enter email" :
                !email.includes("@") && "Email is not valid"
            }
          </FormErrorMessage>
        }
      </FormControl>
      <FormControl mt={4} isInvalid={passErr}>
        <InputGroup>
          <InputLeftElement
              pointerEvents='none'
              children={<Icon as={MdHttps} color='blackAlpha.500' />}
          />
          <Input
            size='md'
            value={password}
            placeholder='Password'
            onChange={e => {
              if(e.target.value.trim() === '')    setPassErr(true)
              else{
                  if(passErr)  setPassErr(false)
              }
              setPassword(e.target.value)
          }}
          />
        </InputGroup>
        {
          passErr && <FormErrorMessage>
            {
                password === '' ? "Please enter password"
                : "Password must have atleast 6 characters without any whitespace"
            }
          </FormErrorMessage>
        }
      </FormControl>
      <FormControl mt={4} isInvalid={confirmPassErr}>
        <InputGroup>
          <InputLeftElement
              pointerEvents='none'
              children={<Icon as={MdHttps} color='blackAlpha.500' />}
          />
          <Input
            size='md'
            value={confirmPass}
            placeholder='Confirm Password'
            onChange={e => {
              if(confirmPassErr)  setConfirmPassErr(false)
              setConfirmPass(e.target.value)
            }}
          />
        </InputGroup>
        {
          confirmPassErr && <FormErrorMessage>
          {
              confirmPass === '' ? "Please enter password again"
              : "Password did not match"
          }
        </FormErrorMessage>
        }
      </FormControl>
      <Button
            size='md'
            colorScheme="green"
            mt={5}
            width="100%"
            type="submit"
        >
            Sign Up
        </Button>
    </form>
  </>
  )
}

export default SignUp