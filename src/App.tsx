import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import BuyerDesigns from "./pages/BuyerDesigns/BuyerDesigns";
import BuyerDesign from "./pages/BuyerDesign/BuyerDesign";
import Dashboard from "./pages/Dashboard/Dashboard";
import Messages from "./pages/Messages/Messages";
import MakerAtelier from "./pages/MakerAtelier/MakerAtelier";
import Auth from "./pages/Auth/Auth";
import NavLinks from "./components/NavLinks/NavLinks";
import { useAppSelector } from "./redux/hooks";
import { isShowBottomNav } from "./redux/reducers/uiSlice";
import Projects from "./pages/Projects/Projects";
import Project from "./pages/Project/Project";

function App() {
  const Layout = () => {
    const bottomNav = useAppSelector(isShowBottomNav);
    return (
      <div className="layoutContainer">
        <Navbar />
        <Outlet />
        <Footer />
        {/* {bottomNav && <Footer />} */}
        {bottomNav && <NavLinks showOnMobile={true} />}
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
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/projects/:id",
          element: <Project />,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
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
