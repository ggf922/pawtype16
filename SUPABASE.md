# 🗄 Supabase 연동 가이드

PawType-16의 결과 영구 저장 / "비슷한 케미 찾기" / 관리자 대시보드 / OAuth 로그인을 모두 켜는 단계별 가이드입니다.

> 💡 Supabase 무료 티어로도 충분합니다 (500MB DB, 50MB 파일, 50K MAU).

---

## Step 1. Supabase 프로젝트 생성

1. [app.supabase.com](https://app.supabase.com) 접속 → GitHub로 로그인
2. **+ New project** 클릭
3. 입력:
   - **Name**: `pawtype16`
   - **Database Password**: 강한 비밀번호 (나중에 사용)
   - **Region**: `Northeast Asia (Seoul)` 추천 (한국 사용자 기준)
   - **Plan**: Free
4. **Create new project** → 1~2분 대기 (DB 프로비저닝)

---

## Step 2. 스키마 적용

1. 좌측 메뉴 **SQL Editor** → **+ New query**
2. 프로젝트 폴더의 `supabase/schema.sql` 내용을 전체 복사 → 붙여넣기
3. 우측 상단 **Run** (또는 `Cmd/Ctrl + Enter`)
4. ✅ "Success. No rows returned" 메시지 확인

### 무엇이 만들어지나요?

| 테이블 | 용도 |
|---|---|
| `public.results` | 모든 검사 결과 (익명 + 로그인 사용자) |
| `public.profiles` | 로그인 사용자 프로필 (자동 생성 트리거 포함) |

RLS 정책도 함께 적용:
- 누구나 결과 제출 가능 (`results_insert_any`)
- 누구나 결과 조회 가능 (`results_select_any` — 집계용)
- 로그인 사용자는 자기 결과만 삭제 가능
- 프로필은 본인만 조회·수정 가능

---

## Step 3. API 키 발급

1. 좌측 메뉴 **Settings** (톱니바퀴) → **API**
2. 다음 3개 값을 복사:

   | 라벨 | 어디로 |
   |---|---|
   | **Project URL** | `NEXT_PUBLIC_SUPABASE_URL` |
   | **anon public** | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
   | **service_role secret** | `SUPABASE_SERVICE_ROLE_KEY` |

---

## Step 4. 환경변수 설정

### 로컬 개발

```bash
cp .env.example .env.local
# .env.local 편집:
#   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
#   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

npm run dev
```

### Vercel 프로덕션

Vercel 대시보드 → 프로젝트 → **Settings** → **Environment Variables** → 위 3개 키를 모두 **Production** 환경에 추가 → **Save** → **Redeploy**

---

## Step 5. 동작 확인

1. **결과 저장 확인**
   - 사이트에서 검사 한 번 진행 → 결과 페이지 도달
   - Supabase 대시보드 **Table Editor** → `results` → 새 row 확인

2. **관리자 대시보드**
   - `https://your-app/admin` 접속
   - Basic Auth 통과 후 → 실시간 통계 표시 (방금 저장한 결과 반영)

3. **친구 찾기**
   - 결과 페이지에서 친구 찾기 카드 → API 호출 → 같은 종 + 비슷한 코드 사용자 반환

---

## Step 6. (다음 단계) OAuth 로그인 활성화

`AUTH.md` 참고. Google·Kakao 로그인 + 마이페이지 구현 가이드.

요약:
1. Supabase **Authentication → Providers** 에서 Google·Kakao 활성화
2. 각 콘솔(Google Cloud / Kakao Developers)에서 OAuth 앱 등록
3. Redirect URL: `https://<project-ref>.supabase.co/auth/v1/callback`
4. Client ID / Secret을 Supabase에 입력
5. 사이트 우측 상단 "로그인" 버튼 동작

---

## 트러블슈팅

| 증상 | 원인 / 해결 |
|---|---|
| `/admin` 이 항상 "데모 데이터" | `NEXT_PUBLIC_SUPABASE_URL` 환경변수 누락 |
| 결과는 저장되는데 admin이 비어있음 | RLS select 정책 미적용 — schema.sql 재실행 |
| `insert violates row-level security policy` | RLS insert 정책 누락 — schema.sql 재실행 |
| Vercel 배포 후만 동작 안 함 | Vercel 환경변수 누락 → **Redeploy** 필요 |
| 한국 사용자에게 응답 느림 | Supabase region을 `Northeast Asia (Seoul)`로 |

---

## 데이터 백업

Supabase는 무료 티어도 **자동 일일 백업 7일 보관**. 직접 dump가 필요하면:

```bash
# psql 설치 후
pg_dump "postgresql://postgres:<password>@<host>:5432/postgres" > backup.sql
```

연결 문자열은 **Settings → Database → Connection string** 에서 확인.
