import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Homepage = () => {
    return (
        // This is the page where the user will choose to login or continue as a guest
        <Container>
            <h1>The Inventory Management System</h1>
            <br></br>
            <ButtonContainer>
                <Link to="/Guest_inventory" style={{ textDecoration: 'none' }}> 
                    <Button>Continue as a Guest</Button>
                </Link>
            </ButtonContainer>
            <ButtonContainer2>
                <Link to="/Login" style={{ textDecoration: 'none' }}> 
                    <Button>Login</Button>
                </Link>
            </ButtonContainer2>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Button = styled.button`
  background-color: #ff7f50; /* Coral color */
  border: none;
  color: white;
  font-weight: 900;
  white-space: nowrap;
  padding: 20px 40px; /* Adjust padding for better button size */
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 25px; /* Rounded corners */
  margin: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ff4500; /* Darker coral */
    transform: translateY(-2px); /* Slight lift on hover */
  }

  &:active {
    transform: translateY(0); /* Return to original position on click */
  }
  font-family: Georgia, serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer2 = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 10px 0; /* Adjust this value to add space between rows */
`;

export default Homepage;
