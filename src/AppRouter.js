import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MyProfile from "./components/users/MyProfile";
import UserProfile from "./components/users/UserProfile";
import Index from "./components/Index"
import Trending from "./components/trending/Trending"
import ShowTweets from "./components/tweets/ShowTweets";
import Header from "./components/shared/Header";
import Login from "./components/login/Login";
import GLogout from "./components/login/GLogout";
import Register from "./components/login/Register";


const AppRouter = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Index/>}/>
                <Route exact path="/analysis/:hashtag" element={<ShowTweets/>}/>
                <Route exact path="/me" element={<MyProfile/>}/>
                <Route exact path="/users/:id" element={<UserProfile/>}/>
                <Route exact path="/logout" element={GLogout}/>
                <Route exact path="/trending" element={<Trending/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;