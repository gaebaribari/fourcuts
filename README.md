# 크리스마스 컨셉 인생네컷 (2024.12~2025.03)

> ‘인생네컷’의 트렌드에서 착안해, 바로 찍은 사진이 아닌 사용자가 고른 4장의 사진을 조합하고 크리스마스 테마 스티커를 붙일 수 있는 시즌 한정 프로젝트입니다. 사용자는 사진을 업로드하고 스티커 테마를 선택한 뒤 원하는 이미지를 다운로드해 개인 소장할 수 있습니다.

## 관련 링크

- 홈페이지: https://gaebaribari.github.io/fourcuts/
- 벨로그: https://velog.io/@gaebaribari/series/fourcuts

## 개발 환경

`CRA`, `React`, `Typescript`, `Styled-Components`,

## 주요성과

1. **실제 다운로드 횟수 63회 기록**

   2024년 12월 15일부터 2주간 직접 홍보하며 총 63건의 다운로드 유도. 사용자 참여를 통해 기획부터 개발까지 주도한 프로젝트의 실사용 가능성과 완성도를 검증했습니다.

2. **사진 드래그 보정 기능 구현**

   각 인덱스에 드래그 기능을 적용해, 세로로 긴 사진이 잘리지 않도록 보정. 사용자가 원하는 부분을 정확히 조정할 수 있어 사용자 경험을 향상시켰습니다.

3. **이미지 저장 UI 오류 해결**

   저장 버튼을 `hover` 시에만 노출되도록 개선하여 저장한 이미지에 UI 요소가 간섭하는 문제를 해결, 보다 깔끔한 UX를 제공했습니다.

4. **모바일 인앱 브라우저 대응**

   외부 브라우저 전환 코드를 적용해, 인앱 브라우저에서 파일 저장이 되지 않는 문제를 해결. 모바일 피드백 3건 모두 해결하며 안정적인 모바일 경험을 제공했습니다.

5. **blob URL 최적화**
   `URL` 구조를 개선해 인앱 브라우저 내에서도 사진 다운로드가 가능하도록 처리. 외부 브라우저 전환 없이도 사용 가능한 UX를 구성해 진입 지연 시간 약 3초를 단축했습니다.
