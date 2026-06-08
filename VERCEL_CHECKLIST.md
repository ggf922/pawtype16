# 🚀 PawType-16 — Vercel 배포 체크리스트 (v4)

이 문서를 위에서 아래로 따라 진행하면 **30~45분 안에 프로덕션 배포 + 모든 기능 활성화**가 완료됩니다.

---

## ✅ Phase 0. 사전 준비 (5분)

- [ ] **GitHub 계정** 보유 (소스 호스팅용)
- [ ] **Vercel 계정** — [vercel.com](https://vercel.com)에서 GitHub로 가입
- [ ] **Supabase 계정** — [supabase.com](https://supabase.com)에서 GitHub로 가입
- [ ] **Google Cloud 계정** — [console.cloud.google.com](https://console.cloud.google.com)
- [ ] **Kakao Developers 계정** — [developers.kakao.com](https://developers.kakao.com)
- [ ] 로컬에 Node.js 18+ 설치 확인 (`node -v`)
- [ ] 로컬에 Git 설치 확인 (`git --version`)

---

## ✅ Phase 1. 로컬 빌드 검증 (5분)

```bash
# 1. zip 압축 해제
unzip pawtype16-v4.zip
cd pawtype16

# 2. 의존성 설치
npm install

# 3. 로컬 빌드 테스트 (Vercel과 동일한 명령)
npm run build

# 4. 로컬 서버로 동작 확인
npm run start
# → http://localhost:3000 접속
```

**확인할 것**:
- [ ] `✓ Compiled successfully` 메시지
- [ ] `npm run start` 후 메인 페이지 정상 로드
- [ ] `/ko`, `/en`, `/ja` 등 7개 언어 라우팅 동작
- [ ] `/admin` 접근 시 **503 응답** (환경변수 미설정이라 정상)

---

## ✅ Phase 2. GitHub 푸시 (5분)

```bash
git init
git add .
git commit -m "feat: PawType-16 v4 production-ready"
# GitHub에서 빈 저장소 'pawtype16' 생성 후
git remote add origin https://github.com/<your-id>/pawtype16.git
git branch -M main
git push -u origin main
```

**확인할 것**:
- [ ] 저장소를 **Private**으로 설정 (Supabase 키 노출 방지)
- [ ] `.env.local` 이 커밋되지 않음 (`.gitignore`에 포함됨)
- [ ] `node_modules/`, `.next/` 가 커밋되지 않음

---

## ✅ Phase 3. Supabase 프로젝트 (5분)

1. [app.supabase.com](https://app.supabase.com) → **+ New project**
2. 설정:
   - **Name**: `pawtype16`
   - **Database Password**: 강한 비밀번호 (저장!)
   - **Region**: `Northeast Asia (Seoul)` (한국 사용자) 또는 가장 가까운 곳
   - **Plan**: Free
3. 좌측 메뉴 **SQL Editor** → **+ New query** → `supabase/schema.sql` 내용 전체 복사 → Run
4. **Authentication → URL Configuration** 에서:
   - **Site URL**: `https://your-app.vercel.app` (배포 후 도메인)
   - **Redirect URLs**: 
     ```
     http://localhost:3000/auth/callback
     https://your-app.vercel.app/auth/callback
     ```
5. **Settings → API** 에서 다음 키 3개 복사 (다음 단계에서 사용):
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

**확인할 것**:
- [ ] SQL 실행 성공 — `results`, `profiles` 테이블 생성됨
- [ ] **Table Editor → results** 에서 RLS 활성화 표시
- [ ] **Authentication → Users** 가 비어 있음 (정상)

---

## ✅ Phase 4. Vercel 첫 배포 (10분)

### 4-1. 프로젝트 임포트

1. [vercel.com/new](https://vercel.com/new) → GitHub 저장소 **Import**
2. **Framework Preset**: Next.js (자동 감지)
3. **Root Directory**: 기본값 유지 (./)
4. 아직 Deploy 하지 마세요!

### 4-2. 환경변수 설정 (가장 중요!)

**Environment Variables** 섹션에서 다음을 **모두** 추가:

| Key | Value | 설명 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://temporary-name.vercel.app` | 배포 후 수정 예정 |
| `NEXT_PUBLIC_SUPABASE_URL` | (Supabase에서 복사) | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (Supabase에서 복사) | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | (Supabase에서 복사) | **🔒 Secret** |
| `ADMIN_USER` | `admin` 또는 본인 이름 | |
| `ADMIN_PASS` | **8자 이상 강한 비밀번호** | **🔒 Secret** |

⚠️ **`ADMIN_PASS`는 절대 `changeme`, `admin`, `password` 등 약한 값 사용 금지** — v4 미들웨어가 거부합니다.

### 4-3. Deploy

- [ ] **Deploy** 클릭 → 1~3분 대기
- [ ] 빌드 로그에서 `✓ Compiled successfully` 확인
- [ ] 배포 완료 후 임시 도메인(예: `pawtype16-xxx.vercel.app`) 메모

### 4-4. SITE_URL 업데이트

1. **Settings → Environment Variables** → `NEXT_PUBLIC_SITE_URL`을 실제 배포 도메인으로 수정
2. **Deployments → … → Redeploy** 로 재배포

---

## ✅ Phase 5. Google OAuth (10분)

상세 단계는 `AUTH.md`에 있음. 핵심만:

1. [console.cloud.google.com](https://console.cloud.google.com) → 새 프로젝트
2. **API 및 서비스 → OAuth 동의 화면** → External → 앱 정보 입력 → 저장
3. **사용자 인증 정보 → + 만들기 → OAuth 클라이언트 ID** → 웹 애플리케이션
4. **승인된 리디렉션 URI** 에 추가:
   ```
   https://<your-supabase-ref>.supabase.co/auth/v1/callback
   ```
5. Client ID + Client Secret 복사
6. Supabase 대시보드 → **Authentication → Providers → Google** 활성화 → 키 입력 → Save

**확인**:
- [ ] 사이트 우측 상단 "로그인" 클릭 → 모달에 Google 버튼 표시
- [ ] Google 로그인 시도 → 본인 Google 계정 인증 화면 표시
- [ ] 인증 후 `/auth/callback` → `/ko/me` 로 이동
- [ ] 우측 상단 아바타 + 이메일 표시

---

## ✅ Phase 6. Kakao OAuth (10분)

1. [developers.kakao.com](https://developers.kakao.com) → 내 애플리케이션 → 추가
2. 앱 → **앱 설정 → 요약 정보** 에서 **REST API 키** 복사
3. **제품 설정 → 카카오 로그인** → 활성화 ON
4. **Redirect URI** 에 추가:
   ```
   https://<your-supabase-ref>.supabase.co/auth/v1/callback
   ```
5. **동의 항목**:
   - 닉네임 → 필수 동의
   - 카카오계정(이메일) → 선택 동의 (권장)
6. **보안** → **Client Secret** → 코드 생성 → 활성화 → 복사
7. Supabase → **Authentication → Providers → Kakao** 활성화
   - Client ID: REST API 키
   - Client Secret: 위에서 생성한 코드
   - Save

**확인**:
- [ ] 로그인 모달에 Kakao 버튼 동작
- [ ] 카카오 로그인 → `/ko/me` 진입 성공

---

## ✅ Phase 7. 동작 검증 (5분)

### 7-1. 기본 흐름

- [ ] `/` 접속 → 브라우저 언어에 따라 `/ko`, `/en` 등 자동 라우팅
- [ ] 메인 페이지 Hero 이미지 (포토리얼 강아지) 표시
- [ ] 우측 상단 🌐 셀렉터로 7개 언어 전환 가능
- [ ] 아랍어(`/ar`) 선택 시 텍스트가 우측 정렬됨
- [ ] `검사 시작하기` → 25문항 진행 → 결과 페이지 도달
- [ ] 결과 URL이 짧음 (`?d=` 뒤가 ~35자) ✨
- [ ] 결과 페이지에서 레이더 차트 정상 표시

### 7-2. 공유 기능

- [ ] 결과 페이지 **"🔗 공유"** 버튼 → 모바일은 네이티브 공유 시트
- [ ] 결과 URL을 카카오톡 자기와의 채팅에 붙여넣기 → **점수·콤비명이 보이는 미리보기 카드** 표시
- [ ] X(Twitter)에 결과 URL 입력 → 미리보기 카드 표시
- [ ] `https://your-app.vercel.app/api/og?d=<share-code>` 직접 열기 → PNG 이미지 표시

### 7-3. 인증

- [ ] 로그인 안 한 상태에서 진단 완료 → 결과 페이지 정상
- [ ] 우측 상단 로그인 → Google/Kakao → `/ko/me`
- [ ] **로그인 후** localStorage에 남은 익명 결과가 자동으로 마이페이지 이력에 추가됨 ✨
- [ ] 마이페이지에 검사 이력 카드/테이블 표시

### 7-4. 관리자

- [ ] `/admin` 접속 → 브라우저 Basic Auth 다이얼로그
- [ ] 환경변수에 설정한 `ADMIN_USER` / `ADMIN_PASS` 입력 → 대시보드 진입
- [ ] 검사 통계 / 코드 분포 / 최근 결과 표시
- [ ] **ADMIN_PASS를 일부러 짧게 바꾸고 재배포** → `/admin`이 503 반환 (fail-closed 정상)

### 7-5. SEO

- [ ] `/robots.txt` 접속 → 텍스트 정상 응답, `/admin` 차단됨
- [ ] `/sitemap.xml` 접속 → 28개 URL (7 lang × 4 page) 표시
- [ ] [search.google.com/test/rich-results](https://search.google.com/test/rich-results) 에 메인 URL 입력 → OG 메타 정상 인식
- [ ] 결과 페이지 URL로 같은 테스트 → 동적 OG 이미지 인식

---

## ✅ Phase 8. (선택) 커스텀 도메인 + 분석

### 도메인 연결
- [ ] Vercel **Settings → Domains** → 도메인 추가
- [ ] DNS 안내에 따라 A / CNAME 레코드 추가
- [ ] SSL 자동 발급 확인
- [ ] `NEXT_PUBLIC_SITE_URL` 새 도메인으로 업데이트 → 재배포
- [ ] Supabase **Site URL** 도 새 도메인으로 업데이트
- [ ] Google · Kakao Redirect URI는 **Supabase 콜백 URL이므로 그대로** (변경 불필요)

### 분석 도구
- [ ] Google Analytics 4 측정 ID 발급
- [ ] Vercel Analytics 활성화 (`@vercel/analytics` 설치 후 layout에 추가)

---

## ✅ Phase 9. 모니터링 셋업 (선택)

- [ ] Vercel **Logs** 탭에서 첫 24시간 트래픽 관찰
- [ ] **에러 로그** 모니터링 — `/api/save-result` 4xx 비율 < 5% 인지
- [ ] **Supabase Database → Usage** 확인 — 무료 티어 500MB 한계
- [ ] **Authentication → Users** 에서 가입자 증가 추세 확인

---

## 🚨 자주 발생하는 문제

| 증상 | 원인 | 해결 |
|---|---|---|
| 빌드 실패 — `@supabase/supabase-js not found` | npm install 누락 | Vercel은 자동, 로컬은 `npm install` |
| `/admin` 이 항상 503 | `ADMIN_PASS` 미설정 또는 약한 값 | 8자 이상으로 변경 후 재배포 |
| 로그인 후 화면이 빈 페이지 | Supabase Site URL 미설정 | Authentication → URL Configuration 확인 |
| 카톡 공유 시 미리보기 없음 | `NEXT_PUBLIC_SITE_URL` 미설정 | 절대 URL로 설정 (https:// 포함) |
| Google: `redirect_uri_mismatch` | Google Console에 Supabase 콜백 URL 누락 | 정확한 URL 추가 (끝에 슬래시 없음) |
| Kakao: `KOE006` | Kakao Developers에 Redirect URI 누락 | 동일 |
| sitemap에 wrong domain | `NEXT_PUBLIC_SITE_URL` 잘못 설정 | 환경변수 수정 후 재배포 |
| 한국 사용자 응답 느림 | Vercel region 또는 Supabase region 미국 | `vercel.json`의 `regions: ["icn1"]` 확인 + Supabase region을 Seoul로 |

---

## 📌 배포 후 1주일 내 권장 작업

- [ ] Google OAuth 동의 화면을 **Production** 상태로 검증 요청 (테스트 모드는 100명 제한)
- [ ] Kakao 앱을 **비즈앱 등록** 또는 일반 공개 신청
- [ ] 카카오톡 공유 미리보기를 **카카오 디벨로퍼스 도구**에서 추가 검증
- [ ] Search Console에 도메인 등록 + 사이트맵 제출
- [ ] **결과 페이지를 직접 본인 SNS에서 5~10건 공유 테스트**
- [ ] Sentry 또는 Logflare 같은 에러 추적 도구 연동 검토

---

## 🎯 Production 출시 직전 최종 체크리스트

- [ ] `ADMIN_PASS` 강한 비밀번호로 설정 ✅
- [ ] `NEXT_PUBLIC_SITE_URL` 실제 프로덕션 도메인 ✅
- [ ] HTTPS 동작 확인 ✅
- [ ] Google · Kakao OAuth Production 모드 ✅
- [ ] Supabase RLS 정책 재검토 ✅
- [ ] 7개 언어 페이지 직접 한 번씩 클릭 ✅
- [ ] 결과 공유 카드 카톡에서 직접 확인 ✅
- [ ] 모바일 (iPhone / Android) 실제 디바이스에서 테스트 ✅

모두 ✅ 되면 안전하게 배포 가능합니다! 🚀
