export interface GameConfig {
  // 游戏时长（秒）
  duration: number;
  // 难度递增参数
  difficultyParams: {
    startSpawnInterval: number;  // 初始生成间隔（秒）
    minSpawnInterval: number;    // 最小生成间隔（秒）
    spawnIntervalDecrease: number; // 每阶段减少的间隔（秒）
    penaltyRatio: number;        // 扣分物比例
    penaltyRatioIncrease: number; // 每阶段增加的扣分物比例
  };
  // 计分配置
  scoring: {
    bonusScore: number;    // 切中加分物得分
    penaltyScore: number;  // 切中扣分物扣分
    comboBonus: {
      [key: number]: number; // 连击数: 加分
    };
  };
  // 目标物配置
  target: {
    maxTargets: number;    // 最大同时存在的目标物数量
    flightTime: number;    // 目标物飞行时间（秒）
    gravity: number;       // 重力加速度
  };
  // 主题配置
  theme: {
    bonusTerms: string[];  // 加分物词条
    penaltyTerms: string[]; // 扣分物词条
    containerStyle: ContainerStyle;
  };
}

export interface ContainerStyle {
  type: 'bubble' | 'cloud' | 'note' | 'neon' | 'gift';
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  textColor: string;
}

// 预设主题配置
export const PRESET_THEMES = {
  worker: {
    name: '打工人发泄包',
    bonusTerms: ['加班', '开会', 'PPT', '改需求', '通勤', '周一', 'DDL', '周报', 'OKR', '996'],
    penaltyTerms: ['奖金', '放假', '摸鱼', '下班'],
    containerStyle: {
      type: 'note',
      width: 160,
      height: 100,
      fontSize: 36,
      fontFamily: 'system-ui',
      textColor: '#333333'
    }
  },
  student: {
    name: '学生解压包',
    bonusTerms: ['考试', '早八', '论文', '挂科', '点名', '体测'],
    penaltyTerms: ['周末', '外卖', '游戏', '奶茶'],
    containerStyle: {
      type: 'bubble',
      width: 150,
      height: 110,
      fontSize: 34,
      fontFamily: 'system-ui',
      textColor: '#333333'
    }
  },
  life: {
    name: '生活烦恼包',
    bonusTerms: ['焦虑', '失眠', '长胖', '掉发', '社交恐惧'],
    penaltyTerms: ['美食', '旅行', '运动', '好梦'],
    containerStyle: {
      type: 'cloud',
      width: 160,
      height: 110,
      fontSize: 34,
      fontFamily: 'system-ui',
      textColor: '#555555'
    }
  },
  emo: {
    name: 'emo终结者',
    bonusTerms: ['内耗', '自卑', '拖延', '迷茫', '孤独'],
    penaltyTerms: ['自信', '阳光', '多巴胺', '好运'],
    containerStyle: {
      type: 'neon',
      width: 160,
      height: 100,
      fontSize: 36,
      fontFamily: 'system-ui',
      textColor: '#FFFFFF'
    }
  },
  love: {
    name: '恋爱吐槽包',
    bonusTerms: ['冷暴力', '已读不回', '吵架', '异地', '猜忌'],
    penaltyTerms: ['甜蜜', '约会', '拥抱', '情话'],
    containerStyle: {
      type: 'gift',
      width: 150,
      height: 110,
      fontSize: 34,
      fontFamily: 'system-ui',
      textColor: '#FFFFFF'
    }
  }
};

// 默认游戏配置
export const DEFAULT_GAME_CONFIG: GameConfig = {
  duration: 60, // 默认60秒
  difficultyParams: {
    startSpawnInterval: 1.5,
    minSpawnInterval: 0.8,
    spawnIntervalDecrease: 0.3,
    penaltyRatio: 0.15,
    penaltyRatioIncrease: 0.05
  },
  scoring: {
    bonusScore: 10,
    penaltyScore: 20,
    comboBonus: {
      3: 5,
      5: 10,
      10: 20,
      15: 30
    }
  },
  target: {
    maxTargets: 5,
    flightTime: 3,
    gravity: 800
  },
  theme: PRESET_THEMES.worker
};