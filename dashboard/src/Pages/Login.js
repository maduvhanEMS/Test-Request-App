import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSignInAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader/Loader";
import { login, reset } from "../features/auth/authSlice";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, user, isSuccess, navigate, message, dispatch]);

  // const { username, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  const onSubmitGuest = (e) => {
    e.preventDefault();
    const data = {
      username: "Guest",
    };
    dispatch(login(data));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Card>
        <CardHeader>
          <div>
            <FaSignInAlt style={{ paddingRight: "4px" }} size={30} />
            Login
          </div>
          <h3>N25 Test Request Platform</h3>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              {...register("username", {
                required: true,
                onChange: (e) => handleChange(e),
              })}
            />
            <input
              type="password"
              autoComplete="true"
              placeholder="Enter password"
              value={formData.password}
              {...register("password", {
                required: true,
                onChange: (e) => handleChange(e),
              })}
            />
            <div>
              Dont have an Account?{" "}
              <p onClick={onSubmitGuest}>Login as a guest</p>
            </div>
            <button type="submit">Submit</button>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  position: fixed; /* Stay in place */
  padding-top: 0px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  max-width: 800px;
  width: 100%;
  position: relative;
  top: 20%;
  flex-direction: column;

  p {
    font-size: 24px;
  }
`;

const CardHeader = styled.div`
  font-size: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  flex-direction: column;
  h3 {
    color: rgba(0, 0, 0, 0.4);
    font-size: 23px;
    margin-top: 10px;
  }
`;

const CardBody = styled.div`
  margin-top: 40px;

  width: 400px;
  input {
    padding: 0.6rem;
    margin-bottom: 1rem;
    width: 100%;
    border: none;
    border-radius: 10px;
    // outline: 1px solid ${(props) => props.color};
    background: white;
  }

  div {
    display: flex;
    padding: 0.6rem;
    align-items: center;
  }

  p {
    font-size: 14px;
    padding: 0.6rem;
    font-weight: 600px;
    cursor: pointer;
    &:hover {
      color: blue;
    }
  }

  button {
    padding: 0.5rem;
    padding: 0.6rem;
    margin-bottom: 1rem;
    width: 100%;
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
`;
