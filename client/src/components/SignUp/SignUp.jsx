import React, { useState } from 'react'
import logo from '../../assets/updated-logo-bold.svg'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Box,
    Input,
    Image,
    InputGroup,
    InputLeftElement,
    Icon
  } from '@chakra-ui/react'
import { MdEmail, MdHttps, MdPermIdentity } from 'react-icons/md'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

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
              children={<Icon as={MdPermIdentity} color='blackAlpha.500' />}
          />
          <Input
            size='md'
            value={name}
            placeholder='Username'
            onChange={e => setName(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <FormControl mt={4}>
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
      <FormControl mt={4}>
        <InputGroup>
          <InputLeftElement
              pointerEvents='none'
              children={<Icon as={MdHttps} color='blackAlpha.500' />}
          />
          <Input
            size='md'
            value={confirmPass}
            placeholder='Confirm Password'
            onChange={e => setConfirmPass(e.target.value)}
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
        bg='#48BB78'
        color='#fff'
        _hover={{ bg: '#38A169' }}
        _active={{
          bg: '#2F855A'
        }}
      >
        Sign Up
      </Box>
    </form>
  </>
  )
}

export default SignUp