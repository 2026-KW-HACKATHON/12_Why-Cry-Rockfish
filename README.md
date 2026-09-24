# 실거주 아카이브 (Why-Cry-Rockfish)

2026 광운대학교 KW해커톤 출품작입니다. 광운대학교 인근(월계1동) 원룸·오피스텔·빌라의 **실제 거주 경험**(난방비 체감, 곰팡이·결로, 소음, 채광 등)을 익명 제보로 모아, 계약 전에 확인할 수 있게 하는 웹 서비스입니다.

## 주요 기능

- 건물 검색 및 신규 등록 (다음 우편번호 서비스로 실제 주소 검색·자동입력, 중복 건물 자동 감지)
- 실거주 경험 제보 작성 (구글 로그인 필요)
- 제보 1건을 남기면 모든 건물의 상세 정보를 열람할 수 있는 기여 기반 열람 구조
- 임대차계약서 사진 제출 → 관리자 검토 후 "계약서 인증" 배지 부여
- 관리자 전용 검토 페이지

## 기술 스택

- 프론트엔드: HTML / CSS / JavaScript (Vanilla, 해시 기반 라우팅)
- 백엔드: [Firebase](https://firebase.google.com/) (Authentication, Firestore, Storage)
- 배포: GitHub Pages

## 사용한 오픈소스 / 외부 리소스 출처

- **건물 예시 사진**: [PhilopaterHany/Luxestate-Template](https://github.com/PhilopaterHany/Luxestate-Template) (ISC License) — `dist/images/` 내 건물 외관 이미지 일부를 데모용 건물 사진으로 사용했습니다.
- **주소 검색**: [다음(카카오) 우편번호 서비스](https://postcode.map.daum.net/guide) — 실제 도로명주소 검색 및 자동입력에 사용했습니다.
- **폰트**: [Google Fonts](https://fonts.google.com/) — Gowun Batang, IBM Plex Sans KR, IBM Plex Mono (Open Font License)
- **백엔드 플랫폼**: [Firebase](https://firebase.google.com/) (Google) — 로그인, 데이터베이스, 파일 저장소로 사용했습니다.

## 실행 방법

1. `index.html`을 웹 서버(GitHub Pages 등)에 배포
2. Firebase 콘솔에서 프로젝트 생성 후 `FIREBASE_CONFIG` 값을 `index.html`에 입력
3. Firestore / Storage 보안 규칙 적용
4. 관리자 계정으로 접속 후 `#/admin`에서 데모 데이터 시딩 (선택)
