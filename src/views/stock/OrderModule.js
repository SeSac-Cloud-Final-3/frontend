import React from "react";
import styled from "styled-components/macro";
import OrderButton from "./OrderButton";
import axios from "axios";
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

const OrderModule = ({ backAPI, company, compId, orderOpened, setOrderOpened, pfs }) => {

    return (
        <>
            {typeof company.companyName !== "undefined" ? 
            <Container>
                <h1>{company.companyName}</h1>
                {
                    <OrderButton
                        backAPI={backAPI}
                        isBuying={true}
                        pf={null}
                        ticker={company.ticker}
                        compId={compId}
                        orderOpened={orderOpened}
                        setOrderOpened={setOrderOpened}
                    />
                }
                {
                    <OrderButton
                        backAPI={backAPI}
                        isBuying={false}
                        pf={pfs.find(
                            (p) => p.stockInfo.ticker === company.ticker
                          )}
                        ticker={company.ticker}
                        compId={compId}
                        orderOpened={orderOpened}
                        setOrderOpened={setOrderOpened}
                    />
                }
            </Container> : 
            <Container>
                <h1>선택된 회사가 없습니다</h1>
            </Container>
            }
        </>
    );
};

export default OrderModule;

const Container = styled.div`
margin: 1rem;
display: block;
justify-content: center;
`;
