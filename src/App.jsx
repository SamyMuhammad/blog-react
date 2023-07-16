import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import ArticlesList from "./Pages/Articles/ArticlesList";
import ArticleDetails from "./Pages/Articles/ArticleDetails";
import AddArticle from "./Pages/Articles/AddArticle";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MyArticles from "./Pages/Articles/MyArticles";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="article" element={<ArticlesList />}></Route>
        <Route path="article/:slug" element={<ArticleDetails />}></Route>
        <Route path="my-articles" element={<MyArticles />}></Route>
        <Route path="article/create" element={<AddArticle />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
