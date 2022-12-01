import { Button,
    ButtonGroup,
    Textarea
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import axios from '../../axios'
import { useAppContext } from '../../context/userContext'

const EditDescription = ({setEdit, boardId, description}) => {
    const {updateBoard} = useAppContext()
    
    const [value, setValue] = useState(description)
    const [saving, setSaving] = useState(false)


    const saveDescription = async () => {
        const newDescription = value.trim()
        if(newDescription === description){
            console.log('if condition');
            setEdit(false)
            return
        };

        const data = {description : newDescription, board_id: boardId}

        try {
            setSaving(true)
            const response = await axios.put('/board/update',
                data,
                {
                    headers : {
                        token: localStorage.getItem('auth-token')
                    }
                }
            )
            if(response.data.success){
                updateBoard(data)
            }
        } catch (error) {
            console.log('Error:', error);
        } finally{
            setSaving(false)
            setEdit(false)
        }
    }

  return (
    <>
        <Textarea
            resize="none"
            fontSize={14}
            fontFamily="'Noto Sans', serif"
            fontWeight={400}
            height='250px'
            mb={2}
            value={value}
            onChange={e => setValue(e.target.value)}
        />
        <ButtonGroup
            fontFamily="'Poppins', sans-serif"
            size="sm"
            spacing={3}
            mb={5}
        >
            <Button
                isLoading={saving}
                loadingText="Saving"
                bg="#219653"
                fontSize={11}
                fontWeight={400}
                color="#fff"
                _hover={{
                    bg: "#219653c1"
                }}
                borderRadius={10}
                onClick={saveDescription}
            >Save</Button>
            <Button
                variant="ghost"
                color="#828282"
                fontSize={11}
                fontWeight={400}
                onClick={ () => setEdit(false)}
            >Cancel</Button>
        </ButtonGroup>
    </>
  )
}

export default EditDescription