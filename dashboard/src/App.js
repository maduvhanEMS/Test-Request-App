import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import TestSchedule from "./Pages/TestSchedule";
import TestRequest from "./Pages/TestRequest";
import Tabs from "./Components/Tabs/Tabs";
import BookIn from "./Pages/BookIn";
import Sidebar from "./Components/Sidebar/Sidebar";
import styled from "styled-components";
import TableList from "./Components/Tables/TableList";
import Reports from "./Pages/Reports";
import UpdateReports from "./Components/Reports/UpdateReports";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import TopBar from "./Components/TopBar/TopBar";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectRoute";
import { useSelector } from "react-redux";
import TestRequestEdit from "./Pages/TestRequestEdit";
import PDFViewerPage from "./Pages/PDFViewer";

export default function App() {
  const { user } = useSelector((state) => state.auth);
  const [display, setDisplay] = useState("none");
  const [side, setSide] = useState("none");

  return (
    <BrowserRouter>
      {user && <Sidebar setSide={setSide} side={side} />}

      <TopBar />
      <Content side={side}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="test_schedule"
            element={
              <ProtectedRoute>
                <TestSchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="product"
            element={
              <ProtectedRoute>
                <TestRequest /> cd
              </ProtectedRoute>
            }
          />
          <Route
            path="testrequest"
            element={
              <ProtectedRoute>
                <Tabs />
              </ProtectedRoute>
            }
          />
          <Route
            path="editForm/:testRequestId"
            element={
              <ProtectedRoute>
                <TestRequestEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="bookin"
            element={
              <ProtectedRoute>
                <BookIn />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="bookin/:bookId"
            element={
              <ProtectedRoute>
                <TableList />
              </ProtectedRoute>
            }
          />
          <Route path="reports" element={<Reports />} />
          <Route path="schedule/com/:testId" element={<UpdateReports />} />
          <Route path="pdfviewer/:testRequestId" element={<PDFViewerPage />} />
          {/* <Route path="bookin/:bookId" element={<T />} /> */}
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Content>

      <ToastContainer />
    </BrowserRouter>
  );
}

const Content = styled.div`
  flex: 4;
  box-sizing: border-box;
  margin-top: 60px;
  margin-left: ${(props) => (props.side === "block" ? "300px" : "80px")};
  // margin-left: 300px;
  // width: 100%;
  transition: 0.5s linear;
`;
