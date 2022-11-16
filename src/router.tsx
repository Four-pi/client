import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ScanSettingsPage } from "./pages/scan/settings";
import { MainPage } from "./pages/main";
import { ScanReportsPage } from "./pages/scan/reports";
import { PortListPage } from "./pages/port/list";
import { PortSettingsPage } from "./pages/port/settings";
import { UserListPage } from "./pages/user/list";
import { ReviewedPortRequestPage } from "./pages/port/request/reviewed";
import { PendingPortRequestPage } from "./pages/port/request/pending";
import { PortRequestCreatePage } from "./pages/port/request/create";

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
            element: <MainPage />,
        },
        {
            label: "스캔 기록 보기",
            path: "/scan/log",
            element: <ScanReportsPage />,
        },
        {
            label: "스캔 설정",
            path: "/scan/settings",
            element: <ScanSettingsPage />
        },
        {
            label: "포트 상태 보기",
            path: "/port/list",
            element: <PortListPage />
        },
        {
            label: "포트 설정",
            path: "/port/settings",
            element: <PortSettingsPage />
        },
        {
            label: "포트 사용 요청 생성",
            path: "/port/request/create",
            element: <PortRequestCreatePage />
        },
        {
            label: "처리된 요청 보기",
            path: "/port/request/reviewed",
            element: <ReviewedPortRequestPage />
        },
        {
            label: "처리 대기중인 요청 보기",
            path: "/port/request/pending",
            element: <PendingPortRequestPage />
        },
        // {
        //     label: "계정 추가하기",
        //     path: "/user/create",
        // },
        {
            label: "계정 목록 보기",
            path: "/user/list",
            element: <UserListPage />
        },
    ];

    private browserRouter = createBrowserRouter(Router.routes);

    render() {
        return <RouterProvider router={this.browserRouter} />;
    }
}
