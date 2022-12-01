import { Flex, Image } from '@chakra-ui/react'
import {StyledLoader} from './loader.styled'
import logo from '../../assets/Logo-small.svg'

const Loader = () => {
  return (
    <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
    >
        <StyledLoader>
          <Image
            className="fadeOut"
            boxSize="100px"
            src={logo} 
            alt="Getting Board..."
          />
        </StyledLoader>
    </Flex>
  )
}

export default Loader