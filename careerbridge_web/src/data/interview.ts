export interface InterviewQuestion {
  id: string;
  question: string;
  category: '基本題' | '行為題' | '情境題' | '專業題';
  difficulty: 'easy' | 'medium' | 'hard';
  suggestedAnswer: string;
  tips: string;
  isStarred?: boolean;
}

export const mockInterviewQuestions: InterviewQuestion[] = [
  {
    id: 'iq-1',
    question: '請用 60 秒介紹你自己',
    category: '基本題',
    difficulty: 'easy',
    suggestedAnswer: '我是○○大學○○系的學生，對行銷領域有高度興趣。在校期間擔任攝影社公關長，負責社群經營，將追蹤人數提升 40%。也曾參與青年創業論壇志工，服務超過 200 位參與者。我希望透過這次實習，將社群經營能力運用在實際商業場景中。',
    tips: '結構：學歷背景 → 相關經歷 → 動機與期待。控制在 60 秒，提前練習計時。',
  },
  {
    id: 'iq-2',
    question: '為什麼想應徵這個職位？',
    category: '基本題',
    difficulty: 'easy',
    suggestedAnswer: '我一直對社群行銷很有興趣，在社團中也累積了實際經營的經驗。貴公司專注於數位行銷，我認為能學到更多專業技術，同時貢獻我在社群和文案方面的能力。',
    tips: '要具體提到公司的特點，不要說「因為你們公司很有名」這種太空泛的答案。',
  },
  {
    id: 'iq-3',
    question: '請分享一個你遇到困難並解決的經歷',
    category: '行為題',
    difficulty: 'medium',
    suggestedAnswer: '在擔任公關長期間，社團面臨招生人數下滑的問題。我分析了社群數據後，發現貼文時間和內容方向需要調整。我重新規劃了內容策略，改用短影音形式，並調整了發布時間。一個月後追蹤人數成長了 25%，招生報名也增加了三成。',
    tips: '用 STAR 法則：Situation → Task → Action → Result。記得加入量化數據。',
    isStarred: true,
  },
  {
    id: 'iq-4',
    question: '你覺得好的社群貼文應該具備什麼要素？',
    category: '專業題',
    difficulty: 'medium',
    suggestedAnswer: '我認為好的社群貼文需要：吸引注意的開頭（前 3 秒）、清楚的價值傳遞、適合平台的格式、以及明確的行動呼籲。另外，視覺品質和發布時間也很重要。',
    tips: '結合實際案例說明，展現你有實務觀察力。',
  },
  {
    id: 'iq-5',
    question: '如果你的企劃被主管退回，你會怎麼做？',
    category: '情境題',
    difficulty: 'medium',
    suggestedAnswer: '我會先了解被退回的具體原因，記下主管的回饋重點。然後重新檢視企劃，根據回饋做修改。如果有不確定的地方，會主動詢問主管或同事，確認方向正確後再提案。',
    tips: '展現你願意接受回饋、有改進的態度，而不是否定主管的判斷。',
    isStarred: true,
  },
  {
    id: 'iq-6',
    question: '你有什麼問題想問我們？',
    category: '基本題',
    difficulty: 'easy',
    suggestedAnswer: '我想了解：1. 實習生日常的工作內容和一天的時間安排 2. 團隊目前最重視的專案方向 3. 表現好的話有轉正的機會嗎？',
    tips: '至少準備 2-3 個問題，展現你對這份工作是認真的。避免問薪水和假期。',
  },
];

export const selfIntroTemplate = `我是○○大學○○系○年級的 [姓名]。

在校期間，我最具代表性的經歷是 [經歷1]，在其中我負責 [具體職責]，達成了 [量化成果]。

此外，我也參與過 [經歷2]，培養了 [相關能力]。

我對 [目標領域] 很有興趣，希望透過這次 [實習/工作] 機會，將所學應用在實際的商業場景中，同時向團隊學習更多專業技能。`;
