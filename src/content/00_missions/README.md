# 00_missions (주차별 과제 제출 보관소)

본 폴더는 스터디 멤버들이 매주 기한 내에 빌드하고 학습한 AI 과제 결과물을 아카이빙하는 공간입니다. (공개 대상)

## 디렉토리 구조 및 파일 명명 컨벤션
- **구조**: `Week_0N_submit/Week_0N_{닉네임}_submit.md`
- **예시**: `Week_01_submit/Week_01_빌더A_submit.md`

## 제출 규칙
1. 매주 일요일 오후 6시 00분(KST)까지 작성 완료 후 Git Push를 완료해야 합니다.
2. 작성 시 반드시 `99_templates/미션_Week_0N_닉네임_submit.md` 템플릿 양식을 준수하여 Frontmatter 메타데이터(`week`, `author`, `title`, `submittedAt`)를 정확히 기재하십시오.
3. 본 폴더 내의 제출물은 `sync-content.sh` 스크립트를 통해 공개 웹사이트의 `/archive/` 경로에 자동 배포됩니다.
