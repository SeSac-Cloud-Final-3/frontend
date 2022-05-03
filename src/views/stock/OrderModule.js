import React, { useState, useEffect, useLayoutEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import OrderButton from "./OrderButton";
import useStock from "../../utils/useStock";
import axios from "axios";
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

const OrderModule = ({ backAPI , company, compId, orderOpened, setOrderOpened}) => {

    return (
        <>
            <Container>
                {console.log(company.companyName)}
            <h1>{company.companyName || "선택된 회사가 없습니다"}</h1>
            {
                company.companyName === null || company.companyName === undefined ?
                    <>
                    <OrderButton
                        backAPI={backAPI}
                        isBuying={true}
                        pf={null}
                        ticker={company.ticker}
                        compId={compId}
                        orderOpened={orderOpened}
                        setOrderOpened={setOrderOpened}
                        />
                    <OrderButton
                        backAPI={backAPI}
                        isBuying={false}
                        pf={null}
                        ticker={company.ticker}
                        compId={compId}
                        orderOpened={orderOpened}
                        setOrderOpened={setOrderOpened}
                        />
                    </>
                : null
            }

            </Container>
        </>
    );
};

export default OrderModule;

const Container = styled.div`
margin: 1rem;
display: block;
justify-content: center;
`;
