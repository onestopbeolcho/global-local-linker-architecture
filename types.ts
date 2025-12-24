
export interface SchemaField {
  name: string;
  type: string;
  description: string;
}

export interface CollectionSchema {
  name: string;
  fields: SchemaField[];
}

export interface FolderNode {
  name: string;
  type: 'folder' | 'file';
  description?: string;
  children?: FolderNode[];
}

export interface GuardianResult {
  isSafe: boolean;
  score: number;
  reason: string;
  detectedFlags: string[];
  securityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface LocationContext {
  extractedLocation: string;
  coordinates?: { lat: number; lng: number };
  category: 'DINING' | 'TRANSPORT' | 'SIGHTSEEING' | 'SHOPPING' | 'SAFETY' | 'MISSION' | 'OTHER';
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
  targetGroup: string;
}

export type MissionMode = 'SOCIAL' | 'PRO';

export type MasterLevel = 'ROOKIE' | 'GUIDE' | 'MASTER' | 'LEGEND';

export interface UserMastery {
  level: MasterLevel;
  trustScore: number;
  socialCount: number;
  proCount: number;
  isProEligible: boolean;
  pointsToNextLevel: number;
}

export interface MissionType {
  id: string;
  title: string;
  mode: MissionMode;
  type: 'PHOTO' | 'INFO' | 'ACTION' | 'RESEARCH';
  reward: number;
  location: string;
  description: string;
}

export interface LocalAnswer {
  id: string;
  masterName: string;
  masterAvatar: string;
  content: string;
  mediaUrls: string[];
  distanceFromTarget: number; // km
  timestamp: string;
  impactScore: number;
  mode: MissionMode;
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  ogImagePrompt: string;
}

export interface VideoScript {
  hook: string;
  body: string;
  cta: string;
  visualPrompt: string;
}

export interface MonetizationAnalysis {
  viralPotential: number;
  estimatedAdRevenue: number;
  apiCostEstimate: number;
  recommendation: 'PROCEED' | 'HOLD' | 'SPONSORED_ONLY';
  targetPlatform: string[];
}
