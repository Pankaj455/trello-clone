import styled from "styled-components";

export const StyledVisibility = styled.div`
  button {
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    font-weight: 500;
  }

  .visible {
    font-size: 12px;
    letter-spacing: 0.5;
  }

  .title {
    font-family: "Poppins", sans-serif;
    color: #4f4f4f;
    font-weight: 600;
    line-height: 18px;
  }

  .choose {
    color: #828282;
    font-weight: 400;
    font-family: "Noto sans", serif;
  }

  .visible-option {
    width: 100%;
    cursor: pointer;
    border: 1.5px solid #f2f2f2;
    border-radius: 8px;
    padding: 9px 12px 12px;
  }

  .visible-option:hover {
    background: #f2f2f2;
  }

  .option-content {
    fontweight: 500;
    color: #4f4f4f;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
