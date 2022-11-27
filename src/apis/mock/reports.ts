/**
 * 목업 데이터로 사용되는 "Nmap 스캔 결과" 정보들을 이 곳에서 관리합니다.
 *
 * 반드시 각 스캔 결과의 id 값이 중복되지 않도록 주의해주세요.
 *
 * 생성된 날짜는 "년-월-일 시:분:초" 형식으로 작성하면 됩니다.
 *  시:분:초는 생략가능하나, 그렇게 하면 웹에는 9:00 AM으로 표시됩니다.
 */

import { Report, PortReport } from "../../models/base";

// 여기 있는 목록은 "즉시 스캔"을 시행하면, 새로운 스캔 결과로 등록될 데이터입니다.
export const TEMPLATE_PORT_REPORTS: PortReport[] = [
    {
        ip: "192.168.13.121",
        port: "135",
        protocol: "tcp",
        service: "msrpc",
        version: "Microsoft Windows RPC"
    },
    {
        ip: "192.168.13.121",
        port: "139",
        protocol: "tcp",
        service: "netbios-ssn",
        version: "Microsoft Windows netbios-ssn"
    },
    {
        ip: "192.168.13.121",
        port: "443",
        protocol: "tcp",
        service: "ssl/https",
        version: "VMware Workstation SOAP API 16.1.0"
    },
    {
        ip: "192.168.13.121",
        port: "903",
        protocol: "tcp",
        service: "ssl/vmware-auth",
        version: "VMware Authentication Daemon 1.10 (Uses VNC, SOAP)"
    },
    {
        ip: "192.168.13.121",
        port: "1024",
        protocol: "tcp",
        service: "msrpc",
        version: "Microsoft Windows RPC"
    },
    {
        ip: "192.168.13.121",
        port: "1026",
        protocol: "tcp",
        service: "msrpc",
        version: "Microsoft Windows RPC"
    },
    {
        ip: "192.168.13.121",
        port: "3389",
        protocol: "tcp",
        service: "ms-wbt-server",
        version: "Microsoft Terminal Services"
    },
    {
        ip: "192.168.13.121",
        port: "5357",
        protocol: "tcp",
        service: "http",
        version: "Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)"
    },
    {
        ip: "192.168.13.129",
        port: "80",
        protocol: "tcp",
        service: "soap",
        version: "gSOAP 2.7"
    },
    {
        ip: "192.168.13.129",
        port: "631",
        protocol: "tcp",
        service: "soap",
        version: "gSOAP 2.7"
    },
    {
        ip: "192.168.13.129",
        port: "8080",
        protocol: "tcp",
        service: "soap",
        version: "gSOAP 2.7"
    },
    {
        ip: "192.168.13.170",
        port: "5357",
        protocol: "tcp",
        service: "http",
        version: "Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)"
    },
    {
        ip: "192.168.13.179",
        port: "5000",
        protocol: "tcp",
        service: "rtsp",
        version: "AirTunes rtspd 665.13.1"
    },
    {
        ip: "192.168.13.179",
        port: "7000",
        protocol: "tcp",
        service: "rtsp",
        version: "AirTunes rtspd 665.13.1"
    },
    {
        ip: "192.168.13.182",
        port: "135",
        protocol: "tcp",
        service: "msrpc",
        version: "Microsoft Windows RPC"
    },
    {
        ip: "192.168.13.182",
        port: "139",
        protocol: "tcp",
        service: "netbios-ssn",
        version: "Microsoft Windows netbios-ssn"
    },
    {
        ip: "192.168.13.182",
        port: "3306",
        protocol: "tcp",
        service: "mysql",
        version: "MySQL (unauthorized)"
    },
    {
        ip: "192.168.13.183",
        port: "135",
        protocol: "tcp",
        service: "msrpc",
        version: "Microsoft Windows RPC"
    },
    {
        ip: "192.168.13.183",
        port: "139",
        protocol: "tcp",
        service: "netbios-ssn",
        version: "Microsoft Windows netbios-ssn"
    },
    {
        ip: "192.168.13.183",
        port: "902",
        protocol: "tcp",
        service: "ssl/vmware-auth",
        version: "VMware Authentication Daemon 1.10 (Uses VNC, SOAP)"
    },
    {
        ip: "192.168.13.183",
        port: "912",
        protocol: "tcp",
        service: "vmware-auth",
        version: "VMware Authentication Daemon 1.0 (Uses VNC, SOAP)"
    },
    {
        ip: "192.168.13.183",
        port: "5357",
        protocol: "tcp",
        service: "http",
        version: "Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)"
    },
    {
        ip: "192.168.13.183",
        port: "5800",
        protocol: "tcp",
        service: "vnc-http",
        version: "TightVNC (user: desktop-pap9t6v; VNC TCP port: 5900)"
    },
    {
        ip: "192.168.13.183",
        port: "5900",
        protocol: "tcp",
        service: "vnc",
        version: "VNC (protocol 3.8)"
    },
    {
        ip: "192.168.13.193",
        port: "903",
        protocol: "tcp",
        service: "ssl/vmware-auth",
        version: "VMware Authentication Daemon 1.10 (Uses VNC, SOAP)"
    },
    {
        ip: "192.168.13.193",
        port: "5357",
        protocol: "tcp",
        service: "http",
        version: "Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)"
    },
    {
        ip: "192.168.13.195",
        port: "3306",
        protocol: "tcp",
        service: "mysql",
        version: "MySQL (unauthorized)"
    },
    {
        ip: "192.168.13.1",
        port: "22",
        protocol: "tcp",
        service: "ssh",
        version: "Cisco SSH 1.25 (protocol 1.99)"
    },
    {
        ip: "192.168.13.233",
        port: "22",
        protocol: "tcp",
        service: "ssh",
        version: "OpenSSH 7.6p1 Ubuntu 4ubuntu0.7 (Ubuntu Linux; protocol 2.0)"
    },
    {
        ip: "192.168.13.253",
        port: "22",
        protocol: "tcp",
        service: "ssh",
        version: "Cisco SSH 1.25 (protocol 1.99)"
    },
    {
        ip: "192.168.13.253",
        port: "23",
        protocol: "tcp",
        service: "telnet",
        version: "Cisco router telnetd"
    },
    {
        ip: "192.168.13.2",
        port: "22",
        protocol: "tcp",
        service: "ssh",
        version: "(protocol 2.0)"
    },
    {
        ip: "192.168.13.2",
        port: "443",
        protocol: "tcp",
        service: "ssl/http",
        version: "Cisco Wireless LAN Controller httpd"
    },
    {
        ip: "192.168.13.2",
        port: "16080",
        protocol: "tcp",
        service: "http",
        version: "OpenResty web app server 1.7.10.1"
    },
    {
        ip: "192.168.13.3",
        port: "22",
        protocol: "tcp",
        service: "ssh",
        version: "OpenSSH 7.8 (protocol 2.0)"
    }
];

// 여기 있는 목록은 데모버전 스캔 결과 데이터를 의미합니다.
export const MOCK_REPORTS: Report[] = [
    {
        id: "0",
        created_at: "2022-11-21",
        reports: TEMPLATE_PORT_REPORTS
    },
    {
        id: '1',
        created_at: "2022-11-02",
        reports: [
            {
                ip: "127.0.0.0",
                port: "1",
                protocol: "http",
                service: "ssh",
                version: "Nodejs",
            },
            {
                ip: "127.0.0.0",
                port: "3000",
                protocol: "http",
                service: "ssh",
                version: "Nodejs",
            },
            {
                ip: "127.0.0.0",
                port: "3001",
                protocol: "http",
                service: "tcp",
                version: "test",
            },
            {
                ip: "localhost",
                port: "3000",
                protocol: "http",
                service: "ssh",
                version: "Nodejs",
            },
            {
                ip: "localhost",
                port: "3001",
                protocol: "http",
                service: "tcp",
                version: "test",
            },
            {
                ip: "localhost",
                port: "4000",
                protocol: "http",
                service: "tcp",
                version: "test",
            },
            {
                ip: "127.0.0.2",
                port: "3001",
                protocol: "http",
                service: "tcp",
                version: "test",
            }
        ],
    },
    {
        id: '2',
        created_at: "2022-11-01",
        reports: [
            {
                ip: "google.com",
                port: "1",
                protocol: "http",
                service: "ssh",
                version: "Nodejs",
            },
            {
                ip: "google.com",
                port: "3000",
                protocol: "http",
                service: "ssh",
                version: "Nodejs",
            },
            {
                ip: "google.com",
                port: "3001",
                protocol: "http",
                service: "tcp",
                version: "test",
            },
            {
                ip: "naver.com",
                port: "9000",
                protocol: "http",
                service: "ssh",
                version: "Nodejs",
            },
            {
                ip: "naver.com",
                port: "9999",
                protocol: "http",
                service: "tcp",
                version: "test",
            },
            {
                ip: "bobomin.co.kr",
                port: "8080",
                protocol: "http",
                service: "tcp",
                version: "test",
            },
            {
                ip: "hepheir.github.io",
                port: "80",
                protocol: "http",
                service: "ssh",
                version: "Jekyll",
            },
            {
                ip: "hepheir.github.io",
                port: "3001",
                protocol: "http",
                service: "ssh",
                version: "Linux",
            },
            {
                ip: "hepheir.github.io",
                port: "4000",
                protocol: "http",
                service: "tcp",
                version: "Docker",
            },
        ],
    }
];