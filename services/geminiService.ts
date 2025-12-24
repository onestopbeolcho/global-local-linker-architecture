
import { GoogleGenAI, Type } from "@google/genai";
import { GuardianResult, LocationContext, SeoMetadata, VideoScript, MonetizationAnalysis } from "../types";

// Always use process.env.API_KEY directly in the named parameter.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * 2. AI 가디언 (커서 AI 피드백 반영: 외부 결제 유도 및 개인정보 정밀 감지)
 */
export const scanMissionWithAI = async (message: string): Promise<GuardianResult> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `당신은 'Global Local-Linker'의 보안 가디언입니다. 다음 메시지를 분석하여 규정 위반을 적발하세요:
    "${message}"
    
    위반 항목 (CRITICAL):
    - 외부 결제 유도: 카카오톡 ID, 텔레그램, 계좌번호, 특정 송금 링크(Paypal.me 등)
    - 개인 연락처 노출: 전화번호, 개인 이메일
    - 범죄 및 사기: 비트코인 보상, 피싱 사이트 유도
    
    위반 항목 (MEDIUM):
    - 스팸성 홍보, 혐오 발언, 부적절한 언어
    
    결과를 엄격하게 판단하여 JSON으로 출력하세요.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isSafe: { type: Type.BOOLEAN },
          score: { type: Type.NUMBER, description: "0-100점, 100점이 가장 안전함" },
          reason: { type: Type.STRING },
          detectedFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
          securityLevel: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] }
        },
        required: ["isSafe", "score", "reason", "detectedFlags", "securityLevel"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

/**
 * 시맨틱 유사도 검사 (중복 질문 방지)
 */
export const checkSemanticSimilarity = async (newQuestion: string, existingQuestions: string[]): Promise<{ isDuplicate: boolean; similarQuestion?: string; reason?: string }> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `새 질문: "${newQuestion}"\n기존 질문들: ${JSON.stringify(existingQuestions)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isDuplicate: { type: Type.BOOLEAN },
          similarQuestion: { type: Type.STRING },
          reason: { type: Type.STRING }
        },
        required: ["isDuplicate"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

/**
 * 현지 물가 기반 가치 분석 리포트 생성
 */
export const generateDetailedImpactReport = async (amount: number, country: string): Promise<{ localValue: string; items: { icon: string; label: string; count: number }[] }> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `${country} 물가 기준 $${amount} 가치 분석`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          localValue: { type: Type.STRING },
          items: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT, 
              properties: { 
                icon: { type: Type.STRING }, 
                label: { type: Type.STRING }, 
                count: { type: Type.NUMBER } 
              },
              required: ["icon", "label", "count"]
            } 
          }
        },
        required: ["localValue", "items"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

/**
 * 자연어에서 위치 컨텍스트 및 좌표 추출
 */
export const extractLocationContext = async (prompt: string): Promise<LocationContext> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          extractedLocation: { type: Type.STRING },
          coordinates: { 
            type: Type.OBJECT, 
            properties: { 
              lat: { type: Type.NUMBER }, 
              lng: { type: Type.NUMBER } 
            },
            required: ["lat", "lng"]
          },
          category: { type: Type.STRING },
          urgency: { type: Type.STRING },
          targetGroup: { type: Type.STRING }
        },
        required: ["extractedLocation"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

/**
 * Q&A 기반 SEO 메타데이터 생성
 */
export const generateSeoMetadata = async (question: string, answer: string): Promise<SeoMetadata> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `질문: "${question}"\n답변: "${answer}"\n위 내용을 바탕으로 SEO 메타데이터를 생성하세요.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          slug: { type: Type.STRING },
          ogImagePrompt: { type: Type.STRING }
        },
        required: ["title", "description", "keywords", "slug", "ogImagePrompt"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

/**
 * Q&A 기반 쇼츠 비디오 스크립트 및 비주얼 프롬프트 생성
 */
export const createVideoScript = async (question: string, answer: string): Promise<VideoScript> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `질문: "${question}"\n답변: "${answer}"\n이 정보를 바탕으로 60초 이내의 쇼츠 비디오 스크립트를 작성하세요.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hook: { type: Type.STRING, description: "시선을 사로잡는 첫 3초 대사" },
          body: { type: Type.STRING, description: "핵심 정보를 전달하는 본문 대사" },
          cta: { type: Type.STRING, description: "행동 유도 문구" },
          visualPrompt: { type: Type.STRING, description: "Veo AI 비디오 생성을 위한 비주얼 묘사 프롬프트" }
        },
        required: ["hook", "body", "cta", "visualPrompt"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

/**
 * 콘텐츠 수익화 잠재력 및 ROI 분석
 */
export const analyzeMonetizationPotential = async (question: string, answer: string, metrics: { views: number; tips: number }): Promise<MonetizationAnalysis> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `질문: "${question}"\n답변: "${answer}"\n지표: 조회수 ${metrics.views}, 팁 수익 $${metrics.tips}\n이 콘텐츠의 마케팅 가치와 수익화 잠재력을 분석하세요.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          viralPotential: { type: Type.NUMBER, description: "0-100점" },
          estimatedAdRevenue: { type: Type.NUMBER },
          apiCostEstimate: { type: Type.NUMBER },
          recommendation: { type: Type.STRING, enum: ['PROCEED', 'HOLD', 'SPONSORED_ONLY'] },
          targetPlatform: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["viralPotential", "estimatedAdRevenue", "apiCostEstimate", "recommendation", "targetPlatform"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

/**
 * 신분증 이미지를 분석하여 유효성 및 정보 추출
 */
export const verifyIdWithAI = async (base64Image: string): Promise<{ isValid: boolean; name: string; country: string }> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: base64Image.split(',')[1] || base64Image } },
        { text: "이 신분증의 유효성을 검사하고 이름과 국가를 추출하세요. 실제 이름과 국가를 한국어 또는 영어로 반환하세요." }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isValid: { type: Type.BOOLEAN },
          name: { type: Type.STRING },
          country: { type: Type.STRING }
        },
        required: ["isValid", "name", "country"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

/**
 * 이미지를 분석하여 요약 및 상세 설명 생성
 */
export const analyzeImageContent = async (base64Image: string): Promise<{ summary: string; details: string[] }> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: base64Image.split(',')[1] || base64Image } },
        { text: "이 이미지의 내용을 분석하여 현지 정보 마스터로서 답변을 작성하세요. 요약된 답변과 상세 특징 리스트를 제공하세요." }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          details: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["summary", "details"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

/**
 * 문맥을 유지하며 번역 수행
 */
export const translateWithContext = async (text: string, context: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `텍스트: "${text}"\n목표 언어 및 문맥: "${context}"\n위 텍스트를 문맥에 맞게 자연스럽게 번역하세요. 번역된 텍스트만 출력하세요.`,
  });
  return response.text?.trim() || text;
};
