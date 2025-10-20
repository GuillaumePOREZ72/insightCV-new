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
    const interval = setInterval(() => {
      if (aiService.isReady()) {
        setState((prev) => ({ ...prev, aiReady: true }));
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
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
      const result = await aiService.analyzeResume(
        text,
        constants.ANALYZE_RESUME_PROMPT
      );
      setState((prev) => ({
        ...prev,
        isLoading: false,
        resumeText: text,
        analysis: result,
        presenceChecklist: checklist,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
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
