# 🌍 Global Local-Linker: Architecture Dashboard

> **여행자와 현지인을 잇는 선한 영향력 기반의 글로벌 보상형 Q&A 플랫폼**

이 저장소는 'Global Local-Linker' 프로젝트의 **기술 설계도(Blueprint)**와 **AI 엔진 프로토타입**을 포함하는 인터랙티브 대시보드입니다. 

## 🛠️ 저장소가 비어 보일 때 해결 방법 (Troubleshooting)
만약 깃허브 클론 시 파일이 보이지 않는다면 다음을 확인하세요:
1. **Branch 확인**: 현재 파일들은 `main` 브랜치에 업로드되어 있습니다. `git checkout main` 명령어를 확인하세요.
2. **Push 여부**: AI Studio에서 'Commit' 후 반드시 'Push' 버튼을 눌러야 깃허브 서버로 전송됩니다.
3. **Cursor에서 불러오기**: Cursor의 `Source Control` 탭에서 `Pull` 버튼을 눌러 최신 상태를 동기화하세요.

## 🚀 핵심 가치 (Core Values)
- **Trust**: GPS 기반 50km 지오펜싱을 통한 실제 현지인 인증.
- **Safety**: Gemini AI Guardian을 이용한 실시간 스팸 및 사기 차단.
- **Impact**: 팁의 가치를 현지 물가 기준으로 시각화하여 소셜 임팩트 전달.

## 🏗️ 기술 스택
- **Frontend**: Flutter / React (Prototype)
- **Backend**: Firebase (Auth, Firestore, Functions)
- **AI**: Google Gemini API (gemini-3-flash-preview)
- **Payment**: Stripe Connect

## 📂 실행 방법
```bash
npm install
npm run dev
```
