import React, { useMemo } from "react";
import logo from "../../assets/updated-logo-bold.svg";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { CgMenuGridR } from "react-icons/cg";
import { BsCaretDownFill } from "react-icons/bs";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/userContext";

const Header = () => {
  const { name, avatar, clearUser, boards } = useAppContext();
  const navigate = useNavigate();
  const { id: location } = useParams();

  const board = useMemo(
    () => boards.filter((board) => board._id === location),
    [boards, location]
  );

  const logout = () => {
    localStorage.removeItem("auth-token");
    clearUser();
    navigate("/");
  };

  const myProfile = () => {
    navigate("/me");
  };

  const pathArr = window.location.pathname.split("/");
  return (
    <header>
      <Link to="/boards">
        <img src={logo} alt="Crello Logo" className="logo" />
      </Link>
      {pathArr.length === 3 && (
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            marginLeft: "4em",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            {board[0].title} |{" "}
          </h1>
          <Button
            leftIcon={<CgMenuGridR />}
            size="sm"
            ml={3}
            color="#828282"
            onClick={() => navigate("/boards")}
          >
            All board
          </Button>
        </div>
      )}
      <div
        style={{
          display: "flex",
          marginLeft: "auto",
          alignItems: "center",
        }}
      >
        {avatar ? (
          <Avatar size="sm" name={name} src={avatar ? avatar.url : ""} />
        ) : (
          <>
            <Avatar size="sm" name={name} />
          </>
        )}
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            bg="#fff"
            rightIcon={<BsCaretDownFill />}
          >
            {name}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={myProfile}>My profile</MenuItem>
            <MenuItem onClick={logout}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
