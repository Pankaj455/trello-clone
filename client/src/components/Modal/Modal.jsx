import React, { useEffect, useRef, useState } from 'react'
import { StyledModal } from './modal.styled'
import { Image,
    FormControl,
    FormErrorMessage,
    Input,
    Button
} from '@chakra-ui/react'
import { MdHttps, MdImage, MdPermIdentity } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'

const Modal = ({isOpen, close}) => {
    const [title, setTitle] = useState('')
    const [visibility, setVisibility] = useState(false)
    const [cover, setCover] = useState(null)
    const [isError, setIsError] = useState(false)
    const imgRef = useRef()

    useEffect(() => {
        document.body.style.overflowY = isOpen ? "hidden" : "scroll"
      return () => {
        document.body.style.overflowY = "scroll"
      }
    }, [isOpen])
    

    const handleInputChange = e => {
        if(e.target.value === '') setIsError(true)
        else{
            if(isError) setIsError(false)
        }
        setTitle(e.target.value)
    }

    const handleImageUpload = e => {
        const image = e.target.files[0]
        if(image && image.type.substr(0, 5) === 'image'){
            const reader = new FileReader()
            reader.onloadend = function () {
                setCover(reader.result.toString())
            }
            reader.readAsDataURL(image)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(title === ''){
            if(!isError) setIsError(true)
            return;
        }

        const newBoard = {
            title,
            visibility,
            cover
        }

        console.log(newBoard);
        close(false)
    }
  return (
    <StyledModal display={isOpen.toString()}>
        <div className="form-modal">
            <div className="cover">
                {cover &&
                    <Image src={cover} fit alt='board-cover' />
                }
            </div>
            <form onSubmit={handleSubmit} >
                <FormControl size='xs' isInvalid={isError} mb={5}>
                    <Input
                        size='md'
                        value={title}
                        placeholder='Add board title'
                        fontSize={14}
                        onChange={handleInputChange}
                    />
                    {isError ? (
                        <FormErrorMessage className='errMsg'>Add board title</FormErrorMessage>
                    ) : null
                    }
                </FormControl>
                <div className="cover_visible">
                    <input 
                        type="file" 
                        ref={imgRef} style={{display: 'none'}}
                        onChange={handleImageUpload}
                    />
                    <Button 
                        leftIcon={<MdImage />} 
                        size="sm" 
                        onClick={()=> imgRef.current.click()}
                    >
                        Cover
                    </Button>
                    <Button 
                        leftIcon={!visibility ? <MdHttps /> : <MdPermIdentity />} 
                        size="sm"
                        onClick={() => setVisibility(!visibility)}
                    >
                        {visibility ? "Public" : "Private"}
                    </Button>
                </div>
                <div className="footer">
                    <Button size='sm' color='#828282' onClick={() => close(false)}>Cancel</Button>
                    <Button
                        size='sm' 
                        leftIcon={<AiOutlinePlus />}
                        type='submit'
                    >
                        Create
                    </Button>
                </div>
            </form>
        </div>
    </StyledModal>
  )
}

export default Modal