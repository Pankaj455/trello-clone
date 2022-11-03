import React, { useState } from 'react'
import logo from '../../assets/updated-logo-bold.svg'
import {
    FormControl,
    FormErrorMessage,
    Input,
    Image,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Button,
    Icon,
    useToast,
  } from '@chakra-ui/react'
import { MdEmail, MdHttps } from 'react-icons/md'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailErr, setIsEmailErr] = useState(false)
    const [isPassErr, setIsPassErr] = useState(false)
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const toast = useToast()
    const toastId = 'toastid'

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(isEmailErr || !email.includes("@")){
            if(!isEmailErr) setIsEmailErr(true)
            return;
        }
        else if(password.trim().length < 6){
            setIsPassErr(true)
            return
        }

        const user = {
            email,
            password
        }
        setLoading(true)
        try {
            const {data} = await axios.post('/user/login', user)
            localStorage.setItem('auth-token', data.token)
            navigate('/boards')

        } catch (error) {
            if(!toast.isActive(toastId))
                toast({
                    id: toastId,
                    position: 'top',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 2000
                })
        }
        setLoading(false)
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
                isEmailErr && <FormErrorMessage>
                    {
                        email === '' ? "Please enter email" :
                        !email.includes("@") && "Email is not valid"
                    }
                </FormErrorMessage>
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
                    type={show ? "text" : "password"}
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
                <InputRightElement
                    children={
                        <Icon 
                            as={show ? AiFillEye : AiFillEyeInvisible} 
                            onClick={() => setShow(!show)}
                            color='blackAlpha.500'
                            cursor='pointer'
                        />
                    }
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
            disabled={loading}
        >
            Log In
        </Button>
    </form>
  </>
  )
}

export default Login