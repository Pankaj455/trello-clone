import styled from "styled-components";

export const StyledCard = styled.div`
  width: 243px;
  min-height: 243px;
  background: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 0.75em;
  padding: 0.75em;
  cursor: pointer;
  flex-basis: 243px;

  &:hover {
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.12);
    scale: 1.01;
    transition: all 0.3s;
  }

  .cover {
    height: 130px;
    margin-bottom: 0.75em;
    position: relative;
    background: rgb(201, 217, 208);
    background: linear-gradient(
      90deg,
      rgba(201, 217, 208, 1) 0%,
      rgba(219, 243, 229, 1) 33%,
      rgba(213, 220, 217, 1) 65%
    );
    border-radius: 0.75em;
    overflow: hidden;
    img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
  }

  .title {
    font-size: 16px;
    font-family: "Noto Sans";
    font-weight: 500;
    margin-bottom: 1.5em;
  }
`;
