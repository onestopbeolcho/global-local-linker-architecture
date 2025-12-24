
const STORAGE_KEY = 'LOCAL_LINKER_STATE';

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (e) {
    console.error('Could not save state', e);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

/**
 * Cursor AI가 프로젝트 전체 맥락을 유지하도록 만드는 .cursorrules 파일 생성
 */
export const generateCursorRules = () => {
  return `
# Global Local-Linker Project Rules

- **AI 가디언 우선**: 모든 메시지 송수신 전 lib/core/services/ai_guardian_service.dart를 호출하여 스캔할 것.
- **50km 지오펜싱**: 답변 생성 시 반드시 사용자의 GPS와 질문의 좌표를 대조(Haversine). 50km 초과 시 답변 금지.
- **결제 보안**: Stripe Secret은 절대 코드에 하드코딩하지 말 것 (Firebase Secrets 사용).
- **수수료**: 모든 Transaction은 10% 플랫폼 수수료 공제 로직을 포함해야 함.
- **언어**: UI는 다국어를 지원하도록 설계하되, 번역 로직은 Gemini API를 활용함.
`;
};

/**
 * 터미널용 통합 마이그레이션 스크립트 (기존 프로젝트 보호 모드)
 */
export const generateMigrationScript = (codes: { flutter: string, functions: string, security: string }) => {
  const cursorRules = generateCursorRules();
  return `#!/bin/bash
# Global Local-Linker Auto-Injection Script
echo "💉 기존 프로젝트에 아키텍처를 주입합니다..."

# 1. 아키텍처 폴더 구성 (기존 폴더가 있으면 유지됨)
mkdir -p lib/core/services
mkdir -p lib/core/models
mkdir -p functions/src
mkdir -p security
mkdir -p docs/spec

# 2. .cursorrules 주입 (이것이 가장 중요합니다)
cat <<EOF > .cursorrules
${cursorRules}
EOF

# 3. Flutter 핵심 서비스 파일 생성
cat <<EOF > lib/core/services/location_service.dart
${codes.flutter.split('// lib/core/services/ai_guardian_service.dart')[0]}
EOF

cat <<EOF > lib/core/services/ai_guardian_service.dart
${codes.flutter.split('// lib/core/services/ai_guardian_service.dart')[1]}
EOF

# 4. Firebase Cloud Functions 소스 주입
cat <<EOF > functions/src/index.ts
${codes.functions}
EOF

# 5. 보안 규칙 백업
cat <<EOF > security/firestore.rules
${codes.security}
EOF

echo "✅ 이식이 완료되었습니다. 이제 Cursor에서 .cursorrules를 기반으로 코딩을 시작하세요!"
`;
};

export const exportProjectToFile = () => {
  const state = localStorage.getItem(STORAGE_KEY);
  if (!state) {
    alert("저장할 데이터가 없습니다.");
    return;
  }
  const blob = new Blob([state], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `local-linker-architecture-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
