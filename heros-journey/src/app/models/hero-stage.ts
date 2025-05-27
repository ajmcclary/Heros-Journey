export interface HeroStage {
  id: number;
  name: string;
  description: string;
  worldType: 'known' | 'unknown';
  angle: number;
  isThreshold?: boolean;
  isAbyss?: boolean;
  isReturnPath?: boolean;
}

export interface StageGroup {
  name: string;
  stages: number[];
  description: string;
}