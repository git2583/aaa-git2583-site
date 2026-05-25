---
week: 1
author: "옵스C"
title: "GitHub Actions 자동 배포 트리거 구축 실패 내역"
submittedAt: 2026-05-24T18:20:00+09:00
---

# [Week 01] 옵스C 과제 제출

- **제출자**: 옵스C
- **제출일**: 2026-05-24
- **작성 기수/시즌**: Season 1

---

## 1. 이번 주 과제 요약
이번 주차에는 로컬 Obsidian Vault 저장소와 Astro 정적 사이트 간의 자동 퍼블리싱 파이프라인 구축을 담당했습니다. GitHub Actions를 사용하여 코드가 Push되었을 때 Vercel CDN으로 자동으로 배포 트리거가 실행되는 통합 CI/CD 인프라를 수립하려 했습니다.

## 2. 시도 및 실패 기록
- **시도**: GitHub Actions Workflow 파일을 기획하여 push 시 빌드 및 Vercel deploy 단계가 순차적으로 실행되도록 파이프라인을 작성했습니다.
- **실패**: 테스트 과정에서 너무 잦은 API 요청 및 배포 수동 기동으로 인해 GitHub API 서버로부터 `Rate Limit Exceeded (403 Forbidden)` 차단을 받아 파이프라인 빌드가 깨지는 오류를 맞았습니다.
- **해결**: 불필요한 자동 push 간격을 늘리고, 빌드 캐시 플러그인을 결합하여 GitHub Actions runner가 매번 API를 찌르는 빈도를 줄임으로써 차단 문제를 안정화했습니다.

## 3. 핵심 인사이트
CI/CD 자동화 파이프라인이 빈번하게 실행되는 경우, API 할당량(Rate Limit)을 사전에 체크하고 적절한 캐싱 정책 및 배포 배치 주기를 확보해야 파이프라인의 견고성이 지켜진다는 것을 알게 되었습니다.
