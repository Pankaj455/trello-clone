import styled from "styled-components";

export const StyledCard = styled.div`
  width: 243px;
  min-height: 243px;
  background: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 0.75em;
  padding: 0.75em;
  flex-basis: 243px;

  .cover {
    height: 130px;
    margin-bottom: 0.75em;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 0.75em;
    }
  }

  .title {
    font-size: 16px;
    font-family: "Noto Sans";
    font-weight: 500;
    margin-bottom: 1.5em;
  }
`;
