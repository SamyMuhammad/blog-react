import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import ArticlesList from "./Pages/Articles/ArticlesList";
import ArticleDetails from "./Pages/Articles/ArticleDetails";
import AddArticle from "./Pages/Articles/AddArticle";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MyArticles from "./Pages/Articles/MyArticles";
import EditArticle from "./Pages/Articles/EditArticle";

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
        <Route path="article/:slug/edit" element={<EditArticle />}></Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
