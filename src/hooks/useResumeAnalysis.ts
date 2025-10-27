import { useState, useEffect } from "react";
import { pdfService } from "../services/pdfService";
import { aiService } from "../services/aiService";
import { buildPresenceChecklist } from "../../constants";
import { AnalysisResult, ChecklistItem } from "../types/analysis";
import constants from "../../constants";

/**
 * État de l'analyse de CV
 */
interface ResumeAnalysisState {
  aiReady: boolean;
  isLoading: boolean;
  uploadedFile: File | null;
  resumeText: string;
  analysis: AnalysisResult | null;
  presenceChecklist: ChecklistItem[];
  error: string | null;
}

interface useResumeAnalysisReturn {
  // Etat
  state: ResumeAnalysisState;

  // Actions
  analyzeFile: (file: File) => Promise<void>;
  reset: () => void;

  // Helpers
  hasResults: boolean;
  isReady: boolean;
}

/**
 * État initial du hook
 */
const INITIAL_STATE: ResumeAnalysisState = {
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
 * Gère tout le cycle de vie :
 * - Upload du fichier PDF
 * - Extraction du texte
 * - Analyse via IA
 * - Génération de la checklist
 *
 * @returns État et actions pour l'analyse de CV
 */
export const useResumeAnalysis = (): useResumeAnalysisReturn => {
  const [state, setState] = useState<ResumeAnalysisState>(INITIAL_STATE);

  /**
   * Vérifie au montage si l'IA est prête
   */
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      aiReady: aiService.isReady(),
    }));
  }, []);

  /**
   * Gère l'upload d'un fichier PDF
   * @param file - Fichier PDF uploadé
   */
  const handleFileUpload = async (file: File): Promise<void> => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      uploadedFile: file,
    }));

    try {
      // Extraction du texte du PDF
      const text = await pdfService.extractText(file);

      // Génération de la checklist de présence
      const checklist = buildPresenceChecklist(text);

      setState((prev) => ({
        ...prev,
        resumeText: text,
        presenceChecklist: checklist,
        isLoading: false,
      }));

      await handleAnalyze(text);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de l'extraction du texte";

      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  };

  /**
   * Lance l'analyse IA du CV
   * @param resumeText - Texte du CV à analyser
   */
  const handleAnalyze = async (resumeText: string): Promise<void> => {
    if (!resumeText) {
      setState((prev) => ({
        ...prev,
        error: "Aucun texte de CV à analyser",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // Analyse du CV via l'IA
      const result = await aiService.analyzeResume(
        resumeText,
        constants.ANALYZE_RESUME_PROMPT
      );

      setState((prev) => ({
        ...prev,
        analysis: result,
        isLoading: false,
      }));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de l'analyse du CV";

      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  };

  /**
   * Réinitialise l'état à zéro
   */
  const handleReset = (): void => {
    setState(INITIAL_STATE);
  };

  const hasResults: boolean = !!state.analysis;
  const isReady: boolean = !state.isLoading;

  return {
    // État
    state,

    // Actions
    analyzeFile: handleFileUpload,
    reset: handleReset,

    // Helpers
    hasResults,
    isReady,
  };
};
