export interface UserProfile {
  type: '高中生' | '大學生' | '社會新鮮人';
  interests: string[];
  skills: string[];
  experiences: Experience[];
  resumeCompleteness: number;
  strengths: string[];
  suitableRoles: string[];
  resumeGaps: string[];
  highlights: string[];
  nextSteps: NextStep[];
}

export interface Experience {
  title: string;
  organization: string;
  duration: string;
  description: string;
}

export interface NextStep {
  action: string;
  priority: 'high' | 'medium' | 'low';
  timeEstimate: string;
  resource?: string;
}

export const mockUserProfile: UserProfile = {
  type: '大學生',
  interests: ['行銷廣告', '科技業', '設計創意'],
  skills: ['社群經營', '文案撰寫', 'Canva', '簡報技巧', 'Python 初階', 'Excel 基礎'],
  experiences: [
    {
      title: '社團公關長',
      organization: '校園攝影社',
      duration: '2024.09 - 2025.06',
      description: '負責社團對外宣傳、活動攝影記錄與社群經營，追蹤人數成長 40%',
    },
    {
      title: '活動志工',
      organization: '台北市青年創業論壇',
      duration: '2025.03',
      description: '協助活動場控與報名引導，服務超過 200 位參與者',
    },
    {
      title: '課程專題',
      organization: '行銷管理課',
      duration: '2025.04 - 2025.06',
      description: '完成品牌分析專題報告，獲得全班最佳專題',
    },
  ],
  resumeCompleteness: 65,
  strengths: ['溝通表達', '活動企劃', '社群經營', '基礎設計', 'Python 初階'],
  suitableRoles: ['行銷實習', '內容企劃', '社群經營', '初階資料分析助理'],
  resumeGaps: ['缺少量化成果', '專案描述不夠具體', '缺少工具熟練度描述', '自我介紹過於籠統'],
  highlights: [
    '社團經營期間社群追蹤人數成長 40%，展現社群經營能力',
    '曾服務 200+ 人的大型活動，具備活動執行經驗',
    '行銷專題獲得最佳評價，顯示商業分析潛力',
  ],
  nextSteps: [
    {
      action: '修改履歷：加入量化數據與具體成果',
      priority: 'high',
      timeEstimate: '2 小時',
      resource: 'TYS 履歷健診',
    },
    {
      action: '優先投遞 3 個高匹配的行銷相關實習',
      priority: 'high',
      timeEstimate: '1 小時',
    },
    {
      action: '預約 TYS 一對一職涯諮詢，確認方向',
      priority: 'medium',
      timeEstimate: '預約後約 50 分鐘',
      resource: 'TYS 職涯諮詢',
    },
    {
      action: '用 Canva 建立一份簡單的作品集頁面',
      priority: 'medium',
      timeEstimate: '3 小時',
    },
    {
      action: '練習 5 題常見行銷實習面試題',
      priority: 'low',
      timeEstimate: '1 小時',
    },
  ],
};

export interface DashboardStats {
  savedJobs: number;
  appliedJobs: number;
  interviews: number;
  offers: number;
  rejected: number;
  responseRate: number;
}

export const mockDashboardStats: DashboardStats = {
  savedJobs: 8,
  appliedJobs: 5,
  interviews: 2,
  offers: 1,
  rejected: 1,
  responseRate: 60,
};

export interface WeeklyTask {
  id: string;
  task: string;
  completed: boolean;
  dueDate: string;
  category: 'resume' | 'apply' | 'prepare' | 'learn';
}

export const mockWeeklyTasks: WeeklyTask[] = [
  { id: 't1', task: '修改履歷中社團經歷的描述', completed: true, dueDate: '週一', category: 'resume' },
  { id: 't2', task: '投遞「社群行銷實習生」職缺', completed: true, dueDate: '週二', category: 'apply' },
  { id: 't3', task: '投遞「內容企劃助理」職缺', completed: false, dueDate: '週三', category: 'apply' },
  { id: 't4', task: '練習自我介紹（60 秒版本）', completed: false, dueDate: '週四', category: 'prepare' },
  { id: 't5', task: '完成 Excel 進階教學第 1 章', completed: false, dueDate: '週五', category: 'learn' },
  { id: 't6', task: '預約 TYS 履歷健診', completed: false, dueDate: '週五', category: 'resume' },
];

export interface ApplicationRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'saved' | 'applied' | 'interview' | 'offered' | 'rejected';
  appliedDate?: string;
  matchScore: number;
}

export const mockApplications: ApplicationRecord[] = [
  { id: 'a1', jobId: 'job-1', jobTitle: '社群行銷實習生', company: '創意數位科技', status: 'interview', appliedDate: '2026-04-01', matchScore: 88 },
  { id: 'a2', jobId: 'job-3', jobTitle: '活動企劃助理', company: '台北市青年服務辦公室', status: 'applied', appliedDate: '2026-04-02', matchScore: 82 },
  { id: 'a3', jobId: 'job-6', jobTitle: '內容企劃助理', company: '好學教育平台', status: 'saved', matchScore: 79 },
  { id: 'a4', jobId: 'job-9', jobTitle: '社群小編', company: '青年創業社群', status: 'offered', appliedDate: '2026-03-28', matchScore: 85 },
  { id: 'a5', jobId: 'job-2', jobTitle: '前端開發實習生', company: '雲端創新', status: 'rejected', appliedDate: '2026-03-25', matchScore: 72 },
  { id: 'a6', jobId: 'job-7', jobTitle: '行政助理', company: '就業服務處', status: 'saved', matchScore: 90 },
  { id: 'a7', jobId: 'job-10', jobTitle: '人力資源實習生', company: '新創人才科技', status: 'applied', appliedDate: '2026-04-04', matchScore: 77 },
  { id: 'a8', jobId: 'job-4', jobTitle: '數據分析實習生', company: '未來金融科技', status: 'saved', matchScore: 65 },
];
