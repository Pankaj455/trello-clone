import styled from "styled-components";

export const StyledModal = styled.div`
  display: ${({ display }) => (display === "true" ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  transition: all 2s;

  .form-modal {
    position: absolute;
    content: "";
    width: 340px;
    height: 300px;
    background: #fff;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    transform: transform(-50%, -50%);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 1.8em;

    .cover {
      height: 78px;
      position: relative;
      margin-bottom: 16px;
      // border: 1px solid #828282;
      background: rgb(201, 217, 208);
      background: linear-gradient(
        90deg,
        rgba(201, 217, 208, 1) 0%,
        rgba(219, 243, 229, 1) 33%,
        rgba(213, 220, 217, 1) 65%
      );
      border-radius: 8px;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
    }

    .cover_visible {
      display: flex;
      justify-content: space-between;
      gap: 1.1em;
      margin-bottom: 25px;

      button {
        flex-grow: 1;
        color: #828282;
        font-family: "Poppins", sans-serif;
        font-size: 12px;
        font-weight: 300;
      }
    }

    .errMsg {
      position: absolute;
      bottom: -18px;
      right: 0;
      font-size: 12px;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      gap: 1em;

      button:last-child {
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
  }
`;
