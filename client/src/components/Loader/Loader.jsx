import { Flex, Image } from "@chakra-ui/react";
import logo from "../../assets/Logo-small.svg";

const Loader = ({ height, width }) => {
  return (
    <Flex
      height={height || "100vh"}
      justifyContent="center"
      alignItems="center"
    >
      <div>
        <Image
          className="fadeOut"
          boxSize={width || "100px"}
          src={logo}
          alt="Getting Board..."
        />
      </div>
    </Flex>
  );
};

export default Loader;
