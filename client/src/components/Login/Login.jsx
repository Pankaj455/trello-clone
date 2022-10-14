import React, { useState } from 'react'
import logo from '../../assets/updated-logo-bold.svg'
import {
    FormControl,
    FormErrorMessage,
    Input,
    Image,
    InputGroup,
    InputLeftElement,
    Button,
    Icon
  } from '@chakra-ui/react'
import { MdEmail, MdHttps } from 'react-icons/md'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailErr, setIsEmailErr] = useState(false)
    const [isPassErr, setIsPassErr] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        if(password.trim().length < 6){
            setIsPassErr(true)
            return
        }
        console.log(e.target);
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
        <FormControl isInvalid={isEmailErr}>
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
                        if(e.target.value.trim() === '')    setIsEmailErr(true)
                        else{
                            if(isEmailErr)  setIsEmailErr(false)
                        }
                        setEmail(e.target.value)
                    }}
                />
            </InputGroup>
            {
                isEmailErr && <FormErrorMessage>Please enter your email</FormErrorMessage>
            }
        </FormControl>
        <FormControl mt={4} isInvalid={isPassErr}>
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
                        if(e.target.value.trim() === '')    setIsPassErr(true)
                        else{
                            if(isPassErr)  setIsPassErr(false)
                        }
                        setPassword(e.target.value)
                    }}
                />
            </InputGroup>
            {
                isPassErr && <FormErrorMessage>
                    {
                        password === '' ? "Please enter your password"
                        : "Password must have atleast 6 characters without any whitespace"
                    }
                </FormErrorMessage>
            }
        </FormControl>
        <Button
            size='md'
            colorScheme="blue"
            mt={5}
            width="100%"
            type="submit"
        >
            Log In
        </Button>
    </form>
  </>
  )
}

export default Login