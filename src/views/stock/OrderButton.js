import React, { useState } from "react";
import Order from "./Order";
import styled from "styled-components/macro";

const OrderButton = ({
  backAPI,
  isBuying,
  pf,
  ticker,
  compId,
  orderOpened,
  setOrderOpened,
}) => {
  const [openOrder, setOpenOrder] = useState(false);
  const orderHandler = (event) => {
    if (openOrder) {
      setOrderOpened(false);
      setOpenOrder(false);
    } else if (!orderOpened) {
      setOrderOpened(true);
      setOpenOrder(true);
      return;
    } else {
      return;
    }
  };
  return (
    <>
      <Button className={isBuying ? "Item-red" : "Item"} onClick={orderHandler}>{isBuying ? "매수" : "매도"}</Button>
      {openOrder && (
        <Order
          isBuying={isBuying}
          pf={pf}
          orderHandler={orderHandler}
          ticker={ticker}
          compId={compId}
          backAPI={backAPI}
        />
      )}
    </>
  );
};

export default OrderButton;

const Button = styled.button`
  width: 49%;
  background-color: #0078ff;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 0;
  color: white;
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-size: 25px;
  font-weight: bold;
  &.Item-red {
    background-color: red;
    margin-right: 0.6rem;
  }
`