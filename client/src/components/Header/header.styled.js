import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  //   border: 1px solid black;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
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
  }
`;
