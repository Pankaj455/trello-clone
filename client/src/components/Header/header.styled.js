import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  //   border: 1px solid black;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  padding: 1em 1.5em;
  .logo {
    width: 8rem;
    height: auto;
  }

  .board {
    display: flex;
    flex-grow: 1;
    margin-left: 4em;
    align-items: center;
  }
  .profile {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
`;
