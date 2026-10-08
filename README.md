[README.md](https://github.com/user-attachments/files/33211779/README.md)
# 집속사정 (Why-Cry-Rockfish)

> 계약 전에, 먼저 살아본 사람에게 물어보세요.

2026 광운대학교 KW해커톤 출품작 (12팀 Why-Cry-Rockfish)입니다.
광운대학교 인근 **월계1동**의 원룸·오피스텔·빌라에 대해, 실제 거주자의 경험(난방비 체감, 곰팡이·결로, 소음, 채광 등)과 국토교통부 공공데이터를 한곳에 모아 **계약 전에 확인할 수 있게 하는 주거 공유 플랫폼**입니다.

- 서비스 주소: https://2026-kw-hackathon.github.io/12_Why-Cry-Rockfish/
- 휴대폰에서는 "홈 화면에 추가"로 앱처럼 설치할 수 있습니다 (PWA).

## 해결하려는 문제

광운대 학생 상당수가 월계1동에서 자취하지만, 난방비·곰팡이·방음처럼 **살아봐야 아는 정보**는 매물 사진이나 중개 설명으로 알 수 없습니다. 집속사정은 먼저 살아본 사람의 기록과 공식 거래 데이터를 함께 보여줘 정보 비대칭을 줄입니다.

## 주요 기능

- **건물 탐색**: 월계1동 건물 약 490곳을 목록·카카오 지도로 제공, 띄어쓰기 무시 검색, 거래유형·보증금·월세 필터, 광운대역·광운대까지 도보 시간 표시
- **건물 상세**: 국토부 최근 실거래가, 건축물대장 요약(준공연도·층수·면적), 거주자 평가 육각형 그래프, 로드뷰·위성사진·제보 사진
- **실거주 후기 제보**: 가격·관리비·난방·채광·곰팡이·소음·별점·사진 입력, 제보 1건으로 전체 상세 정보 열람 (기여 기반 열람 구조), 같은 위치 중복 건물 자동 감지
- **계약서 인증**: 임대차계약서 사진 제출 → 관리자 검토 → "OO빌라 거주중" 배지 부여, **검토 즉시 계약서 사진 삭제**
- **익명 종합게시판**: 블라인드 방식 익명 커뮤니티 (글쓴이·익명1·익명2 표시), 거주 인증자만 전체 게시판 이용, 미인증자는 자유게시판만 이용
- **우럭 AI 챗봇**: 건물 데이터를 바탕으로 집 추천·질문 응답 (Firebase AI Logic, Gemini)
- **관리자 기능**: 건물 이름 수정, 계약서 인증 승인, 제보 숨김·삭제, 공지사항, 문의·허위매물 신고 처리, 공개 데이터 개인정보 정리
- **앱 설치(PWA)**: 홈 화면 설치, 전체 화면 실행, 오프라인 시 마지막 화면 표시

## 개인정보 보호 · 안전 설계

- 작성자 이름·이메일을 공개 데이터에 저장하지 않음 (익명 표시)
- 계약서 사진은 관리자만 열람 가능한 별도 저장소에 보관하고, 검토가 끝나면 즉시 삭제
- 권한(관리자, 거주 인증 배지, 게시판 열람 범위)은 화면이 아닌 Firestore 보안 규칙(`firestore.rules`)으로 서버 측에서 검증
- 후기·게시글 작성 시 명예훼손 경고 문구, 전화번호·주민번호 자동 차단, 신고·숨김 기능

## 기술 스택

| 영역 | 사용 기술 | 선택 이유 |
|---|---|---|
| 프론트엔드 | HTML / CSS / JavaScript (Vanilla, 해시 기반 라우팅, 단일 파일) | 빌드 없이 즉시 배포·수정 가능해 단기간 개발에 적합 |
| 호스팅 | GitHub Pages | 무료, 저장소 업로드만으로 배포 |
| 로그인 · DB | [Firebase](https://firebase.google.com/) Authentication, Cloud Firestore | 서버 없이 로그인·실시간 DB 구축, 보안 규칙으로 권한 통제 |
| AI | Firebase AI Logic (Gemini) | API 키 노출 없이 서버리스로 AI 기능 구현 |
| 지도 | 카카오맵 JavaScript API (지도·로드뷰·스카이뷰·장소 검색), Leaflet + OpenStreetMap (예비) | 국내 골목 단위 데이터와 로드뷰가 가장 정확 |
| 공공데이터 | 국토교통부 실거래가 공개시스템, 건축물대장 | 공식 자료로 신뢰도 확보, 후기 없는 건물도 가격 정보 제공 |
| 앱 | PWA (Web App Manifest, Service Worker) | 앱스토어 없이 설치형 앱 경험 제공 |

## 파일 구성

```
index.html             사이트 전체 (화면·기능)
firestore.rules        Firestore 보안 규칙
manifest.webmanifest   앱 설치 정보 (이름·아이콘)
sw.js                  서비스 워커 (앱 설치·오프라인 대비)
icons/                 앱 아이콘
```

## 실행 방법

1. `index.html`, `manifest.webmanifest`, `sw.js`, `icons/`를 웹 서버(GitHub Pages 등)에 배포
2. Firebase 콘솔에서 프로젝트 생성 후 `FIREBASE_CONFIG` 값을 `index.html`에 입력
3. Authentication에서 Google·이메일 로그인 활성화, 배포 도메인을 승인된 도메인에 추가
4. `firestore.rules`를 Firestore 보안 규칙에 게시
5. 카카오 개발자 콘솔에서 JavaScript 키 발급 후 `window.__KAKAO_JS_KEY__`에 입력, 배포 도메인 등록
6. (선택) Firebase AI Logic 활성화 → 우럭 AI 사용

## 사용한 오픈소스 · 외부 리소스 출처

- **지도·로드뷰·장소 검색**: [카카오맵 JavaScript API](https://apis.map.kakao.com/) (Kakao)
- **주소 검색**: [다음(카카오) 우편번호 서비스](https://postcode.map.daum.net/guide)
- **예비 지도**: [Leaflet](https://leafletjs.com/) (BSD-2-Clause), 지도 데이터 © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors (ODbL), 주소→좌표 변환 Nominatim
- **실거래가**: [국토교통부 실거래가 공개시스템](https://rt.molit.go.kr/)
- **건축물 정보**: 국토교통부 건축물대장
- **백엔드 플랫폼**: [Firebase](https://firebase.google.com/) (Google) — Authentication, Cloud Firestore, AI Logic(Gemini)
- **폰트**: Black Han Sans, Gowun Batang ([Google Fonts](https://fonts.google.com/), SIL Open Font License), [Pretendard](https://github.com/orioncactus/pretendard) (SIL Open Font License)
- **건물 기본 사진**: [PhilopaterHany/Luxestate-Template](https://github.com/PhilopaterHany/Luxestate-Template) (ISC License) — `dist/images/` 내 건물 외관 이미지 일부를 사진이 없는 건물의 기본 이미지로 사용
- **홈 화면 광운대학교 사진**: [출처 기입 필요]

## 팀

| 이름 | 역할 |
|---|---|
| 배석원 | [구현, 데이터, 베포] |
| 강민서 | [기획, 프론트] |
