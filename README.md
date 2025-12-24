# 🌍 Global Local-Linker: Architecture Dashboard

> **여행자와 현지인을 잇는 선한 영향력 기반의 글로벌 보상형 Q&A 플랫폼**

이 저장소는 'Global Local-Linker' 프로젝트의 **기술 설계도(Blueprint)**와 **AI 엔진 프로토타입**을 포함하는 인터랙티브 대시보드입니다. Flutter와 Firebase, Gemini AI를 활용한 시스템의 핵심 로직을 시각화하고 검증하기 위해 제작되었습니다.

## 🚀 핵심 가치 (Core Values)
- **Trust**: GPS 기반 50km 지오펜싱을 통한 실제 현지인 인증.
- **Safety**: Gemini AI Guardian을 이용한 실시간 스팸 및 사기 차단.
- **Impact**: 팁의 가치를 현지 물가 기준으로 시각화하여 소셜 임팩트 전달.
- **Efficiency**: 콘텐츠 자동화 엔진을 통한 SEO 및 숏폼 영상 자동 생성.

## 🏗️ 기술 스택 (Technical Stack)
- **Frontend**: Flutter (Android, iOS, Web)
- **Backend**: Firebase (Auth, Firestore, Functions, Hosting)
- **AI Engine**: Google Gemini API (Vertex AI for Firebase)
- **Payment**: Stripe Connect (10% 플랫폼 수수료 자동 공제)

## 📂 프로젝트 구조 (Proposed Structure)
```text
lib/
├── core/               # 인증, API 통신, 보안 필터 (Guardian)
│   ├── api/
│   ├── security/
│   └── mastery/        # 마스터 레벨링 로직
├── features/           # 도메인별 기능 (미션 피드, 채팅, 지갑)
│   ├── home/
│   ├── chat/
│   └── wallet/
└── main.dart           # 앱 진입점
```

## 🛠️ 실행 방법 (Local Setup)
본 대시보드는 React 환경에서 작성되었습니다.

1. 저장소를 클론합니다.
   ```bash
   git clone https://github.com/your-username/global-local-linker.git
   ```
2. 의존성 패키지를 설치합니다.
   ```bash
   npm install
   ```
3. API 키를 설정합니다. (`.env` 파일 생성)
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
4. 로컬 서버를 실행합니다.
   ```bash
   npm run dev
   ```

## 📜 라이선스 (License)
이 프로젝트 설계안은 MIT 라이선스를 따릅니다.
