import styled from "styled-components";

export const Wrapper = styled.div`
  //   border: 2px solid black;
  padding: 2em 5em;
  max-width: 1200px;
  margin: 0 auto;

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.2em;

    h3 {
      font-size: 1.2rem;
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      color: #333;
    }

    button {
      background: #2f80ed;
      color: #fff;

      &:hover {
        background: #2b6cb0;
      }

      &:active {
        background: #2c5282;
      }
    }
  }

  .boards {
    display: flex;
    gap: 1.2em;
    flex-wrap: wrap;
  }
`;
