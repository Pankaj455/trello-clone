import React, { useState } from 'react'
import logo from '../../assets/updated-logo-bold.svg'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Image,
    InputGroup,
    InputLeftElement,
    Icon
  } from '@chakra-ui/react'
import { MdEmail, MdHttps } from 'react-icons/md'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  return (
  <>
    <Image
        boxSize='150px'
        objectFit='fill'
        src={logo}
        alt="Logo"
    />
    <form onSubmit={(e)=>e.preventDefault()}>
        <FormControl>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<Icon as={MdEmail} color='blackAlpha.500' />}
                />
                <Input
                    size='md'
                    value={email}
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                />
            </InputGroup>
        </FormControl>
        <FormControl mt={4}>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<Icon as={MdHttps} color='blackAlpha.500' />}
                />
                <Input
                    size='md'
                    value={password}
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                />
            </InputGroup>
        </FormControl>
        <Box
            as='button'
            p={2.5}
            mt={6}
            width="100%"
            border='1px'
            borderRadius='6px'
            fontSize='16px'
            fontWeight='semibold'
            bg='#3182ce'
            color='#fff'
            _hover={{ bg: '#2b6cb0' }}
            _active={{
            bg: '#2c5282'
            }}
        >
            Log In
        </Box>
    </form>
  </>
  )
}

export default Login