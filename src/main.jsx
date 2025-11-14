import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider";
import RootLayout from "./layouts/RootLayout";
import PrivateRoute from "./routes/PrivateRoute";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import AddService from "./pages/AddService";
import MyServices from "./pages/MyServices";
import UpdateService from "./pages/UpdateService";
import MyBookings from "./pages/MyBookings";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
{
path: "/",
element: <RootLayout />,
children: [
{ index: true, element: <Home /> },
{ path: "services", element: <Services /> },
{ path: "service/:id", element: <ServiceDetails /> },
{ path: "s/:slug", element: <ServiceDetails /> },
{ path: "add-service", element: <PrivateRoute><AddService /></PrivateRoute> },
{ path: "my-services", element: <PrivateRoute><MyServices /></PrivateRoute> },
{ path: "update/:id", element: <PrivateRoute><UpdateService /></PrivateRoute> },
{ path: "my-bookings", element: <PrivateRoute><MyBookings /></PrivateRoute> },
{ path: "favorites", element: <PrivateRoute><Favorites /></PrivateRoute> },
{ path: "profile", element: <PrivateRoute><Profile /></PrivateRoute> },
{ path: "login", element: <Login /> },
{ path: "register", element: <Register /> },
{ path: "*", element: <NotFound /> }
]
}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<AuthProvider>
<RouterProvider router={router} />
<Toaster position="top-center" />
</AuthProvider>
</React.StrictMode>
);
