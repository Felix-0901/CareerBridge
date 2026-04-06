export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: '林同學',
    role: '大學三年級・行銷系',
    avatar: 'L',
    content: '以前投了十幾份履歷都沒回音，用 CareerBridge 分析後才發現我的履歷缺少量化成果。修改後兩週就收到面試通知！',
    rating: 5,
  },
  {
    id: 'test-2',
    name: '陳同學',
    role: '高中三年級',
    avatar: 'C',
    content: '完全不知道自己適合什麼，CareerBridge 幫我找到方向，還推薦我去 TYS 做職涯諮詢。現在知道大學要選什麼了。',
    rating: 5,
  },
  {
    id: 'test-3',
    name: '王同學',
    role: '剛畢業社會新鮮人',
    avatar: 'W',
    content: '匹配分數讓我不再亂投履歷了，專注投高匹配的職缺，成功率變高很多。技能落差分析也很實用。',
    rating: 4,
  },
  {
    id: 'test-4',
    name: '張同學',
    role: '大學二年級・資工系',
    avatar: 'Z',
    content: '白話版的職缺說明幫了大忙！以前看到職缺描述都看不太懂，現在可以快速判斷適不適合自己。',
    rating: 5,
  },
  {
    id: 'test-5',
    name: '李同學',
    role: '大學四年級・外文系',
    avatar: 'L',
    content: '面試準備助理幫我預測了面試題目，結果真的被問到類似的問題！準備起來更有信心。',
    rating: 5,
  },
];
