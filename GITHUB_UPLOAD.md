# 📤 GitHub 업로드 가이드 (드래그앤드롭 방식)

터미널 / Git 명령어 없이, **웹 브라우저 클릭만으로** GitHub에 올리고 Vercel 배포까지 가는 가장 쉬운 방법입니다.

> ⏱ 총 소요 시간: 15~20분

---

## ✅ Phase A. GitHub 계정 + 저장소 만들기 (3분)

### A-1. GitHub 가입 (계정 없으면)

1. [https://github.com](https://github.com) 접속
2. 우측 상단 **"Sign up"** 클릭
3. 이메일·비밀번호·사용자명 입력
4. 이메일 인증 완료

### A-2. 새 저장소 만들기

1. 로그인 후 우측 상단 **`+` 아이콘** → **"New repository"** 클릭
2. 입력:
   - **Repository name**: `pawtype16`
   - **Description**: `우리는 어떤 발자국 한 쌍일까? Big Five 기반 반려동물 성격 매칭`
   - **Visibility**: **Private** 권장 (Supabase 키 노출 방지)
3. ⚠️ 아래 옵션은 **모두 체크하지 마세요**:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
   - (우리 zip에 이미 들어있어요)
4. **"Create repository"** 클릭

→ 빈 저장소 페이지로 이동합니다.

---

## ✅ Phase B. 파일 드래그앤드롭 업로드 (5분)

### B-1. zip 압축 해제

1. 컴퓨터에서 `pawtype16-v4.zip` **우클릭 → 압축 풀기**
2. `pawtype16` 폴더가 생성됨

### B-2. GitHub 업로드 페이지 진입

빈 저장소 페이지에 다음과 같은 텍스트가 보일 거예요:

> *"...or import code from another repository"*
>
> 그 위쪽에 **"uploading an existing file"** 라는 파란색 링크가 있습니다.

→ **"uploading an existing file"** 클릭

### B-3. 파일 드래그

업로드 페이지에서:

1. 파일 탐색기에서 압축 해제한 **`pawtype16` 폴더를 열기**
2. **폴더 안의 모든 파일/폴더를 전체 선택** (`Ctrl + A`)
3. 선택한 파일들을 **GitHub 업로드 영역으로 드래그앤드롭**

> ⚠️ **중요**: `pawtype16` **폴더 자체를 드래그하지 말고**, 그 **안에 있는 내용물 전체** (app, public, package.json, .gitignore 등)를 드래그하세요.

### B-4. 숨김 파일 처리 (Windows / Mac)

`.gitignore`, `.github`, `.env.example` 같은 점(`.`)으로 시작하는 파일·폴더는 기본적으로 숨겨져 있을 수 있어요.

**Windows**:
- 파일 탐색기 상단 **보기 → 표시 → 숨김 항목** 체크
- 그 다음 다시 전체 선택해서 드래그

**Mac**:
- Finder에서 `Cmd + Shift + .` 눌러 숨김 파일 표시
- 다시 전체 선택해서 드래그

### B-5. 커밋

업로드가 끝나면 페이지 하단에:

1. **"Commit changes"** 섹션 입력:
   - **Commit message**: `feat: PawType-16 v4 initial commit`
2. 라디오 버튼은 **"Commit directly to the `main` branch"** 그대로
3. **"Commit changes"** 버튼 클릭

→ 1~2분 대기 후 저장소 메인 페이지로 이동합니다.

### B-6. 업로드 확인

저장소 메인 페이지에서:
- ✅ `app/`, `public/`, `supabase/` 폴더가 보임
- ✅ `package.json`, `README.md`, `middleware.ts` 등 파일이 보임
- ✅ `.github/`, `.gitignore`, `.env.example` 등 숨김 파일도 보임 (없으면 Phase B-4 재시도)
- ✅ README가 자동으로 화면에 표시됨

---

## ✅ Phase C. CI 빌드 자동 실행 확인 (자동, 2~3분)

업로드와 동시에 GitHub Actions가 자동으로 빌드를 검증합니다.

1. 저장소 상단 **"Actions"** 탭 클릭
2. 방금 만든 커밋이 빌드 중인 게 보임 (노란 점)
3. 2~3분 후 **녹색 체크 ✓** 가 뜨면 빌드 성공
4. 만약 빨간 X가 뜨면, 그 워크플로우 클릭 → 에러 로그 확인 후 알려주세요

---

## ✅ Phase D. Vercel 자동 배포 (5분)

### D-1. Vercel 가입 / 로그인

1. [https://vercel.com](https://vercel.com) 접속
2. **"Sign Up"** 클릭 → **"Continue with GitHub"** 선택 (가장 쉬워요)
3. GitHub 권한 승인

### D-2. 프로젝트 임포트

1. Vercel 대시보드에서 **"Add New..."** → **"Project"** 클릭
2. **Import Git Repository** 섹션에서 `pawtype16` 저장소 찾기
3. 처음이면 **"Adjust GitHub App Permissions"** 클릭해서 저장소 권한 허용
4. `pawtype16` 옆 **"Import"** 클릭

### D-3. 프로젝트 설정

거의 모든 게 자동 감지됩니다:

- **Framework Preset**: Next.js ✅ (자동 감지)
- **Root Directory**: `./` ✅
- **Build Command**: `next build` ✅
- **Output Directory**: `.next` ✅

### D-4. 환경변수 (가장 중요!)

**Environment Variables** 섹션을 펼친 뒤 아래 3개를 **반드시** 입력:

| Key | Value | 설명 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://임시이름.vercel.app` | 배포 후 진짜 도메인으로 수정 |
| `ADMIN_USER` | `admin` | 관리자 ID |
| `ADMIN_PASS` | `당신만의긴비밀번호123!` | **8자 이상**, `changeme`/`admin` 금지 |

> 💡 Supabase·OAuth 키는 **나중에 추가**해도 됩니다 (없어도 앱은 동작).

### D-5. Deploy

**"Deploy"** 클릭 → 1~3분 대기 → 🎉

배포가 완료되면 미리보기 화면이 뜨고, **"Visit"** 또는 **"Continue to Dashboard"** 버튼이 보입니다.

### D-6. SITE_URL 업데이트

1. 배포된 도메인 (예: `pawtype16-abc.vercel.app`) 복사
2. Vercel 프로젝트 → **Settings → Environment Variables**
3. `NEXT_PUBLIC_SITE_URL`을 `https://pawtype16-abc.vercel.app` 으로 수정
4. **Save** → **Deployments → 최신 배포 → ⋯ → Redeploy**

---

## ✅ Phase E. 동작 확인 (3분)

배포된 URL 접속:

- [ ] 메인 페이지 정상 로드, 한국어 자동 적용 (`/ko`)
- [ ] 우측 상단 🌐 클릭 → 7개 언어 전환 가능
- [ ] **검사 시작** → 25문항 → 결과 페이지 도달
- [ ] 결과 URL 복사해서 카카오톡 자기와의 채팅에 붙여넣기 → **미리보기 카드** 표시 ✨
- [ ] `/admin` 접속 → Basic Auth 다이얼로그 → `ADMIN_USER`/`ADMIN_PASS` 입력 → 대시보드 진입
- [ ] 잘못된 비번 입력 → 401 에러 (정상)

---

## 🔄 그 다음은? — 코드 수정 후 재배포

GitHub에 push만 하면 Vercel이 **자동으로 재배포** 합니다.

### GitHub UI에서 직접 수정

1. 저장소에서 수정할 파일 클릭
2. 우측 상단 **연필 아이콘 ✏️** 클릭
3. 코드 수정
4. 하단 **"Commit changes"** 클릭
5. 1~2분 후 Vercel에서 자동 재배포

### 새 파일 추가 / 폴더째 교체

1. 저장소 메인 → **Add file → Upload files**
2. 드래그앤드롭 → Commit

---

## 🚨 자주 발생하는 문제

| 증상 | 해결 |
|---|---|
| 업로드 후 `.github` 폴더가 안 보임 | Phase B-4 — 숨김 파일 표시 후 재업로드 |
| GitHub Actions 빨간 X | Actions 탭에서 에러 로그 확인 → 보통 타입 에러, 알려주세요 |
| Vercel 배포 실패 — 빌드 에러 | 환경변수 누락 가능성, `NEXT_PUBLIC_SITE_URL` 확인 |
| `/admin` 항상 503 | `ADMIN_PASS`가 너무 짧거나 약함 (8자 이상 + `changeme`/`admin` 외) |
| 카톡 공유 미리보기 안 뜸 | `NEXT_PUBLIC_SITE_URL`을 실제 도메인으로 수정 + Redeploy |
| 100MB 초과 파일 에러 | `pawtype16/public/images/` 의 큰 사진 압축 (보통은 문제없음) |

---

## ✨ 한 줄 요약

```
1. GitHub에서 "New repository" 클릭 → pawtype16, Private
2. "uploading an existing file" 링크 클릭
3. zip 풀어서 폴더 안 내용물 전체 드래그
4. Commit changes 클릭
5. vercel.com → "Import Project" → 환경변수 3개 입력 → Deploy
6. 끝! 🎉
```

---

## 📌 다음 단계

배포가 성공하면:

1. **Supabase 연동** → [`SUPABASE.md`](./SUPABASE.md) — 결과 영구 저장 + 마이페이지 활성화
2. **OAuth 로그인** → [`AUTH.md`](./AUTH.md) — Google · Kakao 로그인
3. **커스텀 도메인** → Vercel Settings → Domains

상세한 81-step 체크리스트는 [`VERCEL_CHECKLIST.md`](./VERCEL_CHECKLIST.md) 참고!
