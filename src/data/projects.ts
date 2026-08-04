import type { EpisodeProject } from '../types';
import { huangYingProject } from './stories/huang-ying';

export const projects: EpisodeProject[] = [huangYingProject];

export function getProject(id: string): EpisodeProject | undefined {
  return projects.find((p) => p.id === id);
}
