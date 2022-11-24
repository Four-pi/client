import { Doughnut } from "react-chartjs-2";
import { findAllAddressByReportId } from "../models/address-status";
import { Report } from "../models/base";

export function ReportChart({ report }: { report: Report }) {
    const count = {
        offline: 0,
        online: {
            authorized: 0,
            unauthorized: 0,
        }
    };

    findAllAddressByReportId(report.id).forEach(address => {
        if (!address.isOnline) {
            count.offline += 1;
            return;
        }
        if (address.isAuthorized) {
            count.online.authorized += 1;
            return;
        }
        count.online.unauthorized += 1;
    })

    const chartData = {
        labels: ["오프라인", "온라인 (허가됨)", "온라인 (허가되지 않음)"],
        datasets: [
            {
                label: "Nmap 스캔 결과",
                data: [
                    count.offline, count.online.authorized, count.online.unauthorized
                ],
                backgroundColor: [
                    "rgb(108,117,125)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 99, 132)",
                ],
                hoverOffset: 4,
            },
        ],
    };

    return <Doughnut data={chartData} />;

}
