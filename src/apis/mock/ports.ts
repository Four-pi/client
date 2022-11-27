/**
 * 목업 데이터로 사용되는 "포트" 정보들을 이 곳에서 관리합니다.
 *
 * is_open 속성은 해당 포트가 허가되었는지를 의미합니다.
 */

import { Port } from "../../models/base";

export const MOCK_PORTS: Port[] = [
    { ip: 'localhost', port: "3000", is_open: true },
    { ip: 'localhost', port: "80", is_open: true },
    { ip: 'localhost', port: "8080", is_open: true },
    { ip: 'localhost', port: "9999", is_open: true },
];