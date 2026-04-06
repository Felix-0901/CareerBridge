export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: '程式開發',
    skills: ['Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Node.js', 'SQL', 'Git', 'Java', 'C++', 'Flutter'],
  },
  {
    name: '設計',
    skills: ['Figma', 'Photoshop', 'Illustrator', 'Canva', 'UI/UX 設計', 'Wireframe', 'Prototype', '平面設計', '影片剪輯', 'Premiere Pro', 'After Effects'],
  },
  {
    name: '行銷',
    skills: ['社群經營', '文案撰寫', 'SEO', 'Google Analytics', 'Facebook 廣告', 'Google Ads', '內容行銷', '品牌策略', 'Email 行銷'],
  },
  {
    name: '商業',
    skills: ['專案管理', '簡報技巧', 'Excel', '數據分析', '市場調查', '商業分析', '財務分析', 'Notion', 'Jira'],
  },
  {
    name: '語言',
    skills: ['中文', '英文', '日文', '韓文', '商務英文', '翻譯'],
  },
  {
    name: '軟實力',
    skills: ['溝通能力', '團隊合作', '領導力', '時間管理', '問題解決', '創意思維', '批判性思考', '自學能力', '抗壓性'],
  },
];

export const interestAreas = [
  '科技業', '金融業', '行銷廣告', '設計創意', '媒體傳播',
  '教育培訓', '醫療健康', '社會服務', '零售餐飲', '製造業',
  '環境永續', '文化藝術', '運動休閒', '旅遊觀光', '法律政治',
  '非營利組織', '新創企業', '政府機關',
];

export interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
}

export const mockSkillGaps: SkillGap[] = [
  {
    skill: 'Excel 進階功能',
    currentLevel: 40,
    requiredLevel: 80,
    priority: 'high',
    suggestion: '推薦完成 Google 的 Excel 線上課程，約 10 小時可大幅提升',
  },
  {
    skill: '簡報結構與表達',
    currentLevel: 55,
    requiredLevel: 85,
    priority: 'high',
    suggestion: '練習使用 STAR 法則組織經歷，參加 TYS 的簡報工作坊',
  },
  {
    skill: '專案描述能力',
    currentLevel: 30,
    requiredLevel: 75,
    priority: 'high',
    suggestion: '在履歷中加入量化數據，例如「參與人數」「完成時間」「成效指標」',
  },
  {
    skill: '數據分析基礎',
    currentLevel: 25,
    requiredLevel: 60,
    priority: 'medium',
    suggestion: '從 Google Data Analytics Certificate 入門，免費且有認證',
  },
  {
    skill: '英文商務溝通',
    currentLevel: 50,
    requiredLevel: 70,
    priority: 'medium',
    suggestion: '每天花 15 分鐘練習 Business English Pod，3 個月可見效',
  },
];

export interface RadarData {
  subject: string;
  value: number;
  fullMark: number;
}

export const mockRadarData: RadarData[] = [
  { subject: '技術能力', value: 65, fullMark: 100 },
  { subject: '溝通表達', value: 78, fullMark: 100 },
  { subject: '活動企劃', value: 82, fullMark: 100 },
  { subject: '設計能力', value: 45, fullMark: 100 },
  { subject: '分析能力', value: 55, fullMark: 100 },
  { subject: '領導能力', value: 70, fullMark: 100 },
];
