export type AspectRatio = '9:16' | '16:9' | '1:1';

export type ShotType =
  | 'establishing'
  | 'wide'
  | 'medium'
  | 'close-up'
  | 'extreme-close-up'
  | 'insert'
  | 'pov';

export type CameraMove =
  | 'static'
  | 'slow-push-in'
  | 'slow-pull-out'
  | 'pan-left'
  | 'pan-right'
  | 'tilt-up'
  | 'orbit'
  | 'handheld-soft';

export interface Character {
  id: string;
  name: string;
  role: string;
  identity: string;
  appearance: string;
  costume: string;
  personality: string;
  voiceNote: string;
  visualPrompt: string;
  negativePrompt: string;
}

export interface ScriptBeat {
  id: string;
  title: string;
  timeRange: string;
  narration: string;
  dialogue: string;
  action: string;
  emotion: string;
  adaptationNote: string;
}

export interface StoryboardShot {
  id: string;
  order: number;
  title: string;
  durationSec: number;
  shotType: ShotType;
  cameraMove: CameraMove;
  characters: string[];
  location: string;
  action: string;
  dialogue: string;
  narration: string;
  mood: string;
  imagePrompt: string;
  videoPrompt: string;
  negativePrompt: string;
  continuityNotes: string;
}

export interface StyleBible {
  artDirection: string;
  palette: string[];
  lighting: string;
  lineWork: string;
  animationFeel: string;
  referenceTags: string[];
  globalStylePrompt: string;
  globalNegativePrompt: string;
}

export interface EpisodeProject {
  id: string;
  title: string;
  source: string;
  logline: string;
  adaptationSummary: string;
  targetDurationSec: number;
  aspectRatio: AspectRatio;
  platform: string;
  characters: Character[];
  scriptBeats: ScriptBeat[];
  shots: StoryboardShot[];
  styleBible: StyleBible;
  qualityChecklist: string[];
}
