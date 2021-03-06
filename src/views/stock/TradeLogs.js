import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ko'
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;

const TradeLogs = ({ backAPI }) => {
  const logsAPI = backAPI + "/logs";
  const [logs, setLogs] = useState([]);
  let params = window.location.pathname.substring(6);

  useEffect(() => {
    let isMounted = true;
    getLogs(logsAPI)
      .then((response) => response[0].data)
      .then((data) => {
        if (isMounted) setLogs(data);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const getLogs = async (request) => {
    let logs = [];
    logs = logs.concat(
      await axios.get(request, {
        params: { competitionId: params },
      })
    );
    return logs;
  };
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Log ID</th>
            <th>거래 종류</th>
            <th>단축코드</th>
            <th>회사 이름</th>
            <th>구매가</th>
            <th>판매가</th>
            <th>거래량</th>
            <th>손익</th>
            <th>체결 시각</th>
          </tr>
        </thead>
        <tbody>
          {logs &&
            logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td style={{ color: log.buying ? "red" : "blue" }}>
                  {log.buying ? "매수" : "매도"}
                </td>
                <td>{log.ticker}</td>
                <td>{log.companyName}</td>
                <td>{(log.buyingPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>{(log.sellingPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>{(log.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td
                  style={{
                    color:
                      log.profit > 0
                        ? "red"
                        : log.profit < 0
                        ? "blue"
                        : "black",
                  }}
                >
                  {(log.profit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </td>
                <td>{moment(log.createdTime).format("YYYY-MM-DD HH:mm:ss")}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TradeLogs;

const Container = styled.div`
  font-family: 'IBM Plex Sans KR', sans-serif;
  margin: 1rem auto;
  width: 80%;
  display: flex;
  justify-content: center;
`;

const Table = styled.table`
  border: 1px solid;
  margin: 1rem;
  td,
  th {
    padding: 0.5rem 1rem;
    border: 1px solid;
  }
`;
