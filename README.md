# 🐾 PawType-16

> **우리는 어떤 발자국 한 쌍일까?**
> Big Five 행동과학으로 알아보는, 나와 반려동물의 16가지 케미스토리.

[![Made with Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ecf8e?logo=supabase)](https://supabase.com)
![Languages](https://img.shields.io/badge/i18n-7%20languages-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🚀 원클릭 배포 (Vercel)

GitHub fork만 해두면 아래 버튼 하나로 본인 Vercel 계정에 자동 배포돼요.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2Fpawtype16&env=NEXT_PUBLIC_SITE_URL,ADMIN_USER,ADMIN_PASS&envDescription=Required%20environment%20variables%20%E2%80%94%20see%20.env.example&envLink=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2Fpawtype16%2Fblob%2Fmain%2F.env.example&project-name=pawtype16&repository-name=pawtype16)

> ⚠️ 버튼을 쓰려면 위 URL의 `YOUR_USERNAME` 부분을 본인 GitHub 사용자명으로 바꿔주세요.

---

## ✨ 주요 기능

- 🐾 **양방향 매칭** — 보호자와 반려동물 둘 다 검사해서 케미 점수 산출
- 🧬 **Big Five 4축** — Energy · Sociability · Agreeableness · Calmness
- 🎯 **16가지 코드** (`ESAC`, `LIDN` 등) + 6가지 콤비 타이틀
- 📊 **레이더 차트 비교** — 보호자 vs 반려동물 시각화
- 🌐 **7개 언어** — 한·영·독·스·중·일·아(RTL 자동)
- 🔐 **Google · Kakao OAuth** + 마이페이지(검사 이력)
- 🖼 **동적 OG 이미지** — SNS 공유 시 점수·콤비명 자동 합성
- 📊 **관리자 대시보드** — Basic Auth 보호, 통계 자동 집계

---

## 🏗 기술 스택

| 영역 | 사용 기술 |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database / Auth | Supabase (PostgreSQL + RLS) |
| Auth Providers | Google OAuth, Kakao OAuth |
| OG Image | `@vercel/og` (Edge runtime) |
| Hosting | Vercel (icn1 region) |

---

## 📦 빠른 시작 (로컬)

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 (옵션)
cp .env.example .env.local
# 비워둬도 데모 모드로 동작

# 3. 개발 서버
npm run dev
# → http://localhost:3000

# 또는 프로덕션 빌드 미리보기
npm run build && npm start
```

---

## 📚 문서

| 파일 | 내용 |
|---|---|
| [`VERCEL_CHECKLIST.md`](./VERCEL_CHECKLIST.md) | 🚀 **9 Phase × 80개 체크박스 단계별 가이드** |
| [`DEPLOY.md`](./DEPLOY.md) | Vercel 배포 상세 |
| [`SUPABASE.md`](./SUPABASE.md) | Supabase 프로젝트 + schema 적용 |
| [`AUTH.md`](./AUTH.md) | Google · Kakao OAuth 활성화 |
| [`CHANGELOG.md`](./CHANGELOG.md) | 버전별 변경사항 |

---

## 🌐 지원 언어 (7개)

`/ko` `/en` `/de` `/es` `/zh` `/ja` `/ar`

- 브라우저 `Accept-Language` 자동 감지
- 우측 상단 🌐 셀렉터로 수동 전환
- 아랍어는 RTL 자동 적용

---

## 🧬 매칭 알고리즘 학술 근거

`app/lib/quiz.ts` 의 `matchScore()` 함수:

| 가중치 | 학술 근거 |
|---|---|
| 활동성 유사도 30% | Oklahoma 연구 ([Anthrozoös 2013](https://www.tandfonline.com/doi/abs/10.2752/175303713X13697429463673)) |
| 사교성 유사도 30% | 동 연구의 핵심 4요인 |
| 침착성 보완 +10% | 헬싱키대 SEM 연구 ([PMC10709106](https://pmc.ncbi.nlm.nih.gov/articles/PMC10709106/)) |
| 친화성 보너스 40% | 회피애착 ↓ 효과 |

---

## 🛡 환경변수

| 키 | 설명 | 필수 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 배포 도메인 (OG 이미지·sitemap용) | ✅ |
| `ADMIN_USER` | 관리자 대시보드 ID | ✅ |
| `ADMIN_PASS` | 관리자 비밀번호 (8자 이상) | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | ⭕ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon 키 | ⭕ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role (서버 전용) | ⭕ |

자세한 형식은 [`.env.example`](./.env.example) 참고.

---

## 📁 디렉터리 구조

```
pawtype16/
├── app/
│   ├── [locale]/              # 7개 언어 페이지
│   │   ├── page.tsx           # 메인
│   │   ├── quiz/              # 진단
│   │   ├── result/            # 결과 + 동적 OG
│   │   ├── me/                # 마이페이지 (로그인)
│   │   └── admin/             # 대시보드 (Basic Auth)
│   ├── api/                   # OG / save / similar / admin stats
│   ├── auth/                  # OAuth callback / signout
│   ├── components/            # AuthButton, LocaleSwitcher 등
│   ├── lib/                   # quiz, i18n, supabase, share-code
│   └── ...
├── middleware.ts              # locale 라우팅 + admin Basic Auth
├── supabase/schema.sql        # PostgreSQL 스키마 + RLS
├── public/                    # 이미지, favicon, manifest
└── docs/                      # README, DEPLOY, SUPABASE, AUTH
```

---

## 🤝 기여

PR · 이슈 환영! 자세한 가이드는 [`.github/`](./.github/) 참고.

---

## 📄 라이선스

MIT
