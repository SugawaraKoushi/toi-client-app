import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./components/Root";
import Lab1 from "./components/Lab1";

axios.defaults.baseURL = "http://localhost:8080/api";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "/lab1", element: <Lab1 />}
        ]
    },
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
