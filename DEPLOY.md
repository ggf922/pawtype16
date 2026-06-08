# 🚀 PawType-16 — Vercel 배포 가이드

이 문서는 사용자가 본인 계정으로 직접 따라할 수 있는 단계별 가이드입니다.

---

## 사전 준비

- GitHub 계정 (소스 호스팅)
- Vercel 계정 ([vercel.com](https://vercel.com) — GitHub로 가입 추천)
- Node.js 18 이상

---

## Step 1. GitHub에 푸시

```bash
cd pawtype16
git init
git add .
git commit -m "feat: initial PawType-16"
# GitHub에서 빈 저장소 만든 뒤
git remote add origin https://github.com/<your-id>/pawtype16.git
git branch -M main
git push -u origin main
```

---

## Step 2. Vercel 프로젝트 생성

### 방법 A — Vercel 대시보드 (UI)

1. [vercel.com/new](https://vercel.com/new) 접속
2. GitHub 저장소 **Import**
3. **Framework Preset**: `Next.js` (자동 감지)
4. **Root Directory**: 그대로 (./)
5. **Environment Variables** 섹션에서 아래 값들 추가:

   | Key | Value | 비고 |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` | 배포 후 도메인 |
   | `ADMIN_USER` | `admin` | 변경 권장 |
   | `ADMIN_PASS` | (강한 비밀번호) | **반드시 변경** |
   | `NEXT_PUBLIC_SUPABASE_URL` | (Supabase에서 발급) | 옵션 |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (Supabase에서 발급) | 옵션 |
   | `SUPABASE_SERVICE_ROLE_KEY` | (Supabase에서 발급) | 옵션, 비밀 |

6. **Deploy** 클릭 → 1~2분 후 자동 배포 완료

### 방법 B — Vercel CLI

```bash
npm install -g vercel
cd pawtype16
vercel login
vercel             # 첫 배포 → preview URL
vercel --prod      # 프로덕션 배포
```

CLI로 환경변수 설정:

```bash
vercel env add ADMIN_PASS production
# 프롬프트에 비밀번호 입력
```

---

## Step 3. 배포 후 확인 사항

| 확인 항목 | 방법 |
|---|---|
| 메인 페이지 | `https://your-app.vercel.app` |
| 한국어 라우팅 | `/ko` 자동 진입 |
| 다국어 | `/en`, `/ja`, `/ar` 등 7개 언어 |
| OG 이미지 | `https://your-app.vercel.app/api/og?d=%7B%22petName%22%3A%22test%22%7D` |
| Admin Basic Auth | `/admin` 접근 시 브라우저 로그인 창 → ID/PW 입력 |
| Edge 런타임 | Vercel 대시보드 → Functions 탭에서 `og`, `result/opengraph-image` 확인 |

---

## Step 4. 커스텀 도메인 (선택)

1. Vercel 프로젝트 → **Settings** → **Domains**
2. 본인 도메인 입력 (예: `pawtype16.com`)
3. DNS 안내에 따라 `A` 또는 `CNAME` 레코드 추가
4. SSL 인증서 자동 발급
5. 배포 후 `NEXT_PUBLIC_SITE_URL` 을 새 도메인으로 업데이트

---

## 🛡 프로덕션 체크리스트

배포 전에 반드시 확인하세요:

- [ ] `ADMIN_PASS`를 강한 비밀번호로 변경
- [ ] `NEXT_PUBLIC_SITE_URL`을 실제 배포 도메인으로 설정
- [ ] Supabase 연동(선택) — `schema.sql` 실행
- [ ] `vercel.json`의 `regions` 확인 (한국 사용자 → `icn1` 유지)
- [ ] GitHub 저장소 Private 권장 (혹시 Supabase 키 노출 방지)

---

## 트러블슈팅

| 증상 | 원인/해결 |
|---|---|
| 빌드 실패 — `@supabase/supabase-js` not found | `npm install` 누락. Vercel은 자동이지만 로컬은 수동 |
| `/admin` 인증창이 안 뜸 | 환경변수 미설정. Vercel 대시보드에서 `ADMIN_PASS` 추가 후 재배포 |
| OG 이미지가 빈 화면 | Edge runtime이 차단됐는지 Functions 탭 확인 |
| `/` 진입 시 무한 리다이렉트 | `middleware.ts` matcher 패턴 확인 |
| 한국 사용자 응답이 느림 | `vercel.json`에 `"regions": ["icn1"]` 확인 |

---

## 다음 단계

배포가 성공하면:
1. **Supabase 연동** → [SUPABASE.md](./SUPABASE.md)
2. **OAuth 로그인** → 사용자 인증 + 마이페이지
