import { create } from "zustand";
import { persist } from "zustand/middleware";
import { A as AI_MODEL_CONFIGS } from "./router-DDFDFkQR.js";
const useAIConfigStore = create()(
  persist(
    (set, get) => ({
      selectedModel: "doubao",
      doubaoApiKey: "",
      doubaoModelId: "",
      deepseekApiKey: "",
      deepseekModelId: "",
      openaiApiKey: "",
      openaiModelId: "",
      openaiApiEndpoint: "",
      geminiApiKey: "",
      geminiModelId: "gemini-flash-latest",
      setSelectedModel: (model) => set({ selectedModel: model }),
      setDoubaoApiKey: (apiKey) => set({ doubaoApiKey: apiKey }),
      setDoubaoModelId: (modelId) => set({ doubaoModelId: modelId }),
      setDeepseekApiKey: (apiKey) => set({ deepseekApiKey: apiKey }),
      setDeepseekModelId: (modelId) => set({ deepseekModelId: modelId }),
      setOpenaiApiKey: (apiKey) => set({ openaiApiKey: apiKey }),
      setOpenaiModelId: (modelId) => set({ openaiModelId: modelId }),
      setOpenaiApiEndpoint: (endpoint) => set({ openaiApiEndpoint: endpoint }),
      setGeminiApiKey: (apiKey) => set({ geminiApiKey: apiKey }),
      setGeminiModelId: (modelId) => set({ geminiModelId: modelId }),
      isConfigured: () => {
        const state = get();
        const config = AI_MODEL_CONFIGS[state.selectedModel];
        return config.validate(state);
      }
    }),
    {
      name: "ai-config-storage"
    }
  )
);
export {
  useAIConfigStore as u
};
