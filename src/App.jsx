import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import AuthContext from "./context/authContext";

import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import ArticlesList from "./Pages/Articles/ArticlesList";
import ArticleDetails from "./Pages/Articles/ArticleDetails";
import AddArticle from "./Pages/Articles/AddArticle";
import MyArticles from "./Pages/Articles/MyArticles";
import EditArticle from "./Pages/Articles/EditArticle";

function App() {
  const { userData } = useAuth();
  const [authData, setAuthData] = useState({
    signedIn: userData.signedIn,
    user: userData.user,
    token: userData.token,
  });

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="article" element={<ArticlesList />}></Route>
          <Route path="article/:slug" element={<ArticleDetails />}></Route>
          <Route path="my-articles" element={<MyArticles />}></Route>
          <Route path="article/create" element={<AddArticle />}></Route>
          <Route path="article/:slug/edit" element={<EditArticle />}></Route>
        </Routes>
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
