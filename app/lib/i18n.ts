// Lightweight i18n — 7 languages, no external dependency.
// Pages read locale from URL segment (/[locale]/...) and look up keys here.

export const LOCALES = ["ko", "en", "de", "es", "zh", "ja", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ko";

export const LOCALE_LABEL: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  de: "Deutsch",
  es: "Español",
  zh: "中文",
  ja: "日本語",
  ar: "العربية",
};

export const RTL_LOCALES: Locale[] = ["ar"];

export function isLocale(x: string | undefined): x is Locale {
  return !!x && (LOCALES as readonly string[]).includes(x);
}

type Dict = {
  brand_tag: string;
  hero_badge: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_subtitle: string;
  hero_subtitle_highlight: string;
  hero_cta: string;
  hero_cta_note: string;

  why_title: string;
  why_subtitle: string;
  why_1_title: string;
  why_1_desc: string;
  why_2_title: string;
  why_2_desc: string;
  why_3_title: string;
  why_3_desc: string;

  how_title: string;
  how_1_title: string;
  how_1_desc: string;
  how_2_title: string;
  how_2_desc: string;
  how_3_title: string;
  how_3_desc: string;

  social_title_count: string; // includes a {{count}} placeholder

  final_title: string;
  final_desc: string;
  final_cta: string;

  // quiz
  quiz_intro_title: string;
  quiz_intro_desc: string;
  quiz_intro_q1: string;
  quiz_intro_dog: string;
  quiz_intro_cat: string;
  quiz_intro_q2: string;
  quiz_intro_placeholder: string;
  quiz_intro_cta: string;
  quiz_back_home: string;
  quiz_owner_label: string;
  quiz_pet_label: string; // "{{name}} 에 대해서"
  quiz_transition_title: string; // "이제 {{name}} 차례예요!"
  quiz_transition_desc: string;
  quiz_transition_cta: string;
  quiz_loading: string; // "{{name}}와의 케미를 분석 중..."
  quiz_prev: string;
  quiz_skip: string;
  quiz_exit: string;

  // result
  result_kicker: string;
  result_headline: string; // "당신과 {{name}}의 케미는"
  result_score_suffix: string;
  result_owner_label: string;
  result_pet_label: string; // "{{name}}은(는)"
  result_chart_title: string;
  result_chart_subtitle: string;
  result_axis_E: string;
  result_axis_S: string;
  result_axis_A: string;
  result_axis_C: string;
  result_legend_owner: string;
  result_strengths: string;
  result_cautions: string;
  result_activities: string;
  result_share_title: string;
  result_share_copy: string;
  result_share_done: string;
  result_premium_title: string;
  result_premium_desc: string;
  result_premium_cta: string;
  result_friends_title: string; // "{{name}}의 친구 찾기"
  result_friends_desc: string;
  result_friends_cta: string;
  result_commerce_title: string;
  result_commerce_desc: string;
  result_commerce_cta: string;
  result_restart: string;
  result_footer_note: string;

  // common
  share_soon: string;
  share_link_copied: string;
  not_found_title: string;
  not_found_desc: string;
  not_found_cta: string;

  // common v4
  quiz_restored: string;
  shop_nav: string;
  shop_title: string;
  shop_desc: string;
  shop_cta: string;
  shop_result_title: string;
  shop_result_desc: string;
  share_native: string;

  // auth
  auth_login: string;
  auth_modal_title: string;
  auth_modal_desc: string;
  auth_modal_terms: string;
  auth_modal_cancel: string;
  auth_menu_me: string;
  auth_menu_new_test: string;
  auth_menu_signout: string;

  // my page
  me_title: string;
  me_empty_title: string;
  me_empty_desc: string;
  me_empty_cta: string;
  me_history_title: string;
  me_history_count: string; // "{{count}} tests"
  me_table_date: string;
  me_table_pet: string;
  me_table_codes: string;
  me_table_score: string;
  me_table_title: string;
  me_view: string;
  me_delete: string;
  me_delete_confirm: string;
};

const ko: Dict = {
  brand_tag: "우리는 어떤 발자국 한 쌍일까?",
  hero_badge: "🔬 헬싱키대·옥스퍼드 동물성격 연구 기반",
  hero_title_1: "우리 집 그 아이,",
  hero_title_2: "나랑 얼마나 닮았을까?",
  hero_subtitle: "Big Five 행동과학으로 알아보는, 나와 반려동물의",
  hero_subtitle_highlight: "16가지 케미스토리.",
  hero_cta: "검사 시작하기 →",
  hero_cta_note: "⏱ 3분이면 충분해요",

  why_title: "왜 PawType-16일까요?",
  why_subtitle: "단순한 재미 퀴즈가 아닌, 행동과학에 기반한 매칭 도구예요.",
  why_1_title: "검증된 과학",
  why_1_desc: "Canine Big Five & Feline Five 모델 기반 4축 진단",
  why_2_title: "양방향 매칭",
  why_2_desc: "보호자도, 반려동물도 함께 진단해 궁합을 봅니다",
  why_3_title: "16가지 케미",
  why_3_desc: "우리만의 궁합 점수·강점·주의점·맞춤 활동까지",

  how_title: "이렇게 진행돼요",
  how_1_title: "보호자 진단",
  how_1_desc: "나에 대해 12문항",
  how_2_title: "반려동물 진단",
  how_2_desc: "우리 아이 행동 13문항",
  how_3_title: "케미 결과",
  how_3_desc: "궁합 점수와 인사이트 확인",

  social_title_count: "이미 {{count}}명이 케미를 확인했어요",

  final_title: "우리 사이, 점수로 한번 볼까요?",
  final_desc: "3분이면 우리만의 케미 유형을 확인할 수 있어요.",
  final_cta: "무료로 검사 시작 →",

  quiz_intro_title: "시작 전에 두 가지만 알려주세요 🐾",
  quiz_intro_desc: "우리 아이에게 꼭 맞는 결과를 만들기 위해 필요해요.",
  quiz_intro_q1: "우리 아이는 누구인가요?",
  quiz_intro_dog: "강아지",
  quiz_intro_cat: "고양이",
  quiz_intro_q2: "우리 아이 이름은?",
  quiz_intro_placeholder: "예: 또또, 나비",
  quiz_intro_cta: "시작하기 →",
  quiz_back_home: "← 메인으로 돌아가기",
  quiz_owner_label: "🧑 나에 대해서",
  quiz_pet_label: "🐾 {{name}}에 대해서",
  quiz_transition_title: "이제 {{name}} 차례예요!",
  quiz_transition_desc:
    "{{name}}의 행동에 대해 13가지를 물어볼게요. 평소 모습을 떠올리며 답해주세요.",
  quiz_transition_cta: "계속하기 →",
  quiz_loading: "{{name}}와의 케미를 분석하고 있어요…",
  quiz_prev: "← 이전",
  quiz_skip: "건너뛰기",
  quiz_exit: "나가기",

  result_kicker: "드디어 결과가 나왔어요! 🐾",
  result_headline: "당신과 {{name}}의 케미는",
  result_score_suffix: "점",
  result_owner_label: "🧑 나는",
  result_pet_label: "{{name}}은(는)",
  result_chart_title: "우리, 어디서 만나고 어디서 다를까요?",
  result_chart_subtitle: "Big Five 기반 4축 비교 차트",
  result_axis_E: "활력",
  result_axis_S: "사교성",
  result_axis_A: "친화성",
  result_axis_C: "침착성",
  result_legend_owner: "보호자",
  result_strengths: "잘 통하는 점",
  result_cautions: "살짝 조심할 점",
  result_activities: "추천 활동",
  result_share_title: "📸 친구들에게 우리 케미 자랑하기",
  result_share_copy: "🔗 링크 복사",
  result_share_done: "링크가 복사됐어요!",
  result_premium_title: "프리미엄 리포트",
  result_premium_desc: "행동 교정 팁·수의사 코멘트가 담긴 상세 리포트",
  result_premium_cta: "₩4,900 자세히 보기 →",
  result_friends_title: "{{name}}의 친구 찾기",
  result_friends_desc: "비슷한 케미 코드의 반려동물 친구를 찾아드려요 (베타)",
  result_friends_cta: "둘러보기 →",
  result_commerce_title: "케미 맞춤 사료·간식",
  result_commerce_desc: "활동량·기질에 맞춘 큐레이션 제품 추천",
  result_commerce_cta: "상품 보기 →",
  result_restart: "↺ 처음부터 다시 검사하기",
  result_footer_note: "결과는 행동과학에 기반한 참고용 분석입니다",

  share_soon: "공유 기능은 곧 제공됩니다 🐾",
  share_link_copied: "링크가 복사됐어요!",
  not_found_title: "결과를 불러올 수 없어요",
  not_found_desc: "검사를 다시 시도해 주세요.",
  not_found_cta: "검사 다시하기 →",

  quiz_restored: "이전 진행 상황을 불러왔어요",
  shop_nav: "🛒 PawMarket",
  shop_title: "우리 아이에게 딱! 추천 굿즈",
  shop_desc: "PawType-16이 엄선한 반려용품을 만나보세요. 사료·간식·장난감·케어용품까지, 우리 아이에게 꼭 맞는 한 가지를 골라드려요.",
  shop_cta: "PawMarket 보러가기 →",
  shop_result_title: "이 케미에 어울리는 굿즈",
  shop_result_desc: "진단 결과를 기념할 우리 아이만의 굿즈, PawMarket에서 만나요",
  share_native: "공유",

  auth_login: "로그인",
  auth_modal_title: "우리의 케미 이력을 저장하세요",
  auth_modal_desc: "로그인하면 검사 결과가 영구 보관되고, 마이페이지에서 한눈에 볼 수 있어요.",
  auth_modal_terms: "로그인은 결과 저장 외 다른 용도로 쓰이지 않습니다.",
  auth_modal_cancel: "취소",
  auth_menu_me: "마이페이지",
  auth_menu_new_test: "새 검사 시작",
  auth_menu_signout: "로그아웃",

  me_title: "마이페이지",
  me_empty_title: "아직 저장된 검사가 없어요",
  me_empty_desc: "첫 검사를 시작하면 여기에 결과가 쌓여요.",
  me_empty_cta: "검사 시작하기 →",
  me_history_title: "내 검사 이력",
  me_history_count: "{{count}}건",
  me_table_date: "날짜",
  me_table_pet: "반려동물",
  me_table_codes: "코드",
  me_table_score: "점수",
  me_table_title: "콤비",
  me_view: "결과 보기",
  me_delete: "삭제",
  me_delete_confirm: "이 결과를 삭제할까요?",
};

const en: Dict = {
  brand_tag: "What kind of paw-pair are we?",
  hero_badge: "🔬 Based on Helsinki & Oxford animal-personality research",
  hero_title_1: "How alike are you",
  hero_title_2: "and your furry friend?",
  hero_subtitle: "Big Five behavioral science meets",
  hero_subtitle_highlight: "16 chemistry stories.",
  hero_cta: "Start the test →",
  hero_cta_note: "⏱ Takes just 3 minutes",
  why_title: "Why PawType-16?",
  why_subtitle: "Not just a fun quiz — a matching tool built on behavioral science.",
  why_1_title: "Validated science",
  why_1_desc: "Built on Canine Big Five & Feline Five models",
  why_2_title: "Two-way match",
  why_2_desc: "Both you and your pet take the test, then we compare",
  why_3_title: "16 chemistries",
  why_3_desc: "Unique match score, strengths, cautions and tailored activities",
  how_title: "How it works",
  how_1_title: "About you",
  how_1_desc: "12 quick questions",
  how_2_title: "About your pet",
  how_2_desc: "13 behavior questions",
  how_3_title: "Your chemistry",
  how_3_desc: "Score and insights revealed",
  social_title_count: "{{count}} pairs have already checked their chemistry",
  final_title: "Ready to see your match score?",
  final_desc: "Discover your unique chemistry type in just 3 minutes.",
  final_cta: "Start free test →",
  quiz_intro_title: "Two quick things before we start 🐾",
  quiz_intro_desc: "So we can tailor the result for your pet.",
  quiz_intro_q1: "Who is your pet?",
  quiz_intro_dog: "Dog",
  quiz_intro_cat: "Cat",
  quiz_intro_q2: "What's their name?",
  quiz_intro_placeholder: "e.g. Buddy, Luna",
  quiz_intro_cta: "Get started →",
  quiz_back_home: "← Back to home",
  quiz_owner_label: "🧑 About you",
  quiz_pet_label: "🐾 About {{name}}",
  quiz_transition_title: "Now it's {{name}}'s turn!",
  quiz_transition_desc:
    "13 questions about {{name}}'s behavior. Think of their everyday self as you answer.",
  quiz_transition_cta: "Continue →",
  quiz_loading: "Analyzing your chemistry with {{name}}…",
  quiz_prev: "← Back",
  quiz_skip: "Skip",
  quiz_exit: "Exit",
  result_kicker: "Your result is in! 🐾",
  result_headline: "Your chemistry with {{name}}",
  result_score_suffix: "pts",
  result_owner_label: "🧑 You are",
  result_pet_label: "{{name}} is",
  result_chart_title: "Where do we meet, where do we differ?",
  result_chart_subtitle: "4-axis comparison based on Big Five",
  result_axis_E: "Energy",
  result_axis_S: "Sociability",
  result_axis_A: "Agreeableness",
  result_axis_C: "Calmness",
  result_legend_owner: "Owner",
  result_strengths: "What clicks",
  result_cautions: "Watch out for",
  result_activities: "Suggested activities",
  result_share_title: "📸 Share your chemistry with friends",
  result_share_copy: "🔗 Copy link",
  result_share_done: "Link copied!",
  result_premium_title: "Premium report",
  result_premium_desc: "Detailed report with behavior tips and vet comments",
  result_premium_cta: "$4.90 Learn more →",
  result_friends_title: "Find friends for {{name}}",
  result_friends_desc: "We'll find pets with similar chemistry codes (beta)",
  result_friends_cta: "Explore →",
  result_commerce_title: "Tailored food & treats",
  result_commerce_desc: "Curated products that fit your pet's energy & temperament",
  result_commerce_cta: "Shop →",
  result_restart: "↺ Take the test again",
  result_footer_note: "Results are a behavioral-science-based reference, not a diagnosis.",
  share_soon: "Sharing coming soon 🐾",
  share_link_copied: "Link copied!",
  not_found_title: "Couldn't load the result",
  not_found_desc: "Please try the test again.",
  not_found_cta: "Restart test →",

  quiz_restored: "Restored your previous progress",
  shop_nav: "🛒 PawMarket",
  shop_title: "Perfect picks for your buddy!",
  shop_desc: "Discover pet essentials curated by PawType-16. From food and treats to toys and care products, find exactly what your companion needs.",
  shop_cta: "Visit PawMarket →",
  shop_result_title: "Goodies for this chemistry",
  shop_result_desc: "Celebrate your result with curated goods from PawMarket — made for your unique duo",
  share_native: "Share",

  auth_login: "Sign in",
  auth_modal_title: "Save your chemistry history",
  auth_modal_desc: "Sign in to keep your results forever and view them on one page.",
  auth_modal_terms: "We only use your account to save your test results.",
  auth_modal_cancel: "Cancel",
  auth_menu_me: "My page",
  auth_menu_new_test: "New test",
  auth_menu_signout: "Sign out",

  me_title: "My page",
  me_empty_title: "No saved tests yet",
  me_empty_desc: "Take your first test and your results will appear here.",
  me_empty_cta: "Start test →",
  me_history_title: "My test history",
  me_history_count: "{{count}} tests",
  me_table_date: "Date",
  me_table_pet: "Pet",
  me_table_codes: "Codes",
  me_table_score: "Score",
  me_table_title: "Combo",
  me_view: "View",
  me_delete: "Delete",
  me_delete_confirm: "Delete this result?",
};

const de: Dict = {
  brand_tag: "Was für ein Pfoten-Paar sind wir?",
  hero_badge: "🔬 Basierend auf Tier-Persönlichkeitsforschung (Helsinki & Oxford)",
  hero_title_1: "Wie ähnlich seid ihr,",
  hero_title_2: "du und dein Liebling?",
  hero_subtitle: "Big-Five-Verhaltensforschung trifft auf",
  hero_subtitle_highlight: "16 Chemie-Geschichten.",
  hero_cta: "Test starten →",
  hero_cta_note: "⏱ Nur 3 Minuten",
  why_title: "Warum PawType-16?",
  why_subtitle: "Kein Spaß-Quiz — ein Matching-Tool auf wissenschaftlicher Basis.",
  why_1_title: "Wissenschaftlich fundiert",
  why_1_desc: "Auf Canine Big Five & Feline Five aufgebaut",
  why_2_title: "Beidseitiges Matching",
  why_2_desc: "Du und dein Haustier macht den Test, wir vergleichen",
  why_3_title: "16 Chemien",
  why_3_desc: "Match-Score, Stärken, Hinweise und passende Aktivitäten",
  how_title: "So funktioniert's",
  how_1_title: "Über dich",
  how_1_desc: "12 kurze Fragen",
  how_2_title: "Über dein Haustier",
  how_2_desc: "13 Verhaltensfragen",
  how_3_title: "Eure Chemie",
  how_3_desc: "Score und Insights",
  social_title_count: "{{count}} Paare haben ihre Chemie schon entdeckt",
  final_title: "Bereit für euren Match-Score?",
  final_desc: "Entdeckt euren einzigartigen Chemie-Typ in nur 3 Minuten.",
  final_cta: "Kostenlos starten →",
  quiz_intro_title: "Zwei Dinge vorab 🐾",
  quiz_intro_desc: "Damit das Ergebnis perfekt zu deinem Liebling passt.",
  quiz_intro_q1: "Wer ist dein Haustier?",
  quiz_intro_dog: "Hund",
  quiz_intro_cat: "Katze",
  quiz_intro_q2: "Wie heißt dein Liebling?",
  quiz_intro_placeholder: "z.B. Bello, Luna",
  quiz_intro_cta: "Los geht's →",
  quiz_back_home: "← Zurück zur Startseite",
  quiz_owner_label: "🧑 Über dich",
  quiz_pet_label: "🐾 Über {{name}}",
  quiz_transition_title: "Jetzt ist {{name}} dran!",
  quiz_transition_desc:
    "13 Fragen über {{name}}'s Verhalten. Denk an den Alltag deines Lieblings.",
  quiz_transition_cta: "Weiter →",
  quiz_loading: "Wir analysieren eure Chemie mit {{name}}…",
  quiz_prev: "← Zurück",
  quiz_skip: "Überspringen",
  quiz_exit: "Beenden",
  result_kicker: "Euer Ergebnis ist da! 🐾",
  result_headline: "Eure Chemie mit {{name}}",
  result_score_suffix: "Pkt",
  result_owner_label: "🧑 Du bist",
  result_pet_label: "{{name}} ist",
  result_chart_title: "Wo trefft ihr euch, wo nicht?",
  result_chart_subtitle: "4-Achsen-Vergleich (Big Five)",
  result_axis_E: "Energie",
  result_axis_S: "Geselligkeit",
  result_axis_A: "Verträglichkeit",
  result_axis_C: "Gelassenheit",
  result_legend_owner: "Halter",
  result_strengths: "Was super passt",
  result_cautions: "Worauf achten",
  result_activities: "Empfohlene Aktivitäten",
  result_share_title: "📸 Teil eure Chemie mit Freunden",
  result_share_copy: "🔗 Link kopieren",
  result_share_done: "Link kopiert!",
  result_premium_title: "Premium-Bericht",
  result_premium_desc: "Detaillierter Bericht mit Tipps und Tierarzt-Kommentaren",
  result_premium_cta: "4,90€ Mehr erfahren →",
  result_friends_title: "Freunde für {{name}} finden",
  result_friends_desc: "Wir finden Tiere mit ähnlichem Chemie-Code (Beta)",
  result_friends_cta: "Entdecken →",
  result_commerce_title: "Passendes Futter & Snacks",
  result_commerce_desc: "Kuratiertes für Energie und Temperament",
  result_commerce_cta: "Shop →",
  result_restart: "↺ Test erneut machen",
  result_footer_note: "Die Ergebnisse sind ein verhaltenswissenschaftlicher Hinweis, keine Diagnose.",
  share_soon: "Teilen kommt bald 🐾",
  share_link_copied: "Link kopiert!",
  not_found_title: "Ergebnis nicht ladbar",
  not_found_desc: "Bitte den Test erneut starten.",
  not_found_cta: "Test neu starten →",

  quiz_restored: "Vorheriger Fortschritt wiederhergestellt",
  shop_nav: "🛒 PawMarket",
  shop_title: "Genau das Richtige für euren Liebling!",
  shop_desc: "Entdecke handverlesene Haustierprodukte von PawType-16. Von Futter bis Spielzeug — wir finden, was zu eurem Duo passt.",
  shop_cta: "PawMarket besuchen →",
  shop_result_title: "Passende Produkte zu dieser Chemie",
  shop_result_desc: "Feiert euer Ergebnis mit kuratierten Produkten aus PawMarket — gemacht für euer einzigartiges Duo",
  share_native: "Teilen",

  auth_login: "Anmelden",
  auth_modal_title: "Speichere deinen Chemie-Verlauf",
  auth_modal_desc: "Melde dich an, um deine Ergebnisse dauerhaft zu speichern.",
  auth_modal_terms: "Wir nutzen dein Konto ausschließlich zum Speichern der Ergebnisse.",
  auth_modal_cancel: "Abbrechen",
  auth_menu_me: "Meine Seite",
  auth_menu_new_test: "Neuer Test",
  auth_menu_signout: "Abmelden",

  me_title: "Meine Seite",
  me_empty_title: "Noch keine Tests gespeichert",
  me_empty_desc: "Beginne mit einem Test, dann erscheinen die Ergebnisse hier.",
  me_empty_cta: "Test starten →",
  me_history_title: "Mein Testverlauf",
  me_history_count: "{{count}} Tests",
  me_table_date: "Datum",
  me_table_pet: "Haustier",
  me_table_codes: "Codes",
  me_table_score: "Punkte",
  me_table_title: "Combo",
  me_view: "Ansehen",
  me_delete: "Löschen",
  me_delete_confirm: "Dieses Ergebnis löschen?",
};

const es: Dict = {
  brand_tag: "¿Qué clase de pareja de patitas somos?",
  hero_badge: "🔬 Basado en estudios de personalidad animal (Helsinki & Oxford)",
  hero_title_1: "¿Cuánto te pareces",
  hero_title_2: "a tu peludo amigo?",
  hero_subtitle: "Ciencia del comportamiento (Big Five) con",
  hero_subtitle_highlight: "16 historias de química.",
  hero_cta: "Comenzar test →",
  hero_cta_note: "⏱ Solo 3 minutos",
  why_title: "¿Por qué PawType-16?",
  why_subtitle: "No es un quiz divertido cualquiera — usa ciencia conductual.",
  why_1_title: "Ciencia validada",
  why_1_desc: "Basado en Canine Big Five & Feline Five",
  why_2_title: "Match bidireccional",
  why_2_desc: "Tú y tu mascota responden, comparamos",
  why_3_title: "16 químicas",
  why_3_desc: "Score, fortalezas, alertas y actividades a medida",
  how_title: "Cómo funciona",
  how_1_title: "Sobre ti",
  how_1_desc: "12 preguntas",
  how_2_title: "Sobre tu mascota",
  how_2_desc: "13 preguntas de comportamiento",
  how_3_title: "Tu química",
  how_3_desc: "Score e insights",
  social_title_count: "{{count}} parejas ya descubrieron su química",
  final_title: "¿Listos para vuestro score?",
  final_desc: "Descubrid vuestro tipo único en 3 minutos.",
  final_cta: "Empezar gratis →",
  quiz_intro_title: "Dos cosas antes de empezar 🐾",
  quiz_intro_desc: "Para personalizar el resultado.",
  quiz_intro_q1: "¿Quién es tu mascota?",
  quiz_intro_dog: "Perro",
  quiz_intro_cat: "Gato",
  quiz_intro_q2: "¿Cómo se llama?",
  quiz_intro_placeholder: "ej. Toby, Luna",
  quiz_intro_cta: "Empezar →",
  quiz_back_home: "← Volver al inicio",
  quiz_owner_label: "🧑 Sobre ti",
  quiz_pet_label: "🐾 Sobre {{name}}",
  quiz_transition_title: "¡Ahora es el turno de {{name}}!",
  quiz_transition_desc:
    "13 preguntas sobre el comportamiento de {{name}}. Piensa en su día a día.",
  quiz_transition_cta: "Continuar →",
  quiz_loading: "Analizando tu química con {{name}}…",
  quiz_prev: "← Atrás",
  quiz_skip: "Saltar",
  quiz_exit: "Salir",
  result_kicker: "¡Resultado listo! 🐾",
  result_headline: "Tu química con {{name}}",
  result_score_suffix: "pts",
  result_owner_label: "🧑 Tú eres",
  result_pet_label: "{{name}} es",
  result_chart_title: "¿Dónde coincidimos y dónde no?",
  result_chart_subtitle: "Comparativa de 4 ejes (Big Five)",
  result_axis_E: "Energía",
  result_axis_S: "Sociabilidad",
  result_axis_A: "Amabilidad",
  result_axis_C: "Calma",
  result_legend_owner: "Tutor",
  result_strengths: "Lo que encaja",
  result_cautions: "Cuidados",
  result_activities: "Actividades sugeridas",
  result_share_title: "📸 Comparte vuestra química",
  result_share_copy: "🔗 Copiar enlace",
  result_share_done: "¡Enlace copiado!",
  result_premium_title: "Informe premium",
  result_premium_desc: "Informe detallado con consejos y notas veterinarias",
  result_premium_cta: "4,90€ Más info →",
  result_friends_title: "Encuentra amigos para {{name}}",
  result_friends_desc: "Mascotas con códigos de química similares (beta)",
  result_friends_cta: "Explorar →",
  result_commerce_title: "Comida y snacks a medida",
  result_commerce_desc: "Curados según energía y temperamento",
  result_commerce_cta: "Ver tienda →",
  result_restart: "↺ Volver a hacer el test",
  result_footer_note: "Resultado basado en ciencia conductual, no es un diagnóstico.",
  share_soon: "Compartir muy pronto 🐾",
  share_link_copied: "¡Enlace copiado!",
  not_found_title: "No se pudo cargar el resultado",
  not_found_desc: "Por favor vuelve a hacer el test.",
  not_found_cta: "Reintentar →",

  quiz_restored: "Progreso anterior restaurado",
  shop_nav: "🛒 PawMarket",
  shop_title: "¡Lo ideal para tu peludo!",
  shop_desc: "Descubre productos para mascotas seleccionados por PawType-16. Comida, snacks, juguetes y cuidados a la medida de tu compañero.",
  shop_cta: "Visitar PawMarket →",
  shop_result_title: "Productos para esta química",
  shop_result_desc: "Celebra tu resultado con productos seleccionados en PawMarket — hechos para tu dúo único",
  share_native: "Compartir",

  auth_login: "Iniciar sesión",
  auth_modal_title: "Guarda tu historial de química",
  auth_modal_desc: "Inicia sesión para conservar tus resultados y verlos en un solo lugar.",
  auth_modal_terms: "Solo usamos tu cuenta para guardar los resultados.",
  auth_modal_cancel: "Cancelar",
  auth_menu_me: "Mi página",
  auth_menu_new_test: "Nuevo test",
  auth_menu_signout: "Cerrar sesión",

  me_title: "Mi página",
  me_empty_title: "Aún no hay tests guardados",
  me_empty_desc: "Haz tu primer test y tus resultados aparecerán aquí.",
  me_empty_cta: "Iniciar test →",
  me_history_title: "Mi historial",
  me_history_count: "{{count}} tests",
  me_table_date: "Fecha",
  me_table_pet: "Mascota",
  me_table_codes: "Códigos",
  me_table_score: "Puntaje",
  me_table_title: "Combo",
  me_view: "Ver",
  me_delete: "Eliminar",
  me_delete_confirm: "¿Eliminar este resultado?",
};

const zh: Dict = {
  brand_tag: "我们是怎样的一对脚印？",
  hero_badge: "🔬 基于赫尔辛基·牛津动物性格研究",
  hero_title_1: "你和家里的毛孩子",
  hero_title_2: "到底有多像？",
  hero_subtitle: "大五行为科学带来的",
  hero_subtitle_highlight: "16 种默契故事。",
  hero_cta: "开始测试 →",
  hero_cta_note: "⏱ 3 分钟就够",
  why_title: "为什么是 PawType-16?",
  why_subtitle: "不只是好玩的测验,而是基于行为科学的匹配工具。",
  why_1_title: "经过验证的科学",
  why_1_desc: "基于 Canine Big Five 与 Feline Five 模型",
  why_2_title: "双向匹配",
  why_2_desc: "你和宠物一起测,我们做比较",
  why_3_title: "16 种默契",
  why_3_desc: "默契分数、优点、提醒与建议活动",
  how_title: "如何进行",
  how_1_title: "关于你",
  how_1_desc: "12 道问题",
  how_2_title: "关于宠物",
  how_2_desc: "13 道行为问题",
  how_3_title: "你们的默契",
  how_3_desc: "分数与洞察",
  social_title_count: "已有 {{count}} 对查看过他们的默契",
  final_title: "想知道你们的分数吗?",
  final_desc: "3 分钟揭晓你们独一无二的默契类型。",
  final_cta: "免费开始 →",
  quiz_intro_title: "开始前先问两件事 🐾",
  quiz_intro_desc: "好让结果更适合你的宠物。",
  quiz_intro_q1: "你的宠物是?",
  quiz_intro_dog: "狗狗",
  quiz_intro_cat: "猫咪",
  quiz_intro_q2: "它叫什么名字?",
  quiz_intro_placeholder: "例如:豆豆、小白",
  quiz_intro_cta: "开始 →",
  quiz_back_home: "← 返回首页",
  quiz_owner_label: "🧑 关于你",
  quiz_pet_label: "🐾 关于 {{name}}",
  quiz_transition_title: "现在轮到 {{name}} 了!",
  quiz_transition_desc:
    "关于 {{name}} 的 13 个行为问题。回想它日常的样子来回答。",
  quiz_transition_cta: "继续 →",
  quiz_loading: "正在分析你与 {{name}} 的默契…",
  quiz_prev: "← 上一题",
  quiz_skip: "跳过",
  quiz_exit: "退出",
  result_kicker: "结果出来啦! 🐾",
  result_headline: "你与 {{name}} 的默契",
  result_score_suffix: "分",
  result_owner_label: "🧑 我是",
  result_pet_label: "{{name}} 是",
  result_chart_title: "我们在哪里相遇,又在哪里不同?",
  result_chart_subtitle: "基于大五的 4 轴比较",
  result_axis_E: "活力",
  result_axis_S: "社交",
  result_axis_A: "亲和",
  result_axis_C: "稳定",
  result_legend_owner: "主人",
  result_strengths: "默契亮点",
  result_cautions: "需要留意",
  result_activities: "推荐活动",
  result_share_title: "📸 与朋友分享你们的默契",
  result_share_copy: "🔗 复制链接",
  result_share_done: "链接已复制!",
  result_premium_title: "高级报告",
  result_premium_desc: "含行为训练贴士和兽医点评的详细报告",
  result_premium_cta: "¥29 查看详情 →",
  result_friends_title: "为 {{name}} 找朋友",
  result_friends_desc: "找到默契代码相近的宠物朋友 (Beta)",
  result_friends_cta: "去看看 →",
  result_commerce_title: "贴合默契的粮食零食",
  result_commerce_desc: "依据活力与气质精选推荐",
  result_commerce_cta: "去逛逛 →",
  result_restart: "↺ 重新测试",
  result_footer_note: "结果基于行为科学,仅供参考。",
  share_soon: "分享功能即将上线 🐾",
  share_link_copied: "链接已复制!",
  not_found_title: "无法加载结果",
  not_found_desc: "请重新测试。",
  not_found_cta: "重新开始 →",

  quiz_restored: "已恢复上次进度",
  shop_nav: "🛒 PawMarket",
  shop_title: "为你家宝贝精选的好物!",
  shop_desc: "探索 PawType-16 精选的宠物用品。食品、零食、玩具与护理品,为你的伙伴量身挑选。",
  shop_cta: "前往 PawMarket →",
  shop_result_title: "契合这份默契的好物",
  shop_result_desc: "用 PawMarket 精选好物纪念你们独一无二的羁绊",
  share_native: "分享",

  auth_login: "登录",
  auth_modal_title: "保存你们的默契记录",
  auth_modal_desc: "登录后可永久保存测试结果，并在我的页面查看。",
  auth_modal_terms: "账户仅用于保存测试结果。",
  auth_modal_cancel: "取消",
  auth_menu_me: "我的页面",
  auth_menu_new_test: "开始新测试",
  auth_menu_signout: "退出登录",

  me_title: "我的页面",
  me_empty_title: "还没有保存的测试",
  me_empty_desc: "完成第一次测试后，结果会显示在这里。",
  me_empty_cta: "开始测试 →",
  me_history_title: "我的测试记录",
  me_history_count: "{{count}} 次",
  me_table_date: "日期",
  me_table_pet: "宠物",
  me_table_codes: "代码",
  me_table_score: "分数",
  me_table_title: "组合",
  me_view: "查看",
  me_delete: "删除",
  me_delete_confirm: "删除这条结果？",
};

const ja: Dict = {
  brand_tag: "私たちは どんな足跡のペア?",
  hero_badge: "🔬 ヘルシンキ大・オックスフォード動物性格研究に基づく",
  hero_title_1: "うちの あの子と",
  hero_title_2: "私、どれくらい似てる?",
  hero_subtitle: "ビッグファイブ行動科学で読み解く",
  hero_subtitle_highlight: "16 通りの相性ストーリー。",
  hero_cta: "テストを始める →",
  hero_cta_note: "⏱ たった3分",
  why_title: "なぜ PawType-16?",
  why_subtitle: "ただの楽しいクイズではなく、行動科学に基づくマッチングツールです。",
  why_1_title: "検証済みの科学",
  why_1_desc: "Canine Big Five と Feline Five モデルに基づく",
  why_2_title: "双方向マッチ",
  why_2_desc: "飼い主もペットも答えて、相性を比較",
  why_3_title: "16 の相性",
  why_3_desc: "スコア・強み・注意点・おすすめアクティビティ",
  how_title: "進め方",
  how_1_title: "あなたについて",
  how_1_desc: "12 問",
  how_2_title: "ペットについて",
  how_2_desc: "行動 13 問",
  how_3_title: "ふたりの相性",
  how_3_desc: "スコアとインサイト",
  social_title_count: "すでに {{count}} 組が相性を確認しました",
  final_title: "ふたりのスコア、見てみる?",
  final_desc: "3 分で あなたたちだけの相性タイプがわかります。",
  final_cta: "無料で始める →",
  quiz_intro_title: "始める前に 2 つだけ 🐾",
  quiz_intro_desc: "ぴったりの結果のために必要です。",
  quiz_intro_q1: "ペットはどんな子?",
  quiz_intro_dog: "犬",
  quiz_intro_cat: "猫",
  quiz_intro_q2: "お名前は?",
  quiz_intro_placeholder: "例: モモ, レオ",
  quiz_intro_cta: "始める →",
  quiz_back_home: "← ホームに戻る",
  quiz_owner_label: "🧑 あなたについて",
  quiz_pet_label: "🐾 {{name}} について",
  quiz_transition_title: "次は {{name}} の番!",
  quiz_transition_desc:
    "{{name}} の行動について 13 問。普段の姿を思い浮かべて答えてね。",
  quiz_transition_cta: "続ける →",
  quiz_loading: "{{name}} との相性を分析中…",
  quiz_prev: "← 戻る",
  quiz_skip: "スキップ",
  quiz_exit: "終了",
  result_kicker: "結果が出ました! 🐾",
  result_headline: "{{name}} との相性は",
  result_score_suffix: "点",
  result_owner_label: "🧑 あなたは",
  result_pet_label: "{{name}} は",
  result_chart_title: "どこで重なり、どこで違う?",
  result_chart_subtitle: "ビッグファイブによる4軸比較",
  result_axis_E: "活力",
  result_axis_S: "社交性",
  result_axis_A: "親和性",
  result_axis_C: "落ち着き",
  result_legend_owner: "飼い主",
  result_strengths: "ぴったりな点",
  result_cautions: "気をつける点",
  result_activities: "おすすめアクティビティ",
  result_share_title: "📸 友達に相性を自慢する",
  result_share_copy: "🔗 リンクをコピー",
  result_share_done: "リンクをコピーしました!",
  result_premium_title: "プレミアムレポート",
  result_premium_desc: "行動アドバイスと獣医コメントを含む詳細レポート",
  result_premium_cta: "¥490 詳しく見る →",
  result_friends_title: "{{name}} の友達を探す",
  result_friends_desc: "似た相性コードのペットを見つけます (ベータ)",
  result_friends_cta: "見てみる →",
  result_commerce_title: "相性にあったフード&おやつ",
  result_commerce_desc: "活力と気質に合わせたキュレーション",
  result_commerce_cta: "商品を見る →",
  result_restart: "↺ もう一度テスト",
  result_footer_note: "結果は行動科学に基づく参考情報で、診断ではありません。",
  share_soon: "シェア機能は近日提供 🐾",
  share_link_copied: "リンクをコピーしました!",
  not_found_title: "結果を読み込めません",
  not_found_desc: "もう一度テストを試してください。",
  not_found_cta: "テストをやり直す →",

  quiz_restored: "前回の進行状況を復元しました",
  shop_nav: "🛒 PawMarket",
  shop_title: "うちの子にぴったり!おすすめグッズ",
  shop_desc: "PawType-16が厳選したペット用品。フード・おやつ・おもちゃ・ケア用品まで、あなたの相棒にぴったりの一品を。",
  shop_cta: "PawMarketを見る →",
  shop_result_title: "このケミに似合うグッズ",
  shop_result_desc: "診断結果を記念する特別な一品を、PawMarketで見つけて",
  share_native: "シェア",

  auth_login: "ログイン",
  auth_modal_title: "私たちのケミ記録を保存",
  auth_modal_desc: "ログインすると結果が永久保存され、マイページから一覧できます。",
  auth_modal_terms: "アカウントは結果保存以外には使用されません。",
  auth_modal_cancel: "キャンセル",
  auth_menu_me: "マイページ",
  auth_menu_new_test: "新しいテスト",
  auth_menu_signout: "ログアウト",

  me_title: "マイページ",
  me_empty_title: "まだ保存されたテストはありません",
  me_empty_desc: "最初のテストを終えると、ここに結果が表示されます。",
  me_empty_cta: "テストを始める →",
  me_history_title: "テスト履歴",
  me_history_count: "{{count}}件",
  me_table_date: "日付",
  me_table_pet: "ペット",
  me_table_codes: "コード",
  me_table_score: "スコア",
  me_table_title: "コンビ",
  me_view: "見る",
  me_delete: "削除",
  me_delete_confirm: "この結果を削除しますか？",
};

const ar: Dict = {
  brand_tag: "أي زوج من آثار الأقدام نحن؟",
  hero_badge: "🔬 يستند إلى أبحاث شخصية الحيوان في هلسنكي وأكسفورد",
  hero_title_1: "كم تشبه",
  hero_title_2: "صديقك ذو الفراء؟",
  hero_subtitle: "علم السلوك (Big Five) يلتقي بـ",
  hero_subtitle_highlight: "16 قصة كيمياء.",
  hero_cta: "ابدأ الاختبار →",
  hero_cta_note: "⏱ يستغرق 3 دقائق فقط",
  why_title: "لماذا PawType-16؟",
  why_subtitle: "ليس مجرد اختبار ممتع — أداة مطابقة مبنية على علم السلوك.",
  why_1_title: "علم موثق",
  why_1_desc: "مبني على نموذجَي Canine Big Five و Feline Five",
  why_2_title: "تطابق ثنائي الاتجاه",
  why_2_desc: "أنت وحيوانك تجيبان، ثم نقارن",
  why_3_title: "16 نوع كيمياء",
  why_3_desc: "نقاط التطابق، نقاط القوة، التحذيرات وأنشطة مخصصة",
  how_title: "كيف يعمل",
  how_1_title: "عنك",
  how_1_desc: "12 سؤالًا",
  how_2_title: "عن حيوانك",
  how_2_desc: "13 سؤالًا سلوكيًا",
  how_3_title: "كيمياؤكما",
  how_3_desc: "النتيجة والرؤى",
  social_title_count: "تحقق {{count}} زوجًا من كيميائهم بالفعل",
  final_title: "مستعد لرؤية درجة التطابق؟",
  final_desc: "اكتشفوا نوعكم الفريد خلال 3 دقائق فقط.",
  final_cta: "ابدأ مجانًا →",
  quiz_intro_title: "أمران قبل أن نبدأ 🐾",
  quiz_intro_desc: "حتى نخصّص النتيجة لحيوانك.",
  quiz_intro_q1: "من هو حيوانك؟",
  quiz_intro_dog: "كلب",
  quiz_intro_cat: "قطة",
  quiz_intro_q2: "ما اسمه؟",
  quiz_intro_placeholder: "مثل: لونا، ماكس",
  quiz_intro_cta: "ابدأ →",
  quiz_back_home: "← العودة إلى الرئيسية",
  quiz_owner_label: "🧑 عنك",
  quiz_pet_label: "🐾 عن {{name}}",
  quiz_transition_title: "الآن دور {{name}}!",
  quiz_transition_desc:
    "13 سؤالًا عن سلوك {{name}}. تذكّر حياته اليومية وأجب.",
  quiz_transition_cta: "متابعة →",
  quiz_loading: "نحلل كيمياءك مع {{name}}…",
  quiz_prev: "← السابق",
  quiz_skip: "تخطٍ",
  quiz_exit: "خروج",
  result_kicker: "النتيجة جاهزة! 🐾",
  result_headline: "كيمياؤك مع {{name}}",
  result_score_suffix: "نقطة",
  result_owner_label: "🧑 أنت",
  result_pet_label: "{{name}}",
  result_chart_title: "أين نلتقي، وأين نختلف؟",
  result_chart_subtitle: "مقارنة 4 محاور (Big Five)",
  result_axis_E: "النشاط",
  result_axis_S: "الاجتماعية",
  result_axis_A: "اللطف",
  result_axis_C: "الهدوء",
  result_legend_owner: "المالك",
  result_strengths: "نقاط التناغم",
  result_cautions: "نقاط الانتباه",
  result_activities: "أنشطة مقترحة",
  result_share_title: "📸 شارك كيمياءك مع الأصدقاء",
  result_share_copy: "🔗 نسخ الرابط",
  result_share_done: "تم نسخ الرابط!",
  result_premium_title: "التقرير المتقدم",
  result_premium_desc: "تقرير مفصل مع نصائح سلوكية وتعليقات بيطرية",
  result_premium_cta: "اعرف المزيد →",
  result_friends_title: "ابحث عن أصدقاء لـ {{name}}",
  result_friends_desc: "نجد حيوانات بكيمياء مشابهة (تجريبي)",
  result_friends_cta: "استكشاف →",
  result_commerce_title: "طعام ومكافآت مخصصة",
  result_commerce_desc: "منتقاة حسب الطاقة والمزاج",
  result_commerce_cta: "تسوّق →",
  result_restart: "↺ أعد الاختبار",
  result_footer_note: "النتائج إشارة علمية سلوكية وليست تشخيصًا.",
  share_soon: "المشاركة قريبًا 🐾",
  share_link_copied: "تم نسخ الرابط!",
  not_found_title: "تعذّر تحميل النتيجة",
  not_found_desc: "يرجى إعادة الاختبار.",
  not_found_cta: "إعادة الاختبار →",

  quiz_restored: "تمت استعادة تقدمك السابق",
  shop_nav: "🛒 PawMarket",
  shop_title: "الأفضل لرفيقك الصغير!",
  shop_desc: "اكتشف منتجات الحيوانات الأليفة المختارة من PawType-16. طعام ومكافآت وألعاب ومستلزمات عناية، كل ما يحتاجه رفيقك.",
  shop_cta: "زيارة PawMarket →",
  shop_result_title: "منتجات تليق بهذه الكيمياء",
  shop_result_desc: "احتفل بنتيجتك مع منتجات مختارة من PawMarket — صُنعت لثنائيكما الفريد",
  share_native: "مشاركة",

  auth_login: "تسجيل الدخول",
  auth_modal_title: "احفظ سجل التناغم بينكما",
  auth_modal_desc: "سجّل الدخول لحفظ نتائجك بشكل دائم وعرضها في صفحة واحدة.",
  auth_modal_terms: "نستخدم حسابك فقط لحفظ نتائج الاختبار.",
  auth_modal_cancel: "إلغاء",
  auth_menu_me: "صفحتي",
  auth_menu_new_test: "اختبار جديد",
  auth_menu_signout: "تسجيل الخروج",

  me_title: "صفحتي",
  me_empty_title: "لا توجد اختبارات محفوظة بعد",
  me_empty_desc: "ابدأ اختبارك الأول وستظهر نتائجك هنا.",
  me_empty_cta: "بدء الاختبار →",
  me_history_title: "سجل اختباراتي",
  me_history_count: "{{count}} اختبارات",
  me_table_date: "التاريخ",
  me_table_pet: "الحيوان",
  me_table_codes: "الرموز",
  me_table_score: "النتيجة",
  me_table_title: "التركيبة",
  me_view: "عرض",
  me_delete: "حذف",
  me_delete_confirm: "حذف هذه النتيجة؟",
};

const DICTS: Record<Locale, Dict> = { ko, en, de, es, zh, ja, ar };

export function t(locale: Locale, key: keyof Dict, vars?: Record<string, string | number>): string {
  let str = DICTS[locale]?.[key] ?? DICTS.ko[key] ?? String(key);
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), String(v));
    }
  }
  return str;
}

export function getDir(locale: Locale): "ltr" | "rtl" {
  return RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}
