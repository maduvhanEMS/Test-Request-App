import React from "react";
import styled from "styled-components";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import rdm from "../../Assets/images/rdm.png";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <Header>
      <Logo>
        <Logo>
          <img src={rdm} alt="RDM" />
        </Logo>
      </Logo>
      <UL>
        {user ? (
          <>
            <h4>Welcome, {user.username}</h4>
            <li>
              <button onClick={onLogout}>
                <FaSignInAlt /> <span>Logout</span>
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">
              <FaSignInAlt /> <span>Login</span>
            </Link>
          </li>
        )}
      </UL>
    </Header>
  );
}
const Header = styled.header`
  display: flex;
  background-color: white;
  position: fixed;
  height: 80px;
  top: 0;
  left: 0;
  right: 0;
  margin-bottom: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-right: 80px;
  z-index: 9999;
`;

const Logo = styled.div`
  margin: 0;
  padding: 0;
  max-width: 200px;

    img {
      width: 100%;
    }
  }
`;
const UL = styled.ul`
  align-items: center;
  display: flex;

  h4 {
    margin-right: 20px;
    color: blue;
    font-weight: 500;
  }

  li {
    list-style: none;
    font-size: 18px;
    margin: 0;
    padding: 0;
    display: flex;

    a > span {
      line-height: 20px;
    }
    button {
      background-color: white;
      border: none;
      align-items: center;
      font-size: 16px;
      cursor: pointer;
    }

    &:hover {
      color: red;
    }
  }
`;
