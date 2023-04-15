import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import BuyerDesigns from "./pages/BuyerDesigns/BuyerDesigns";
import BuyerDesign from "./pages/BuyerDesign/BuyerDesign";
import Account from "./pages/Account/Account";
import Messages from "./pages/Messages/Messages";

function App() {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/buyer-designs",
          element: <BuyerDesigns />,
        },
        {
          path: "/buyer-designs/:id",
          element: <BuyerDesign />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
