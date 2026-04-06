export interface Resource {
  id: string;
  name: string;
  type: '諮詢' | '職缺' | '講座' | '就服' | '補助';
  description: string;
  services: string[];
  targetAudience: string[];
  location: string;
  website: string;
  howToApply: string;
  aiRecommendation: string;
  icon: string;
}

export const resources: Resource[] = [
  {
    id: 'res-1',
    name: '臺北青年職涯發展中心（TYS）',
    type: '諮詢',
    description: '提供青年一站式職涯發展服務，包含職涯諮詢、履歷健診、模擬面試及職涯成長講座。',
    services: ['一對一職涯諮詢', '履歷健診', '模擬面試', '職涯測評', '職涯成長講座', '職場體驗實習', '職前先修班'],
    targetAudience: ['15-29 歲青年', '應屆畢業生', '待業青年', '轉職者'],
    location: '台北市中正區',
    website: 'https://tys.gov.taipei',
    howToApply: '線上預約或電話預約，免費服務',
    aiRecommendation: '如果你「不知道自己適合什麼」，建議優先預約 TYS 一對一職涯諮詢。專業顧問會幫你釐清方向。',
    icon: 'compass',
  },
  {
    id: 'res-2',
    name: '臺北青年職涯發展平臺',
    type: '職缺',
    description: '青年局打造的線上平臺，彙整實習與青年職缺資訊，方便搜尋與投遞。',
    services: ['實習職缺搜尋', '職缺投遞', '企業媒合'],
    targetAudience: ['大學生', '研究生', '社會新鮮人'],
    location: '線上平台',
    website: 'https://youth.gov.taipei',
    howToApply: '直接線上瀏覽與投遞',
    aiRecommendation: '你已經具備基本條件，可以直接到平臺搜尋適合的實習職缺。建議搭配本平台的匹配分析再投遞。',
    icon: 'briefcase',
  },
  {
    id: 'res-3',
    name: '青年創新職場實習職缺專區',
    type: '職缺',
    description: '彙整參與補助機制的企業實習職缺，部分職缺享有政府津貼補助。',
    services: ['補助實習職缺', '津貼資訊', '企業資訊'],
    targetAudience: ['大學生', '研究生'],
    location: '線上平台',
    website: 'https://youth.gov.taipei/internship',
    howToApply: '線上報名，依各職缺規定',
    aiRecommendation: '想找有政府補助的實習機會嗎？這裡的職缺通常有額外津貼，CP 值更高。',
    icon: 'award',
  },
  {
    id: 'res-4',
    name: '臺北市就業服務處',
    type: '就服',
    description: '提供完整就業媒合服務，包含求職登記、就業諮商、職業心理測驗及就業媒合。',
    services: ['求職登記', '就業媒合', '就業諮商', '職業心理測驗', '就業促進研習'],
    targetAudience: ['一般求職者', '社會新鮮人', '中高齡求職者', '失業者'],
    location: '台北市各就服站',
    website: 'https://eso.gov.taipei',
    howToApply: '親臨各就業服務站或線上登記',
    aiRecommendation: '如果你需要更深入的就業諮商，或想做職業性向測驗，就服處是最完整的選擇。',
    icon: 'building',
  },
  {
    id: 'res-5',
    name: '就業服務站',
    type: '就服',
    description: '分布在台北各區的就業服務據點，提供就近的求職服務。',
    services: ['求職登記', '就業媒合', '職業訓練諮詢', '就業促進活動'],
    targetAudience: ['所有求職者'],
    location: '台北市各區',
    website: 'https://eso.gov.taipei/stations',
    howToApply: '直接前往最近的服務站',
    aiRecommendation: '你的住家或學校附近可能就有就業服務站，可以就近尋求專業協助。',
    icon: 'map-pin',
  },
  {
    id: 'res-6',
    name: '青年跨域就業促進補助',
    type: '補助',
    description: '提供青年跨區就業的交通與租屋補助，降低異地工作的門檻。',
    services: ['跨域就業交通補助', '租屋補助', '搬遷補助'],
    targetAudience: ['18-29 歲跨區就業青年'],
    location: '線上申請',
    website: 'https://eso.gov.taipei/subsidy',
    howToApply: '符合資格者可線上申請',
    aiRecommendation: '找到的理想職缺不在住家附近？可以申請跨域就業補助，政府幫你出交通費和租屋費。',
    icon: 'wallet',
  },
];
