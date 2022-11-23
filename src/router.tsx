import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ScanSettingsPage } from "./pages/scan-settings";
import { MainPage } from "./pages/main";
import { ScanReportsPage } from "./pages/scan-reports";
import { PortListPage } from "./pages/port-list";
import { PortSettingsPage } from "./pages/port-settings";
import { UserListPage } from "./pages/user-list";
import { ReviewedPortRequestPage } from "./pages/port-request-reviewed";
import { PendingPortRequestPage } from "./pages/port-request-pending";
import { PortRequestCreatePage } from "./pages/port-request-create";

export interface RouteItem {
    label: string;
    path: string;
    element?: JSX.Element;
    adminOnly?: boolean;
}

export const sitemap = {
    dashboard: {
        label: "대시보드",
        path: "/",
        element: <MainPage />,
    },
    scan: {
        report: {
            label: "스캔 기록 보기",
            path: "/scan/log",
            element: <ScanReportsPage />,
        },
        settings: {
            label: "스캔 설정",
            path: "/scan/settings",
            element: <ScanSettingsPage />,
        },
    },
    port: {
        list: {
            label: "포트 상태 보기",
            path: "/port/list",
            element: <PortListPage />,
        },
        settings: {
            label: "포트 설정",
            path: "/port/settings",
            element: <PortSettingsPage />,
        },
        request: {
            create: {
                label: "포트 사용 요청 생성",
                path: "/port/request/create",
                element: <PortRequestCreatePage />,
            },
            reviewed: {
                label: "처리된 요청 보기",
                path: "/port/request/reviewed",
                element: <ReviewedPortRequestPage />,
            },
            pending: {
                label: "처리 대기중인 요청 보기",
                path: "/port/request/pending",
                element: <PendingPortRequestPage />,
            },
        },
    },
    user: {
        list: {
            label: "계정 목록 보기",
            path: "/user/list",
            element: <UserListPage />,
        },
    },
};

export function Router() {
    const browserRouter = createBrowserRouter([
        sitemap.dashboard,
        sitemap.port.request.create,
        sitemap.port.request.pending,
        sitemap.port.request.reviewed,
        sitemap.port.list,
        sitemap.port.settings,
        sitemap.scan.report,
        sitemap.scan.settings,
        sitemap.user.list,
    ]);

    return <RouterProvider router={browserRouter} />;
}
