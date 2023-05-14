import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth/Auth";
import Projects from "./pages/Projects/Projects";
import Project from "./pages/Project/Project";
import Makers from "./pages/Makers/Makers";
import Setting from "./pages/Setting/Setting";
import Layout from "./components/Layout/Layout";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import DashboardMakers from "./pages/DashboardMakers/DashboardMakers";
import Messages from "./pages/Messages/Messages";
import ClientProjects from "./pages/ClientProjects/ClientProjects";
import User from "./pages/User/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<Project />} />
        <Route path="user/:accountId" element={<User />} />
        <Route
          path="account/:accountId/projects"
          element={<ClientProjects />}
        />
        <Route path="makers" element={<Makers />} />
        <Route path="auth" element={<Auth />} />
        <Route path="messages" element={<Messages />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="settings/:accountId" element={<Setting />} />
        </Route>
        <Route element={<ProtectedRoutes allowRole={"Client"} />}>
          <Route path="dashboard/clients" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoutes allowRole={"Maker"} />}>
          <Route path="dashboard/makers" element={<DashboardMakers />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
