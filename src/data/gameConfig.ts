export type Language = 'en' | 'cn';
// 👈 新增了 'link' 类型
export type ClueType = 'text' | 'image' | 'audio' | 'image-text' | 'link';

export interface Clue {
  stage: number;
  type: ClueType;
  content: { en: string; cn: string };
  caption?: { en: string; cn: string }; 
  url?: string; // 👈 新增：专门用来放外部链接的网址
  answer: string;
}

export interface Route {
  id: string;
  name: { en: string; cn: string };
  clues: Clue[];
}

// 包含了你提供的所有正确答案（你之后可以再往里塞十几个干扰项凑够30个）
export const validLocations = [
  "Audi1", "Audi2", "Acacia", "Bus Stop", "Berlin Wall", "ERC Tembusu Tree",
   "Fine Food", "Flavors", "Gym","Hwangs", "Jollibee",
  "NUS Letters", "NUS-Yale Library", "Octobox", "RC4", 
  "Sports Hall 1", "Sports Hall 2","Starbucks", "SRC", "Tembusu", "Utown Green", "Udon bar", "Waa Cow"
];

export const gameData: Record<string, Route> = {
  // 1. 学生线 (Student)
  student: {
    id: 'student',
    name: { en: 'Student Route', cn: '学生线' },
    clues: [
      { stage: 1, type: 'image', content: { en: '/images/....jpg', cn: '/images/P1C1.jpg' }, answer: 'Audi2' },
      { stage: 2, type: 'image', content: { en: '/images/student-2.jpg', cn: '/images/P1C2.jpg' }, answer: 'Flavors' },
      // 之前的 stage 1 和 stage 2 保持不变...
      { 
        stage: 3, 
        type: 'link', 
        // 这里放对这个链接的文字描述
        content: { en: 'A mysterious website holds the key...', cn: 'NPC: 我喜欢的学长凯撒给我发了这个文件说中午这里见...但是是什么意思呢？' }, 
        // 👇 把你要玩家点击的真实链接填在这里（记得带上 https://）
        url: 'https://docs.google.com/document/d/1Mu4G628oPygG_Vo3j8iwbu3COFq9hdDf/edit?usp=drive_link&ouid=112848174310227570911&rtpof=true&sd=true', 
        answer: 'Sports Hall 1' 
      },
      // 之后的 stage 4 和 stage 5 保持不变...
      { stage: 4, type: 'image', content: { en: '/images/student-4.jpg', cn: '/images/P1C4.jpg' }, answer: 'RC4' },
      { stage: 5, type: 'image-text', 
        content: { en: '/images/student-5.jpg', cn: '/images/P1C5.jpg' }, 
        caption: { en: 'A hidden message in the image...', cn: 'Hint：发我email的人头像是个黑8...这会是个突破点吗？' },
        answer: 'NUS Letters' }
    ]
  },
  
  // 2. 员工线 (Staff)
  staff: {
    id: 'staff',
    name: { en: 'Staff Route', cn: '员工线' },
    clues: [
      { stage: 1, type: 'image', content: { en: '/images/staff-1.jpg', cn: '/images/P2C1.jpg' }, answer: 'Audi1' },
      { stage: 2, type: 'image', content: { en: '/images/staff-2.jpg', cn: '/images/P2C2.jpg' }, answer: 'Gym' },
      { stage: 3, type: 'image', content: { en: '/images/staff-3.jpg', cn: '/images/P2C3.jpg' }, answer: 'NUS-Yale Library'},
      { stage: 4, type: 'image', content: { en: '/images/staff-4.jpg', cn: '/images/P2C4.jpg' }, answer: 'Starbucks' },
      { stage: 5, type: 'audio', content: { en: '/audio/staff-5.mp3', cn: '/audio/P2C5.mp3' }, answer: 'NUS Letters' }
    ]
  },

  // 3. 校友线 (Alumni)
  alumni: {
    id: 'alumni',
    name: { en: 'Alumni Route', cn: '校友线' },
    clues: [
      { stage: 1, type: 'image', content: { en: '/images/alumni-1.jpg', cn: '/images/P3C1.jpg' }, answer: 'Berlin Wall' },
      { stage: 2, type: 'image', content: { en: '/images/alumni-2.jpg', cn: '/images/P3C2.jpg' }, answer: 'ERC Tembusu Tree' },
      { stage: 3, type: 'text', content: { en: 'Text clue here...', cn: '我已经毕业20年啦...NUS变了好多，记得那时候Yale和NUS有个合作项目，还建了个图书馆，我都没去过，太可惜了' }, answer: 'NUS-Yale Library' },
      { stage: 4, type: 'image', content: { en: '/images/alumni-4.jpg', cn: '/images/P3C4.jpg' }, answer: 'Fine Food' },
      { stage: 5, type: 'image', content: { en: '/images/alumni-5.jpg', cn: '/images/P3C5.jpg' }, answer: 'NUS Letters' }
    ]
  },

  // 4. 游客线 (Tourist)
  tourist: {
    id: 'tourist',
    name: { en: 'Tourist Route', cn: '游客线' },
    clues: [
      { stage: 1, type: 'audio', content: { en: '/audio/tourist-1.mp3', cn: '/audio/P4C1.mp3' }, answer: 'Bus Stop' },
      { stage: 2, type: 'image', content: { en: '/images/tourist-2.jpg', cn: '/images/P4C2.jpg' }, answer: 'Utown Green' },
      { stage: 3, type: 'image', content: { en: '/images/tourist-3.jpg', cn: '/images/P4C3.jpg' }, answer: 'NUS-Yale Library' },
      { stage: 4, type: 'image', content: { en: '/images/tourist-4.jpg', cn: '/images/P4C4.jpg' }, answer: 'Hwangs' },
      { stage: 5, type: 'image', content: { en: '/images/tourist-5.jpg', cn: '/images/P4C5.jpg' }, answer: 'NUS Letters' }
    ]
  }
};