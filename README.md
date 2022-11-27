# 시연

이 프로젝트는 Node.js와 npm을 사용하여 개발되었습니다.

## 실행 방법

프로젝트 폴더로 들어가서 아래의 스크립트를 실행합니다.

```shell
npm install

npm start
```

## 목업 데이터 (시연용 모조 데이터)

목업 데이터는 [/src/apis/mock/](/src/apis/mock/) 폴더 아래에 저장되어있습니다.

```
/src
├── apis/
│   ├── mock/
│   ... ├── ports.ts            # 허용된 포트 목록
│       ├── reports.ts          # 스캔 결과 목록
│       ├── requests.ts         # 요청 목록
│       ├── scan-targets.ts     # 스캔 대상
...     └── users.ts            # 사용자 목록
```

# 구조

[/ARCHITECTURE.md](/ARCHITECTURE.md)
