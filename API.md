# 로그인


## 사용자

### 사용자 정보 열람

**GET** `/user/{id}`

특정 아이디의 사용자 정보를 얻는다.

#### params

클라이언트는 로그인 중인 사용자의 아이디와 비밀번호를 param으로 보낸다.

```json
{
    "id": string
    "password": string
}
```

#### Example response

서버는 클라이언트로부터 받은 사용자 정보를 통해 해당 정보를 얻을 수 있는 사용자인지 판단한다.

```json
{
    "id": "test-user",
    "name": "김보민",
    "mail": "test@test.com",
    "company": "test.com",
    "created_at": "2008-01-14T04:33:35Z",
    "is_admin": true
}
```

POST /api/{version:int}/user/signup
