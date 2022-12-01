import styled from "styled-components";

export const StyledLoader = styled.div`
  img.fadeOut {
    -webkit-animation-name: fadeout;
    animation-name: fadeout;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    animation-timing-function: ease-in;
    animation-direction: alternate;
  }
  @-webkit-keyframes fadeout {
    0% {
      scale: 1.2;
    }
    100% {
      scale: 1;
    }
  }
  @keyframes fadeout {
    0% {
      scale: 1.2;
    }
    100% {
      scale: 1;
    }
  }
`;