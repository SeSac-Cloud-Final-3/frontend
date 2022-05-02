import React, { useState } from "react";
import styled from "styled-components/macro";
import axios from "axios";
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

const NewCompetition = ({ backAPI }) => {
  const compAPI = backAPI + "/competition";
  const [input, setInput] = useState({
    name: "",
    start: null,
    end: null,
  });

  const inputHandler = (event) => {
    event.preventDefault();
    const changes = { [event.target.id]: event.target.value };
    setInput({ ...input, ...changes });
  };

  const formHandler = async (event) => {
    event.preventDefault();
    if (
      new Date(input.start) >= new Date(input.end) ||
      new Date() >= new Date(input.start)
    ) {
      window.alert("시작과 종료 날짜를 다시 확인해주세요");
      return;
    }
    const tradeOrderRequestDto = {
      name: input.name,
      start: input.start,
      end: input.end,
    };

    await axios
      .post(compAPI, tradeOrderRequestDto)
      .then(() => {
        window.alert("성공");
      })
      .catch((err) => window.alert(err.response.data.message));
    window.location.replace(window.location.href);
  };

  return (
    <>
      <Container>
        <form onSubmit={formHandler}>
          <h1>대회 개최</h1>
          <Input type="text" id="name" onChange={inputHandler} placeholder={"대회 명을 입력 해 주세요"} />
          <Br />
          <Input2 type="date" id="start" onChange={inputHandler} />　~　
          <Input2 type="date" id="end" onChange={inputHandler} />
          <Br />
          <Button onClick={formHandler}>확인</Button>
        </form>
      </Container>
    </>
  );
};

export default NewCompetition;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 4px;
  padding: 1rem;
  border: 10px solid #0078ff;
  background-color: white;
  text-align: center;
`;

const Input = styled.input`
width: 300px;
height: 40px;
outline: none;
`

const Input2 = styled.input`
width: 110px;
padding: 9px;
`

const Br = styled.div`
margin: 1rem 0;
`

const Button = styled.div`
padding: 9px;
border: 1px solid rgba(0,0,0,0.5);
transition: 0.1s ease-in-out;
background-color: white;

cursor: pointer;
:hover{
  color: white;
  border: 1px solid rgba(0,0,0,0);
  background-color: #0078ff;
}
`