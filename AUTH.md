# 🔐 OAuth 로그인 설정 가이드 (Google + Kakao)

PawType-16은 **Supabase Auth**를 통해 Google·Kakao 로그인을 지원합니다.
이 문서는 두 Provider를 활성화하는 단계별 가이드입니다.

> 사전 조건: [SUPABASE.md](./SUPABASE.md) 가이드를 완료하여 schema.sql이 적용되어 있어야 합니다.

---

## 📋 전체 흐름 한눈에 보기

```
[Google Cloud Console / Kakao Developers]
   ↓ OAuth 앱 등록, redirect URI 설정
   ↓ Client ID + Secret 발급
[Supabase Dashboard]
   ↓ Authentication → Providers → 활성화
   ↓ Client ID + Secret 입력
[PawType-16 App]
   ↓ 우측 상단 "로그인" 버튼 클릭
   ↓ Google/Kakao 로그인 → /auth/callback
   ↓ 세션 쿠키 발급 → /me 페이지로 이동
```

**중요한 Redirect URL** (Supabase가 자동 처리):
```
https://<project-ref>.supabase.co/auth/v1/callback
```
이 URL을 Google·Kakao 콘솔에 등록하면 됩니다.

---

## 🔵 Google 로그인

### 1. Google Cloud Console에서 OAuth 앱 생성

1. [console.cloud.google.com](https://console.cloud.google.com) 접속
2. 좌측 상단 프로젝트 선택 → **새 프로젝트** (예: "PawType-16")
3. 좌측 메뉴 **API 및 서비스** → **OAuth 동의 화면**
   - User Type: **External** 선택 → 만들기
   - 앱 이름: `PawType-16`
   - 사용자 지원 이메일: 본인 이메일
   - 개발자 연락처 정보: 본인 이메일
   - **저장 후 계속** (이후 단계는 스킵 가능)
4. 좌측 메뉴 **사용자 인증 정보** → **+ 사용자 인증 정보 만들기** → **OAuth 클라이언트 ID**
   - 애플리케이션 유형: **웹 애플리케이션**
   - 이름: `PawType-16 web`
   - **승인된 리디렉션 URI** 에 추가:
     ```
     https://<your-project-ref>.supabase.co/auth/v1/callback
     ```
     (Supabase 대시보드 → Settings → API 의 "Project URL"에서 `<your-project-ref>` 확인)
   - **만들기** 클릭
5. 표시되는 **클라이언트 ID**와 **클라이언트 보안 비밀번호** 복사

### 2. Supabase에 등록

1. Supabase 대시보드 → **Authentication** → **Providers**
2. **Google** 클릭 → **Enabled** 토글 ON
3. **Client ID** / **Client Secret** 붙여넣기
4. **Save** 클릭

✅ 끝. 이제 사이트에서 Google 로그인 버튼이 동작합니다.

---

## 💬 Kakao 로그인

### 1. Kakao Developers에서 앱 생성

1. [developers.kakao.com](https://developers.kakao.com) 접속 → 카카오 계정 로그인
2. 우측 상단 **내 애플리케이션** → **애플리케이션 추가하기**
   - 앱 이름: `PawType-16`
   - 사업자명: 본인 이름 또는 회사명
3. 생성된 앱 클릭 → 좌측 메뉴 **앱 설정** → **요약 정보**
   - **REST API 키** 복사 (이것이 Client ID 역할)
4. 좌측 메뉴 **제품 설정** → **카카오 로그인** → **활성화 설정** ON
5. **카카오 로그인** → **Redirect URI** 등록:
   ```
   https://<your-project-ref>.supabase.co/auth/v1/callback
   ```
6. **카카오 로그인** → **동의 항목**
   - **닉네임** → 필수 동의
   - **카카오계정(이메일)** → 선택 동의 (권장)
7. **보안** → **Client Secret**
   - **코드 생성** → 복사 → **활성화 상태: 사용함**

### 2. Supabase에 등록

1. Supabase 대시보드 → **Authentication** → **Providers**
2. **Kakao** 클릭 → **Enabled** 토글 ON
3. **Client ID**: 카카오의 **REST API 키**
4. **Client Secret**: 카카오의 **Client Secret 코드**
5. **Save** 클릭

✅ 끝.

---

## 🌐 Site URL 설정 (필수)

Supabase가 콜백 후 어디로 리다이렉트할지 알아야 합니다.

1. Supabase → **Authentication** → **URL Configuration**
2. **Site URL** 입력:
   - 로컬 개발: `http://localhost:3000`
   - 프로덕션: `https://your-domain.com`
3. **Redirect URLs** (Allow List)에 추가:
   ```
   http://localhost:3000/auth/callback
   https://your-domain.com/auth/callback
   ```
4. **Save**

---

## ✅ 로컬에서 테스트

```bash
npm run dev
# → http://localhost:3000
```

1. 우측 상단 **로그인** 버튼 클릭
2. 모달에서 **Google 로그인** 또는 **Kakao 로그인** 선택
3. 해당 Provider 화면에서 동의
4. `/auth/callback` 자동 처리 → `/ko/me` 마이페이지로 이동
5. 우측 상단에 아바타·닉네임 표시
6. 검사 한 번 진행 → 마이페이지로 돌아가면 결과 이력에 즉시 추가됨

---

## 🚨 자주 발생하는 문제

| 증상 | 원인 / 해결 |
|---|---|
| `redirect_uri_mismatch` (Google) | Google Console의 승인된 리디렉션 URI에 Supabase 콜백 URL이 등록 안 됨 |
| `KOE006` 또는 `Invalid redirect URI` (Kakao) | Kakao Developers의 Redirect URI 등록 누락 |
| 로그인 후 빈 화면 | Supabase **Site URL** / **Redirect URLs** 미설정 |
| `로그인` 버튼이 안 보임 | `NEXT_PUBLIC_SUPABASE_URL` 환경변수 누락 (`AuthButton`은 supabase 없으면 자동 숨김) |
| 카카오 이메일이 안 들어옴 | 동의 항목에서 "카카오계정(이메일)" 선택 동의 추가 |
| 로컬에선 되는데 Vercel에선 안 됨 | Supabase Redirect URLs에 프로덕션 도메인 추가 + Vercel 환경변수 재배포 |

---

## 🛡 프로덕션 체크리스트

- [ ] Google OAuth 동의 화면을 **Production** 상태로 (테스트 모드 → 검증 요청)
- [ ] Kakao 앱을 **Production 모드** 로 전환 (비즈 앱 또는 일반 공개)
- [ ] Supabase Site URL을 실제 도메인으로 변경
- [ ] HTTPS 도메인 사용 (OAuth는 localhost 외에는 HTTPS 필수)
- [ ] RLS 정책 재검토 (`profiles` / `results` 테이블)

---

## 💡 추가 Provider 확장

같은 패턴으로 Apple, GitHub, Facebook, Naver 등도 추가 가능:

1. Supabase Authentication → Providers에서 활성화
2. `AuthButton.tsx`의 `signIn("google" | "kakao")` 자리에 `signIn("apple")` 등 추가
3. 해당 콘솔에서 Redirect URI 등록

Supabase는 [10+ Provider](https://supabase.com/docs/guides/auth/social-login)를 기본 지원합니다.
