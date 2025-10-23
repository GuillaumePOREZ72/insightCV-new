/**
 * Types pour l'analyse de CV par IA
 *
 * Ce fichier centralise tous les types liés aux résultats d'analyse.
 */

/**
 * Métriques de performance du CV
 */
export interface PerformanceMetrics {
  formatting: number;
  contentQuality: number;
  atsCompatibility: number;
  keywordOPtimization: number;
  impactMetrics: number;
}

/**
 * Résultat complet de l'analyse IA
 *
 * Structure retournée par l'API Puter AI
 */
export interface AnalysisResult {
  overallScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  performanceMetrics: PerformanceMetrics;
  keywords: string[];
  actionItems: string[];
  proTips: string[];
}

/**
 * Element de checklist ATS (pour les composants UI)
 */
export interface ChecklistItem {
  label: string;
  present: boolean;
}
