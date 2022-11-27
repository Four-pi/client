/**
 * 목업 데이터로 사용되는 "포트 스캔 대상 ip, subnet mask" 정보들을 이 곳에서 관리합니다.
 *
 * subnet_mask는 생략가능합니다.
 */

import { ScanTarget } from "../../models/base";

export const MOCK_SCAN_TARGET: ScanTarget[] = [
    { ip: "127.0.0.1", subnet_mask: "24" },
    { ip: "8.8.8.8" },
    { ip: "bobomin.co.kr" },
    { ip: "google.com" },
    { ip: "192.168.0.1", subnet_mask: "8" },
];