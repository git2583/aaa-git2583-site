---
week: 1
author: "빌더A"
title: "Obsidian Git 연동 및 첫 마크다운 커밋"
submittedAt: 2026-05-24T17:30:00+09:00
---

# [Week 01] 빌더A 과제 제출

- **제출자**: 빌더A
- **제출일**: 2026-05-24
- **작성 기수/시즌**: Season 1

---

## 1. 이번 주 과제 요약
이번 주에는 Obsidian 로컬 환경에 스터디 전용 Vault 구조를 세팅하고, `obsidian-git` 플러그인을 활용해 Private GitHub 저장소에 문서를 자동으로 커밋 및 푸시하는 환경을 완료했습니다.

## 2. 시도 및 실패 기록
- **시도**: 로컬 디렉토리에서 Git SSH 인증 키를 사용해 보안 연결을 수립했습니다.
- **실패**: Windows 환경에서 Git SSH Path 환경 변수가 설정되지 않아 `Host key verification failed` 오류가 지속 발생했습니다.
- **해결**: SSH agent 서비스 상태를 자동으로 기동하도록 Windows Services에서 시작 유형을 수정하고, `ssh-keyscan github.com`을 돌려 Known Hosts 목록에 수동 추가함으로써 해결했습니다.

## 3. 핵심 인사이트
Obsidian 내의 파일 생성이 단순한 텍스트 기록에 그치지 않고, Git hook과 연동되어 전체 배포 생태계의 소스 데이터가 될 수 있다는 점에서 분리 저장소(2-Repo) 아키텍처의 강력함을 인지했습니다.
