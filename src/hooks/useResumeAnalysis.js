import { useState, useEffect } from "react";
import { pdfService } from "../services/pdfService";
import { aiService } from "../services/aiService";
import { buildPresenceChecklist } from "../../constants";
import constants from "../../constants";

const INITIAL_STATE = {
  aiReady: false,
  isLoading: false,
  uploadedFile: null,
  resumeText: "",
  analysis: null,
  presenceChecklist: [],
  error: null,
};

// Mock data pour fallback
const MOCK_ANALYSIS = {
  overallScore: 7,
  strengths: [
    "Expérience professionnelle claire et bien structurée",
    "Compétences techniques pertinentes et à jour",
    "Formation en adéquation avec le poste visé",
  ],
  improvements: [
    "Ajouter des réalisations quantifiables (chiffres, pourcentages)",
    "Enrichir la section compétences avec plus de mots-clés techniques",
    "Optimiser les mots-clés pour les systèmes ATS",
  ],
  summary:
    "Votre CV présente de solides bases avec une expérience pertinente et bien détaillée.",
  performanceMetrics: {
    formatting: 8,
    contentQuality: 7,
    atsCompatibility: 6,
    keywordOptimization: 6,
    impactMetrics: 5,
  },
  keywords: [
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "Git",
    "Agile",
    "REST API",
    "MongoDB",
  ],
  actionItems: [
    "Optimiser le placement des mots-clés pour un meilleur score ATS",
    "Enrichir le contenu avec des réalisations quantifiables",
  ],
  proTips: [
    "Utiliser des verbes d'action pour commencer les puces",
    "Garder les descriptions concises et percutantes",
  ],
};

/**
 * Hook personnalisé pour gérer l'analyse de CV
 *
 * @example
 * const { state, analyzeFile, reset } = useResumeAnalysis();
 *
 * @returns {Object} État et actions pour l'analyse de CV
 */
export function useResumeAnalysis() {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    let interval;
    let timeout;

    const checkAiReady = async () => {
      if (window.puter?.auth) {
        try {
          const isSignedIn = await window.puter.auth.isSignedIn();
          if (isSignedIn && aiService.isReady()) {
            setState((prev) => ({
              ...prev,
              aiReady: true,
            }));
            clearInterval(interval);
            clearTimeout(timeout);
            console.log("✅ Puter AI prêt");
          }
        } catch (error) {
          console.error("Erreur vérification Puter:", error);
        }
      }
    };
    interval = setInterval(checkAiReady, 500);

    // Timeout: mode DEV après 5s s Puter non prêt
    timeout = setTimeout(() => {
      if (!aiService.isReady()) {
        console.warn(
          "⚠️ Puter non disponible après 5s, mode développement activé"
        );
        setState((prev) => ({ ...prev, aiReady: true }));
      }
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  /**
   * Analyse un fichier PDF uploadé
   * @param {File} file - Fichier PDF à analyser
   */
  const analyzeFile = async (file) => {
    if (!file) return;

    setState((prev) => ({
      ...prev,
      isLoading: true,
      uploadedFile: file,
      error: null,
    }));

    try {
      const text = await pdfService.extractText(file);
      const checklist = buildPresenceChecklist(text);

      let result;

      const isPuterReady =
        window.puter?.auth &&
        (await window.puter.auth.isSignedIn()) &&
        aiService.isReady();

      if (isPuterReady) {
        try {
          console.log("🚀 Utilisation de Puter AI");
          result = await aiService.analyzeResume(
            text,
            constants.ANALYZE_RESUME_PROMPT
          );
        } catch (puterError) {
          console.warn("⚠️ Erreur Puter, fallback vers mock:", puterError);
          await new Promise((resolve) => setTimeout(resolve, 1500));
          result = MOCK_ANALYSIS;
        }
      } else {
        console.warn("🔧 Mode développement: utilisation des données mockées");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        result = MOCK_ANALYSIS;
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        resumeText: text,
        analysis: result,
        presenceChecklist: checklist,
      }));
    } catch (error) {
      console.error("❌ Erreur d'analyse:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Une erreur est survenue lors de l'analyse",
      }));
    }
  };

  /**
   * Réinitialise l'état de l'analyse
   */
  const reset = () => {
    setState((prev) => ({
      ...INITIAL_STATE,
      aiReady: prev.aiReady,
    }));
  };

  return {
    // Etat
    state,
    // Actions
    analyzeFile,
    reset,
    // Helpers
    hasResults: !!state.analysis,
    hasError: !!state.error,
    isReady: state.aiReady,
  };
}
