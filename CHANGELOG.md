# 📝 PawType-16 — v4 Changelog

배포 전 점검 리포트 기반 **15개 항목 전체 적용**.

---

## 🔴 Critical (보안)

### 1. Next.js 14.2.5 → 14.2.35 보안 패치
- **수정**: `package.json`의 `next` 버전을 `^14.2.35`로 상향
- **해결한 CVE**:
  - GHSA-7gfc-8cq8-jh5f — Next.js 인증 우회
  - GHSA-f82v-jwr5-mffw — 미들웨어 인증 우회
  - GHSA-4342-x723-ch2f — 미들웨어 리다이렉트 SSRF
  - GHSA-36qx-fr4f-26g5 — i18n 미들웨어 우회 ⚠️ 우리 코드가 정확히 i18n 미들웨어 사용
  - 그 외 캐시 포이즈닝 / DoS / XSS 등 20+건
- Vercel에서 자동 재빌드되면 즉시 패치 적용

### 2. ADMIN_PASS 약한 기본값 차단
- **이전**: 환경변수 미설정 시 `admin/changeme`로 누구나 접근 가능
- **수정**: `middleware.ts` 에서 **fail-closed** 정책 적용
  - `ADMIN_USER` 미설정 → 503
  - `ADMIN_PASS` 미설정 / `changeme` / `admin` / 8자 미만 → 503
- 안전한 비밀번호를 설정하기 전엔 `/admin` 자체가 동작 안 함

### 3. 결과 URL 압축 (1500자 → 35자)
- **이전**: `JSON.parse(decodeURIComponent(raw))` — 25개 답변 객체를 URL에 인코딩 → ~1500자
- **수정**: `app/lib/share-code.ts` 추가 — 8개 axis score를 base32로 압축
  - 64 bits → 13 base32 문자
  - + 1자 (pet kind) + `~` + URL-encoded name (≤20자)
  - **결과 URL 총 길이: ~35~80자** — 카카오톡·X 미리보기에 안전
- `encodeShare()` / `decodeShare()` API 제공
- quiz, result, `/api/og` 모두 새 포맷 사용

---

## 🟠 High (SEO / 안전성)

### 4. robots.txt / sitemap.xml 자동 생성
- **추가**: `app/robots.ts`, `app/sitemap.ts`
- robots: `/admin`, `/auth/`, `/api/`, `/*/admin` 차단
- sitemap: 7개 언어 × 4페이지 × `<link rel="alternate" hreflang>` 자동
- `NEXT_PUBLIC_SITE_URL` 환경변수 기반

### 5. OpenGraph 풀세트 (`og:image`, `twitter:card`)
- **수정**: `app/layout.tsx` 의 metadata에 완전한 OG/Twitter 메타 추가
  - `metadataBase`, `openGraph.images`, `twitter.card`
  - `manifest`, `icons`, `themeColor` (light/dark)
- 모든 페이지에 자동 적용 → 공유 시 항상 미리보기 카드 노출

### 6. `/api/save-result` 입력 검증 + Rate Limit
- **수정**: 전면 재작성
  - 페이로드 크기 ≤ 4KB
  - 키 개수 ≤ 40개, 키 길이 ≤ 8자
  - 값 범위 검증 (-2 ~ +2)
  - IP 기반 분당 30 요청 rate-limit
  - HTTP 코드 401/413/429 적절히 반환
- DoS · 악의적 데이터 주입 방지

### 7. 익명 결과 → 로그인 시 자동 연결
- **추가**: `app/components/LinkLastResult.tsx`
- **흐름**:
  1. 진단 완료 → `localStorage["pawtype16_last_result"]` 에 24h 임시 저장
  2. 로그인 후 `/me` 진입 → 클라이언트에서 자동 fetch
  3. 결과가 `user_id`에 attach되면 페이지 자동 갱신
- 익명 사용자가 로그인했을 때도 결과가 사라지지 않음

---

## 🟡 Medium (UX / 안정성)

### 8. 결과 페이지 동적 metadata
- **변경**: `app/[locale]/result/page.tsx`를 server component로 분리
- `ResultClient.tsx`에 인터랙티브 UI 격리
- `generateMetadata({ searchParams })` 에서 share-code 디코드 → 점수·콤비명을 `<title>`과 OG 메타에 반영
- 카카오톡 공유 시 결과 페이지마다 다른 제목·이미지

### 9. 진행 상황 복원 토스트
- **수정**: `quiz/page.tsx`
- 새로고침 시 localStorage 복원이 일어나면 우측 상단에 토스트 표시
- 3.5초 후 자동 사라짐
- i18n 7개 언어 번역 (`quiz_restored`)

### 10. 글로벌 에러 페이지
- **추가**: `app/error.tsx`
- Next.js 기본 화면 대신 브랜드 톤의 에러 화면 표시
- `error.digest` 표시로 디버깅 용이
- 다시 시도 버튼 제공

### 11. RTL 호환성 (아랍어)
- **수정**: 모든 `text-left` → `text-start`
- Tailwind의 logical property로 변경 → 아랍어에서 자동 우측 정렬
- 영향 파일: LocaleSwitcher, quiz, admin, me page

---

## 🟢 Low (마무리)

### 12. Favicon
- **추가**: `public/favicon.svg` — 발자국 모티프 SVG (343 bytes)
- 베이지 배경 + 코코아 컬러로 브랜드 일관성

### 13. PWA manifest
- **추가**: `public/manifest.webmanifest`
- 홈 화면 추가 시 standalone 앱처럼 동작
- 카테고리: lifestyle, entertainment, pets

### 14. 로딩 스켈레톤
- **추가**: `app/loading.tsx` — 발자국 애니메이션 글로벌 로딩 화면
- 페이지 전환 시 자연스러운 피드백

### 15. Web Share API
- **수정**: `result/ResultClient.tsx`
- 가짜 alert 대신 진짜 네이티브 공유 시트 호출
- 미지원 브라우저는 자동으로 링크 복사로 폴백
- iOS Safari·Android Chrome 모두 동작

---

## 📊 점검 결과 요약

| 카테고리 | 항목 수 | 상태 |
|---|---|---|
| 🔴 Critical 보안 | 3 | ✅ 완료 |
| 🟠 High | 4 | ✅ 완료 |
| 🟡 Medium | 4 | ✅ 완료 |
| 🟢 Low | 4 | ✅ 완료 |

---

## ⚠️ 배포 전 반드시 확인할 환경변수

```bash
# 안전한 값으로 반드시 변경 (안 하면 /admin 503 반환)
ADMIN_USER=<당신의_사용자명>
ADMIN_PASS=<8자 이상 강한 비밀번호>

# OG 이미지 절대 URL용
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

자세한 배포 절차는 `VERCEL_CHECKLIST.md` 참고.
