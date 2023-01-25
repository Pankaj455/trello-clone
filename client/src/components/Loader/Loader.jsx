import { Flex, Image } from "@chakra-ui/react";
import logo from "../../assets/Logo-small.svg";

const Loader = () => {
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <div>
        <Image
          className="fadeOut"
          boxSize="100px"
          src={logo}
          alt="Getting Board..."
        />
      </div>
    </Flex>
  );
};

export default Loader;
