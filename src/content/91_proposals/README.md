# 91_proposals (AI 제안 및 피드백 보관소)

본 폴더는 Antigravity 2.0 AI 에이전트가 주간 분석(`/analyze`) 명령어를 실행할 때 자동으로 요약·갱신하는 스킬 제안 및 AI 인사이트 마크다운 문서가 적재되는 보관소입니다.

## 포함 문서
1. **[AAA_봇_인사이트.md](file:///c:/Users/a/aaa-github/aaa-git2583-lab/vault/91_proposals/AAA_%EB%B4%87_%EC%9D%B8%EC%82%AC%EC%9D%B4%ED%8A%B8.md)**: AI가 도출한 팀 빌딩의 기술적 공백 및 다음 성장 단계 제안서.
2. **[스킬_제안.md](file:///c:/Users/a/aaa-github/aaa-git2583-lab/vault/91_proposals/%EC%8A%A4%ED%82%AC_%EC%A0%9C%EC%95%88.md)**: 멤버별 스킬 성향에 기반하여, 팀 전체가 공통으로 습득하면 좋을 도구와 아키텍처 제안 누적 보고서.

## 운영 및 갱신 방식
- 운영자가 매주 회의 종료 후 `/analyze N` 명령어를 수행하면, 이 디렉토리 내의 제안서 파일들이 AI 분석 모듈에 의해 증분(Incremental) 업데이트 처리됩니다.
- 본 폴더에 존재하는 마크다운은 공개용(Public) 화이트리스트로써 `sync-content.sh` 스크립트에 의해 사이트 레포로 전송되어 웹 화면에 노출됩니다.
