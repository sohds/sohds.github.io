# 오서연 , Seoyeon Oh

AI portfolio: https://sohds.github.io/

한국산업은행 인턴 경험, 금융,LLM 프로젝트, 설명 가능한 AI 연구를 소개하는 정적 웹사이트입니다.

## 로컬 실행

```sh
python3 -m http.server 4173
```

http://localhost:4173 에서 확인합니다. 별도 패키지 설치나 빌드 과정은 없습니다.

## 수정

- `index.html`: 소개, 경력, 프로젝트, 논문, 링크
- `style.css`: 레이아웃과 반응형 스타일
- `script.js`: 프로젝트 필터와 메뉴 표시
- `assets/favicon.svg`: 파비콘

## GitHub Pages

저장소 Settings → Pages에서 `Deploy from a branch`, `main`, `/ (root)`를 선택합니다. `.nojekyll`로 정적 파일을 그대로 게시합니다.

## 내용 근거

프로젝트 및 연구 소개는 [GitHub 프로필](https://github.com/sohds/sohds)과 각 프로젝트에 연결된 공개 저장소를 바탕으로 작성했습니다. 팀 프로젝트는 프로젝트 전체 범위를 설명하며 개인 단독 구현으로 표시하지 않습니다. 인턴 경험은 개인 업무 정리와 PoC 실험 기록을 바탕으로 요약했습니다. 사내 원문, 내부 시스템 주소, 개인 원본 자료는 포함하지 않습니다.


## 로고 출처

- 한국산업은행: 공식 CI 안내 페이지의 국문 가로형 시그니처. https://www.kdb.co.kr/BZCOWS00N00.act?_mnuId=IHIHIR0006&wcmsPath=%2Fhmp%2Fch%2Fbi%2Fbi%2FCHBIBI0500.html
- 미래에셋증권: 공식 CI Guide의 로고 이미지. https://securities.miraeasset.com/newir/view/mobile/kr/ciguide.jsp
- FIN:NECT: 공식 홈페이지의 SVG 로고. https://finnect.fintech.or.kr/program/fintech-challenge

로고는 경력과 공모전 참여를 식별하기 위해 사용하며 원래 색상과 비율을 유지합니다. 로고의 권리는 각 기관에 있습니다.


## 날짜 표기 근거

2026-09-10 기준 커밋 히스토리를 월 단위로 정리했습니다. 라이선스 추가와 개발 완료 후 파일 정리는 개발 기간에서 제외했습니다.

- 연금 AI Agent: 로컬 작업 저장소 2026-08-12부터 2026-09-06까지.
- Multi-agent Trading: 2026-03-27부터 2026-05-25(한국 시간)까지.
- Ko-ActiveETF: 2026-02-14부터 2026-02-28까지. 3월 라이선스 추가 제외.
- XAIkit-learn: 2024-11-09부터 2025-01-27까지. 2026년 라이선스 추가 제외.
- Fine-tuned Model Serving: 2024-10-28부터 2024-11-01(한국 시간)까지.
- VegeVision: 2023-07-20부터 2023-08-01까지. 이후 노트북 삭제와 라이선스 추가 제외.
- 딥페이크 논문: 2025.02 발표. https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12131642
- 호흡과 음성 대조 학습 논문: 2024.11 추계학술대회 발표. https://conf2024f.ieieweb.org/2024f/pages/programs.vm
