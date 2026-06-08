// PawType-16 진단 문항 & 매칭 로직 (Big Five 4축 단순화 버전)
// 4개 축: Energy(E/L), Sociability(S/I), Agreeableness(A/D), Calmness(C/N)
// 결과 코드 예: ESAC / LIDN ...

export type Axis = "E" | "S" | "A" | "C"; // High side letters
export type AxisScore = { E: number; S: number; A: number; C: number };

export type Question = {
  id: string;
  part: "owner" | "pet";
  text: (petName: string) => string;
  axis: Axis;
  options: { label: string; emoji: string; value: number }[]; // value: -2 ~ +2
};

export const OWNER_QUESTIONS: Question[] = [
  {
    id: "o1",
    part: "owner",
    axis: "E",
    text: () => "주말에 더 끌리는 쪽은?",
    options: [
      { emoji: "🏞", label: "밖에서 활동적인 하루", value: 2 },
      { emoji: "☕", label: "사람 많은 카페", value: 1 },
      { emoji: "🛋", label: "집에서 조용한 휴식", value: -1 },
      { emoji: "📚", label: "혼자만의 깊은 몰입", value: -2 },
    ],
  },
  {
    id: "o2",
    part: "owner",
    axis: "S",
    text: () => "새로운 모임에 가면 나는?",
    options: [
      { emoji: "🎉", label: "먼저 말 걸며 분위기 메이커", value: 2 },
      { emoji: "🤝", label: "자연스럽게 어울린다", value: 1 },
      { emoji: "👀", label: "분위기 보고 천천히", value: -1 },
      { emoji: "🙈", label: "익숙한 사람 옆에 머문다", value: -2 },
    ],
  },
  {
    id: "o3",
    part: "owner",
    axis: "A",
    text: () => "친구가 갑자기 부탁을 하면?",
    options: [
      { emoji: "💝", label: "거의 다 들어준다", value: 2 },
      { emoji: "😊", label: "가능하면 도와준다", value: 1 },
      { emoji: "🤔", label: "상황 보고 결정", value: -1 },
      { emoji: "🙅", label: "내 일정이 우선", value: -2 },
    ],
  },
  {
    id: "o4",
    part: "owner",
    axis: "C",
    text: () => "예상치 못한 일이 생기면?",
    options: [
      { emoji: "🧘", label: "차분히 대처한다", value: 2 },
      { emoji: "🙂", label: "당황해도 금세 안정", value: 1 },
      { emoji: "😣", label: "마음이 한참 시끄럽다", value: -1 },
      { emoji: "😱", label: "쉽게 불안해진다", value: -2 },
    ],
  },
  {
    id: "o5",
    part: "owner",
    axis: "E",
    text: () => "산책·운동을 얼마나 즐기나요?",
    options: [
      { emoji: "🏃", label: "매일 움직여야 한다", value: 2 },
      { emoji: "🚶", label: "주 3~4회 정도", value: 1 },
      { emoji: "🐢", label: "가끔 생각날 때", value: -1 },
      { emoji: "💤", label: "되도록 안 움직이고 싶다", value: -2 },
    ],
  },
  {
    id: "o6",
    part: "owner",
    axis: "S",
    text: () => "낯선 강아지가 다가오면?",
    options: [
      { emoji: "🥰", label: "반갑게 인사한다", value: 2 },
      { emoji: "😊", label: "조심스럽게 다가간다", value: 1 },
      { emoji: "😐", label: "거리를 둔다", value: -1 },
      { emoji: "😶", label: "피하는 편", value: -2 },
    ],
  },
  {
    id: "o7",
    part: "owner",
    axis: "A",
    text: () => "다른 사람과 의견이 다를 때?",
    options: [
      { emoji: "🤗", label: "상대 입장을 먼저 듣는다", value: 2 },
      { emoji: "🙂", label: "부드럽게 조율한다", value: 1 },
      { emoji: "💬", label: "내 의견을 분명히 말한다", value: -1 },
      { emoji: "💥", label: "끝까지 설득한다", value: -2 },
    ],
  },
  {
    id: "o8",
    part: "owner",
    axis: "C",
    text: () => "할 일이 쌓이면?",
    options: [
      { emoji: "📋", label: "하나씩 차분히 처리", value: 2 },
      { emoji: "✅", label: "리스트 만들어 정리", value: 1 },
      { emoji: "😵", label: "마음만 급해진다", value: -1 },
      { emoji: "🌪", label: "스트레스에 휩쓸린다", value: -2 },
    ],
  },
  {
    id: "o9",
    part: "owner",
    axis: "E",
    text: () => "새로운 장소에 가는 건?",
    options: [
      { emoji: "✨", label: "언제나 신난다", value: 2 },
      { emoji: "😄", label: "기대되는 편", value: 1 },
      { emoji: "😐", label: "익숙한 곳이 좋다", value: -1 },
      { emoji: "😶", label: "되도록 가던 곳", value: -2 },
    ],
  },
  {
    id: "o10",
    part: "owner",
    axis: "S",
    text: () => "긴 여행, 누구와 가고 싶나요?",
    options: [
      { emoji: "👥", label: "여러 친구들과 와글와글", value: 2 },
      { emoji: "👫", label: "친한 친구 한 명", value: 1 },
      { emoji: "🧍", label: "혼자 조용히", value: -1 },
      { emoji: "🏠", label: "여행 자체가 부담", value: -2 },
    ],
  },
  {
    id: "o11",
    part: "owner",
    axis: "A",
    text: () => "반려동물 훈련 스타일은?",
    options: [
      { emoji: "🍪", label: "칭찬·간식 중심 부드럽게", value: 2 },
      { emoji: "🤝", label: "교감 위주로", value: 1 },
      { emoji: "📏", label: "규칙은 분명하게", value: -1 },
      { emoji: "🎯", label: "기준은 엄격하게", value: -2 },
    ],
  },
  {
    id: "o12",
    part: "owner",
    axis: "C",
    text: () => "잠들기 전 내 머릿속은?",
    options: [
      { emoji: "🌙", label: "거의 비어 있다", value: 2 },
      { emoji: "😌", label: "잔잔한 편", value: 1 },
      { emoji: "💭", label: "이런저런 생각이 많다", value: -1 },
      { emoji: "🌀", label: "걱정이 자주 맴돈다", value: -2 },
    ],
  },
];

export const PET_QUESTIONS: Question[] = [
  {
    id: "p1",
    part: "pet",
    axis: "E",
    text: (n) => `${n}의 평소 활동량은?`,
    options: [
      { emoji: "🚀", label: "에너자이저, 늘 활발", value: 2 },
      { emoji: "🐕", label: "산책·놀이 좋아함", value: 1 },
      { emoji: "🛌", label: "쉬는 시간이 더 많음", value: -1 },
      { emoji: "💤", label: "대부분 자고 있음", value: -2 },
    ],
  },
  {
    id: "p2",
    part: "pet",
    axis: "S",
    text: (n) => `${n}은 모르는 사람이 오면?`,
    options: [
      { emoji: "🐶", label: "반갑게 다가간다", value: 2 },
      { emoji: "👀", label: "관찰하다 다가간다", value: 1 },
      { emoji: "😐", label: "거리를 둔다", value: -1 },
      { emoji: "🙈", label: "짖거나 숨는다", value: -2 },
    ],
  },
  {
    id: "p3",
    part: "pet",
    axis: "A",
    text: (n) => `${n}은 다른 동물과 만나면?`,
    options: [
      { emoji: "🤗", label: "꼬리치며 친근하게", value: 2 },
      { emoji: "🐾", label: "조심스럽게 어울림", value: 1 },
      { emoji: "😼", label: "경계하는 편", value: -1 },
      { emoji: "💢", label: "공격적으로 반응", value: -2 },
    ],
  },
  {
    id: "p4",
    part: "pet",
    axis: "C",
    text: (n) => `천둥·청소기 등 큰 소리에 ${n}은?`,
    options: [
      { emoji: "😎", label: "거의 신경 안 씀", value: 2 },
      { emoji: "🙂", label: "잠깐 놀라고 안정", value: 1 },
      { emoji: "😟", label: "한참 불안해함", value: -1 },
      { emoji: "😱", label: "심하게 떨거나 숨음", value: -2 },
    ],
  },
  {
    id: "p5",
    part: "pet",
    axis: "E",
    text: (n) => `${n}은 산책을 어떻게 즐기나요?`,
    options: [
      { emoji: "💨", label: "끝없이 뛰고 싶어함", value: 2 },
      { emoji: "🐕‍🦺", label: "꾸준히 잘 걷는다", value: 1 },
      { emoji: "🐌", label: "금방 지친다", value: -1 },
      { emoji: "🏠", label: "산책을 별로 안 즐김", value: -2 },
    ],
  },
  {
    id: "p6",
    part: "pet",
    axis: "S",
    text: (n) => `새로운 환경에서 ${n}은?`,
    options: [
      { emoji: "🔎", label: "신나서 탐험", value: 2 },
      { emoji: "👃", label: "냄새 맡으며 적응", value: 1 },
      { emoji: "😶", label: "한참 망설인다", value: -1 },
      { emoji: "🚪", label: "되돌아가고 싶어함", value: -2 },
    ],
  },
  {
    id: "p7",
    part: "pet",
    axis: "A",
    text: (n) => `${n}은 가족과의 스킨십을?`,
    options: [
      { emoji: "💞", label: "정말 좋아한다", value: 2 },
      { emoji: "😊", label: "잠깐씩 즐긴다", value: 1 },
      { emoji: "🤷", label: "그닥 좋아하지 않음", value: -1 },
      { emoji: "🙅", label: "거의 거부한다", value: -2 },
    ],
  },
  {
    id: "p8",
    part: "pet",
    axis: "C",
    text: (n) => `${n}은 혼자 있을 때?`,
    options: [
      { emoji: "🛋", label: "차분히 잘 지냄", value: 2 },
      { emoji: "🙂", label: "잠시 후 안정", value: 1 },
      { emoji: "😢", label: "낑낑대거나 불안해함", value: -1 },
      { emoji: "💥", label: "물건을 망가뜨림", value: -2 },
    ],
  },
  {
    id: "p9",
    part: "pet",
    axis: "E",
    text: (n) => `${n}은 장난감을 보면?`,
    options: [
      { emoji: "🎾", label: "끝없이 놀자고 함", value: 2 },
      { emoji: "🧸", label: "잘 갖고 논다", value: 1 },
      { emoji: "🤔", label: "잠깐 흥미만", value: -1 },
      { emoji: "💤", label: "별 관심 없음", value: -2 },
    ],
  },
  {
    id: "p10",
    part: "pet",
    axis: "S",
    text: (n) => `${n}은 손님이 오면?`,
    options: [
      { emoji: "🎊", label: "꼬리치며 환영", value: 2 },
      { emoji: "👋", label: "조심스럽게 인사", value: 1 },
      { emoji: "🙄", label: "무관심", value: -1 },
      { emoji: "🚪", label: "방으로 숨는다", value: -2 },
    ],
  },
  {
    id: "p11",
    part: "pet",
    axis: "A",
    text: (n) => `${n}은 자기 물건을 다른 동물이 만지면?`,
    options: [
      { emoji: "🤝", label: "잘 공유한다", value: 2 },
      { emoji: "🙂", label: "괜찮은 편", value: 1 },
      { emoji: "😾", label: "신경질적", value: -1 },
      { emoji: "💢", label: "강하게 지킨다", value: -2 },
    ],
  },
  {
    id: "p12",
    part: "pet",
    axis: "C",
    text: (n) => `${n}의 평소 감정 변화는?`,
    options: [
      { emoji: "🌞", label: "거의 일정하다", value: 2 },
      { emoji: "🙂", label: "대체로 안정적", value: 1 },
      { emoji: "🌥", label: "기분 변화가 잦다", value: -1 },
      { emoji: "🌩", label: "예민하고 변덕스러움", value: -2 },
    ],
  },
  {
    id: "p13",
    part: "pet",
    axis: "E",
    text: (n) => `${n}은 새로운 장난감·간식이 생기면?`,
    options: [
      { emoji: "✨", label: "흥분해서 달려든다", value: 2 },
      { emoji: "😋", label: "기쁘게 받아들임", value: 1 },
      { emoji: "🤨", label: "조심스럽게 확인", value: -1 },
      { emoji: "🙄", label: "관심 없어함", value: -2 },
    ],
  },
];

export const ALL_QUESTIONS: Question[] = [...OWNER_QUESTIONS, ...PET_QUESTIONS];

export type Answers = Record<string, number>;

export function computeScores(
  answers: Answers,
  questions: Question[]
): AxisScore {
  const sums: AxisScore = { E: 0, S: 0, A: 0, C: 0 };
  const counts: AxisScore = { E: 0, S: 0, A: 0, C: 0 };
  for (const q of questions) {
    const v = answers[q.id];
    if (typeof v === "number") {
      sums[q.axis] += v;
      counts[q.axis] += 1;
    }
  }
  // Normalize to -100 ~ +100
  const norm = (s: number, c: number) => (c === 0 ? 0 : Math.round((s / (c * 2)) * 100));
  return {
    E: norm(sums.E, counts.E),
    S: norm(sums.S, counts.S),
    A: norm(sums.A, counts.A),
    C: norm(sums.C, counts.C),
  };
}

export function toCode(score: AxisScore): string {
  return (
    (score.E >= 0 ? "E" : "L") +
    (score.S >= 0 ? "S" : "I") +
    (score.A >= 0 ? "A" : "D") +
    (score.C >= 0 ? "C" : "N")
  );
}

const TYPE_NAMES: Record<string, { owner: string; pet: string }> = {
  ESAC: { owner: "활발한 사교형 보호자", pet: "호기심 많은 탐험가형" },
  ESAN: { owner: "다정한 분위기 메이커", pet: "감수성 풍부한 사교파" },
  ESDC: { owner: "쾌활한 리더형", pet: "당당한 인기쟁이" },
  ESDN: { owner: "에너지 폭발 자유인", pet: "장난기 가득 개구쟁이" },
  EIAC: { owner: "느긋한 모험가", pet: "신중한 탐험가" },
  EIAN: { owner: "감성적 활동가", pet: "예민한 산책왕" },
  EIDC: { owner: "독립적 행동파", pet: "마이웨이 모험가" },
  EIDN: { owner: "다이내믹 외톨이", pet: "에너지 가득 독립견" },
  LSAC: { owner: "따뜻한 동반자형", pet: "온순한 애교쟁이" },
  LSAN: { owner: "감성 충만 친구", pet: "여린 마음의 애교덩이" },
  LSDC: { owner: "차분한 사교가", pet: "도도한 사회성 보유자" },
  LSDN: { owner: "예민한 분위기파", pet: "변덕스러운 인싸" },
  LIAC: { owner: "사색하는 다정러", pet: "조용한 천사" },
  LIAN: { owner: "섬세한 관찰자", pet: "수줍은 감성둥이" },
  LIDC: { owner: "독립적 사색가", pet: "조용한 마이웨이" },
  LIDN: { owner: "예민한 은둔형", pet: "조심성 많은 신중파" },
};

export function typeNameOf(code: string, target: "owner" | "pet"): string {
  return TYPE_NAMES[code]?.[target] ?? (target === "owner" ? "균형형 보호자" : "균형형 반려동물");
}

export type MatchResult = {
  score: number; // 0~100
  title: string; // ex. 활기찬 탐험 콤비
  emoji: string;
  strengths: string[];
  cautions: string[];
  activities: string[];
};

export function matchScore(o: AxisScore, p: AxisScore): MatchResult {
  // 1) 활동성(E)·사교성(S): 유사할수록 ↑  → similarity
  // 2) 보호자 신경증(낮은 C) × 반려동물 침착성(높은 C) 보완 가산
  // 3) 친화성(A): 둘 다 높을수록 보너스
  const simE = 100 - Math.abs(o.E - p.E) / 2; // 0~100
  const simS = 100 - Math.abs(o.S - p.S) / 2;
  const aBonus = Math.max(0, (o.A + p.A) / 4); // 0~50
  const cComplement = o.C < 0 && p.C > 0 ? 10 : 0; // 보완 가산
  const cSim = 100 - Math.abs(o.C - p.C) / 2;

  const raw =
    simE * 0.3 + simS * 0.3 + cSim * 0.2 + aBonus * 0.4 + cComplement;
  const score = Math.max(40, Math.min(99, Math.round(raw)));

  // 타이틀 결정 — 활동·사교 평균
  const energy = (o.E + p.E) / 2;
  const social = (o.S + p.S) / 2;
  let title = "균형 잡힌 다정 콤비";
  let emoji = "💛";

  if (energy > 25 && social > 25) {
    title = "활기찬 탐험 콤비";
    emoji = "🔥";
  } else if (energy > 25 && social <= 25) {
    title = "에너제틱 자유 콤비";
    emoji = "⚡";
  } else if (energy <= 25 && social > 25) {
    title = "포근한 사교 콤비";
    emoji = "🤗";
  } else if (energy <= -25 && social <= -25) {
    title = "조용한 힐링 콤비";
    emoji = "🌙";
  } else if (energy <= -25 && social > -25) {
    title = "느긋한 동반자 콤비";
    emoji = "☕";
  }

  const strengths: string[] = [];
  const cautions: string[] = [];
  const activities: string[] = [];

  if (Math.abs(o.E - p.E) < 40)
    strengths.push("활동량 코드가 잘 맞아 산책·놀이가 즐거워요");
  if (Math.abs(o.S - p.S) < 40)
    strengths.push("새로운 자극에 대한 반응이 비슷해요");
  if (o.A > 0 && p.A > 0)
    strengths.push("둘 다 친화적이라 따뜻한 교감이 자연스러워요");

  if (o.E > 40 && p.E > 40)
    cautions.push("둘 다 흥분도가 높아 자극이 과해질 수 있어요");
  if (o.C < 0 && p.C < 0)
    cautions.push("둘 다 예민할 때가 있어 차분한 루틴이 필요해요");
  if (Math.abs(o.S - p.S) >= 60)
    cautions.push("사회성 차이가 커서 외출·손님 응대 시 페이스 조절이 중요해요");

  if (energy > 0) {
    activities.push("🥾 새로운 산책 코스 주 1회 개척");
    activities.push("🧩 노즈워크·퍼즐 토이로 두뇌 자극");
  } else {
    activities.push("🛋 함께하는 느긋한 휴식 루틴 만들기");
    activities.push("🧶 차분한 실내 놀이(노즈워크·터그)");
  }
  if (social > 0) activities.push("🏞 도그런·반려동물 동반 카페 탐방");
  else activities.push("🌿 조용한 시간대 산책으로 부담 줄이기");

  if (strengths.length === 0) strengths.push("서로 다른 점을 배우며 균형을 맞춰가는 사이예요");
  if (cautions.length === 0) cautions.push("큰 충돌 요인은 적어요, 지금처럼만!");

  return { score, title, emoji, strengths, cautions, activities };
}
