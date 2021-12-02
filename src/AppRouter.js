import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MyProfile from "./components/users/MyProfile";
import UserProfile from "./components/users/UserProfile";
import Index from "./components/Index"
import ShowTweets from "./components/tweets/ShowTweets";
import Header from "./components/shared/Header";

const AppRouter = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Index/>}/>
                <Route exact path="/analysis/:hashtag" element={<ShowTweets/>}/>
                <Route exact path="/me" element={<MyProfile/>}/>
                <Route exact path="/users/:id" element={<UserProfile/>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default AppRouter;