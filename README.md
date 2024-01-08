This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app --typescript`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Introduce

- 오렌즈, 렌즈미, 렌즈타운 3사 브랜드의 렌즈 정보를 볼 수 있는 통합 렌즈사이트.
- Next.js, styled-components가 사용되었다.
- 각기 다른 브랜드의 렌즈 정보를 취합하여 한눈에 직관적으로 비교할 수 있도록 한 서비스이다.


## Requirement

- 프로젝트의 루트 경로에 있는 **lens-ddl-dml.sql** 파일을 **mysql** 에서 실행합니다.
```bash
source path/to/lens-ddl-dml.sql;
```


## Install

```bash
npm install
```

## Run Development Mode

```bash
npm run dev
```

## Setting Environment Variables

프로젝트를 실행하기 위해서는 MySQL 연결 정보를 설정해야 합니다.
아래와 같이 `.env.local` 파일을 생성하고, MySQL 연결 정보를 추가하세요.

1. 프로젝트 루트 디렉토리에 `.env.local` 파일을 생성합니다.

2. `.env.local` 파일에 다음과 같이 MySQL 연결 정보를 추가합니다:

  ```dotenv
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_DATABASE=your_mysql_database
```

## Page Description

#### Main Page
- 프로모션 진행중인 렌즈
- 착용기간, 브랜드별 베스트 상품
- TS Sample: [pages/index.tsx](https://github.com/goodjean/next-lensmore/blob/main/src/pages/index.tsx)

#### Search Page
- 인기검색어 순위
- 검색창
- TS Sample: [pages/search/index.tsx](https://github.com/goodjean/next-lensmore/blob/main/src/pages/search/index.tsx)

#### Detail Page
- 렌즈 디테일 정보
- TS Sample: [pages/product/id](https://github.com/goodjean/next-lensmore/blob/main/src/pages/product/%5Bid%5D.tsx)

#### Filter Page
- 필터링 조건 선택
- 다중 선택 가능
- TS Sample: [pages/filter/index.tsx](https://github.com/goodjean/next-lensmore/blob/main/src/pages/filter/index.tsx)

#### Brand Page
- 각 브랜드 정보
- 해당 브랜드 페이지로 가는 링크
- TS Sample: [pages/menu/brand.tsx](https://github.com/goodjean/next-lensmore/blob/main/src/pages/menu/brand.tsx)

#### Period Page
- 착용 기간별 렌즈 정보
- 하루착용, 2주/한달착용, 장기착용
- TS Sample: [pages/menu/all-products/index.tsx](https://github.com/goodjean/next-lensmore/blob/main/src/pages/menu/all-products/index.tsx)

#### WishList Page
- 찜한 상품
- 찜목록 전체 삭제하기
- TS Sample: [pages/menu/my-page.tsx](https://github.com/goodjean/next-lensmore/blob/main/src/pages/menu/my-page.tsx)

#### SignIn/SignUp Page
- 회원가입하기
- 로그인하기
- 로그아웃
- TS Sample:
  - 로그인 [pages/auth/signin.tsx](https://github.com/goodjean/next-lensmore/blob/main/src/pages/auth/signin.tsx)
  - 회원가입 [pages/auth/signup.tsx](https://github.com/goodjean/next-lensmore/blob/main/src/pages/auth/signup.tsx)
#### Result Page
- 필터링된 렌즈 
- 검색된 렌즈 
- 착용 기간별 렌즈
- TS Sample:
  - 검색 [pages/search/results/keyword.tsx](https://github.com/goodjean/next-lensmore/blob/main/src/pages/search/results/%5Bkeyword%5D.tsx)
  - 필터 [pages/filter/results.tsx](https://github.com/goodjean/next-lensmore/blob/main/src/pages/filter/results.tsx)
  - 착용 기간 [pages/menu/all-products/period.tsx](https://github.com/goodjean/next-lensmore/blob/main/src/pages/menu/all-products/%5Bperiod%5D.tsx)


