import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Port as Port } from "./pages/port";
import { Dashboard } from "./pages/Dashboard";
import { Scan } from "./pages/scan";
import { Settings } from "./pages/scan/settings";

export interface RouteItem {
    label: string;
    path: string;
    element?: JSX.Element;
    adminOnly?: boolean;
}

export class Router extends React.Component {
    static routes: RouteItem[] = [
        {
            label: "대시보드",
            path: "/",
            element: <Dashboard />,
        },
        {
            label: "보안 스캔 기록",
            path: "/scan",
            element: <Scan />,
            // adminOnly: true,
        },
        {
            label: "보안 스캔 설정",
            path: "/scan/settings",
            element: <Settings />,
            // adminOnly: true,
        },
        {
            label: "허용된 포트 관리",
            path: "/port",
            element: <Port />,
            // adminOnly: true,
        },
    ];

    private browserRouter = createBrowserRouter(Router.routes);

    render() {
        return <RouterProvider router={this.browserRouter} />;
    }
}
