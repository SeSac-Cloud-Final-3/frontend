import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components/macro";
import useStock from "../../utils/useStock";
import axios from "axios";
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

const Order = ({ isBuying, pf, orderHandler, ticker, compId, backAPI }) => {
  const tradeAPI = backAPI + "/trade";
  const { stockInfo, isLoading } = useStock();
  const [targetStock, setTargetStock] = useState({});
  const [amount, setAmount] = useState();
  const ratio = pf
    ? (
        ((targetStock.currentPrice - pf.buyingPrice) * 100) /
        pf.buyingPrice
      ).toFixed(2)
    : 0;

  useLayoutEffect(() => {
    async function refresh() {
      const data = await stockInfo.data.find((s) => s.ticker === ticker);
      setTargetStock(data);
    }
    refresh();
  }, [ticker, amount]);

  const formHandler = async (event) => {
    event.preventDefault();
    const tradeOrderRequestDto = {
      competitionId: compId,
      buying: isBuying,
      ticker: ticker,
      amount: amount,
    };

    await axios
      .post(tradeAPI, tradeOrderRequestDto)
      .then(() => {
        window.alert(
          targetStock.companyName + (isBuying ? " 매수" : " 매도") + " 완료"
        );
        orderHandler();
      })
      .catch((err) => window.alert(err.response.data.message));
  };

  const inputHandler = (event) => {
    let num = event.target.value;
    setAmount(num);
  };

  return (
    <>
      <Modal style={{border: `1px solid ${isBuying ? "red":"#0078ff"}`}}>
        <p>{isBuying ? "매수" : "매도"}</p>
        <p>회사명 : {targetStock.companyName}</p>
        <p>현재가 : {(""+targetStock.currentPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
        {pf && (
          <>
            <p>보유량 : {(pf.amount)}</p>
            <p>구매가 : {(""+pf.buyingPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            <p
              style={{
                color: ratio < 0 ? "blue" : ratio > 0 ? "red" : "black",
              }}
            >
              등락률 : {ratio}%
            </p>
          </>
        )}
        <p>거래대금 : {amount ? (""+(targetStock.currentPrice * amount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "0"}</p>
        <form onSubmit={formHandler}>
          <Input type="number" onChange={inputHandler} placeholder="거래량" />
          <br />
          <Button1 onClick={formHandler}>확인</Button1>
          <Button2 onClick={orderHandler}>취소</Button2>
        </form>
      </Modal>
    </>
  );
};

export default Order;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 4px;
  padding: 1rem;
  max-width: 200px;
  background-color: white;
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  outline: none;
  border: 1px solid rgba(0,0,0,0.15);
  margin-bottom: 10px;
  text-align: right;
`

const Button1 = styled.button`
  width: 90px;
  padding: 0.3rem;
  cursor: pointer;
`

const Button2 = styled.button`
  width: 90px;
  padding: 0.3rem;
  position: fixed;
  right: 10px;
  cursor: pointer;
`