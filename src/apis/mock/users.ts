/**
 * 목업 데이터로 사용되는 사용자 정보들을 이 곳에서 관리합니다.
 */

import { User } from "../../models/base";

type MockUser = User & {
    password: string;
}

export const MOCK_USERS: MockUser[] = [
    {
        id: 'admin',
        name: "관리자-김동주",
        password: 'admin',
        department: 'Four-Pi',
        created_at: new Date().toISOString(),
    },
    {
        id: 'test',
        name: "관리자-김동주",
        password: 'admin',
        department: 'Four-Pi',
        created_at: new Date().toISOString(),
    },
    {
        id: 'rndhkrndhk',
        name: "녹두로",
        password: 'admin',
        department: '모바일사업부',
        created_at: "2008-01-14T04:33:35Z",
    },
    {
        id: 'qhals',
        name: "와우",
        password: 'admin',
        department: '모바일사업부',
        created_at: "2008-01-14T04:33:35Z",
    },
    {
        id: 'J-dragon',
        password: 'admin',
        name: "이재용",
        department: '삼성',
        created_at: "2008-01-14T04:33:35Z",
    },
    {
        id: 'applelove',
        password: 'admin',
        name: "팀쿡",
        department: 'Apple',
        created_at: "2008-01-14T04:33:35Z",
    },
    {
        id: 'qhals77',
        name: "김보민",
        password: "1234",
        department: "근로장학부",
        created_at: "2022-11-24T04:33:35Z",
    }
];