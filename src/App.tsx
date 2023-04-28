import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import BuyerDesigns from "./pages/BuyerDesigns/BuyerDesigns";
import BuyerDesign from "./pages/BuyerDesign/BuyerDesign";
import Account from "./pages/Account/Account";
import Messages from "./pages/Messages/Messages";
import MakerAtelier from "./pages/MakerAtelier/MakerAtelier";
import Auth from "./pages/Auth/Auth";
import NavLinks from "./components/NavLinks/NavLinks";
import { useAppSelector } from "./redux/hooks";
import { isShowBottomNav } from "./redux/reducers/uiSlice";


function App() {
  const Layout = () => {
    const bottomNav = useAppSelector(isShowBottomNav);
    return (
      <div className="layoutContainer">
        <Navbar />
        <Outlet />
        <Footer />
        {/* {bottomNav && <Footer />} */}
        {bottomNav && <NavLinks showOnMobile={true}/>}
      </div>
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
          path: "/auth",
          element: <Auth />,
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
          path: "/maker-atelier/:id",
          element: <MakerAtelier />,
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
