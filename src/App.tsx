import React from 'react';
import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import SignUp from "./user/views/Authentication/SignUp";
import SignIn from "./user/views/Authentication/SignIn";
import OAuth from "./user/views/Authentication/OAuth";

function App() {
    return (
        <>
            <Routes>
                {/* 기본 경로로 접속했을 때 /auth/sign-in으로 리다이렉트 */}
                <Route path="/" element={<Navigate to="/auth/sign-in" />} />

                <Route path='/auth'>
                    <Route path='sign-up' element={<SignUp/>}/>
                    <Route path='sign-in' element={<SignIn/>}/>
                    <Route path='oauth-response/:token/:expirationTime' element={<OAuth/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
