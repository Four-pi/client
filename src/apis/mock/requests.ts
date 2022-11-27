/**
 * 목업 데이터로 사용되는 "포트 요청" 정보들을 이 곳에서 관리합니다.
 *
 * 반드시 각 요청의 id 값이 중복되지 않도록 주의해주세요.
 */

import { Request } from "../../models/base";

export const MOCK_REQUESTS: Request[] = [
    {
        id: "1",
        created_by: {
            id: 'test-user',
            name: "김보민",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "3000",
        usage: "장난감",
    },
    {
        id: "2",
        created_by: {
            id: 'tet-user',
            name: "김동주",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "3000",
        usage: "서버 열기",
    },
    {
        id: "3",
        created_by: {
            id: 'tet-user',
            name: "김동주",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "3001",
        usage: "",
    },
    {
        id: "4",
        created_by: {
            id: 'tet-user',
            name: "김동주",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "3002",
        usage: "",
    },
    {
        id: "5",
        created_by: {
            id: 'test-user',
            name: "김보민",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "4000",
        usage: "",
        reviewed_at: "2008-01-14T04:33:35Z",
        reviewed_by: {
            id: 'test-user',
            name: "김보민",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        is_approved: true
    },
    {
        id: "6",
        created_by: {
            id: 'test-user',
            name: "김보민",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "4020",
        usage: "",
        reviewed_at: "2008-01-14T04:33:35Z",
        reviewed_by: {
            id: 'test-user',
            name: "김보민",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        is_approved: false
    },
    {
        id: "7",
        created_by: {
            id: 'tet-user',
            name: "김동주",
            department: "모aa바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "1874",
        usage: "",
    },
];