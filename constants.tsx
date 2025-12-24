
import { CollectionSchema, FolderNode } from './types';

export const FLUTTER_STRUCTURE: FolderNode[] = [
  {
    name: 'lib',
    type: 'folder',
    children: [
      {
        name: 'core',
        type: 'folder',
        description: '글로벌 공통 로직 및 보안 엔진',
        children: [
          { name: 'auth', type: 'folder', description: 'Firebase Auth 연동' },
          { name: 'api', type: 'folder', description: 'Gemini & Stripe 통신' },
          { name: 'security', type: 'folder', description: 'AI Guardian 필터' },
          { name: 'mastery', type: 'folder', description: '레벨링 및 권한 관리 로직' },
        ],
      },
      {
        name: 'features',
        type: 'folder',
        children: [
          { name: 'home', type: 'folder', description: '위치 기반 미션 피드' },
          { name: 'chat', type: 'folder', description: '실시간 번역 채팅' },
          { name: 'wallet', type: 'folder', description: 'Stripe 수익 관리' },
          { name: 'impact', type: 'folder', description: '소셜 임팩트 대시보드' },
          { name: 'mastery_center', type: 'folder', description: '마스터 승급 대시보드' },
        ],
      },
      { name: 'main.dart', type: 'file' },
    ],
  },
];

export const FIRESTORE_SCHEMA: CollectionSchema[] = [
  {
    name: 'Users',
    fields: [
      { name: 'uid', type: 'String', description: 'Firebase Auth UID' },
      { name: 'masterLevel', type: 'String', description: 'ROOKIE | GUIDE | MASTER | LEGEND' },
      { name: 'trustScore', type: 'Number', description: '0-100점 (Social 피드백 반영)' },
      { name: 'socialAnswerCount', type: 'Number', description: '무료 도움 횟수' },
      { name: 'proAnswerCount', type: 'Number', description: '유료 미션 성공 횟수' },
      { name: 'isProEnabled', type: 'Boolean', description: '유료 미션 수주 권한 여부' },
      { name: 'stripeAccountId', type: 'String', description: 'Stripe Connect 연동 ID' },
      { name: 'verifiedLocation', type: 'GeoPoint', description: '최종 인증된 현지 위치' },
    ],
  },
  {
    name: 'Questions (Missions)',
    fields: [
      { name: 'questionId', type: 'String', description: '고유 ID' },
      { name: 'mode', type: 'String', description: 'SOCIAL | PRO' },
      { name: 'minMasterLevel', type: 'String', description: '필요 마스터 레벨' },
      { name: 'requesterId', type: 'String', description: '질문자 UID' },
      { name: 'title', type: 'String', description: '질문 제목' },
      { name: 'bounty', type: 'Number', description: '팁/보상 금액' },
      { name: 'status', type: 'String', description: 'OPEN | ASSIGNED | COMPLETED' },
    ],
  },
  {
    name: 'Answers',
    fields: [
      { name: 'answerId', type: 'String', description: '고유 ID' },
      { name: 'questionId', type: 'String', description: '참조 질문 ID' },
      { name: 'masterSnap', type: 'Map', description: '답변 시점의 마스터 레벨/점수' },
      { name: 'isVerifiedLocal', type: 'Boolean', description: '50km 이내 답변 여부' },
      { name: 'guardianReport', type: 'Map', description: 'Gemini AI 검사 결과' }
    ],
  },
  {
    name: 'Transactions',
    fields: [
      { name: 'txId', type: 'String', description: 'Stripe 거래 ID' },
      { name: 'mode', type: 'String', description: 'TIP | BOUNTY' },
      { name: 'platformFee', type: 'Number', description: '레벨에 따른 차등 수수료' },
      { name: 'status', type: 'String', description: 'PENDING | COMPLETED | REFUNDED' },
    ],
  }
];

export const SECURITY_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() { return request.auth != null; }
    function getMasterData() { return get(/databases/$(database)/documents/users/$(request.auth.uid)).data; }
    
    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if request.auth.uid == userId;
    }
    
    match /questions/{qId} {
      allow create: if isSignedIn();
      // 유료 미션은 권한이 있는 마스터만 조회 가능하도록 설정 가능
      allow read: if true;
      allow update: if isSignedIn() && (resource.data.requesterId == request.auth.uid);
    }

    match /answers/{aId} {
      // PRO 미션의 경우 마스터 레벨 체크 필수
      allow create: if isSignedIn() && 
        (request.resource.data.mode != 'PRO' || getMasterData().isProEnabled == true);
      allow read: if true;
    }
  }
}
`;

export const STORAGE_RULES = `
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /proof_media/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
`;
