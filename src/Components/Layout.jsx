import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

function Layout({ children }) {
  const { loginUserOnStartup } = useAuth();

  useEffect(() => {
    loginUserOnStartup();
  }, []);

  return (
    <>
      <Header />
      {children}
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Layout;
