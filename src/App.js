import React from "react";
import SignUp from "./components/SignUp";
import {Container} from  "react-bootstrap";
import {AuthProvider} from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { RequireAuth } from "./components/RequireAuth";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{minHeight: "100vh"}}
        >
            <div className="w-100" style={{maxWidth: "400px"}}>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    <RequireAuth>
                                        <Dashboard />
                                    </RequireAuth>
                                } 
                            />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </div>
        </Container>
    )
}

export default App;