import { AnalysisResult } from "../types/analysis";
import { PuterAIProvider, PuterChatResponse } from "../types/puter";

/**
 * Service d'analyse IA via Puter
 *
 * Gère la communication avec l'API Puter AI pour analyser le CV
 */
export class AIService {
  /**
   * Obtient le provider IA (vérification tardive = lazy evaluation)
   * @returns {PuterAIProvider | undefined}
   */
  private getAIProvider(): PuterAIProvider | undefined {
    return window.puter?.ai;
  }

  /**
   * Vérifie que le provider IA est disponible
   * @returns {boolean} true si l'IA est disponible
   */
  isReady(): boolean {
    const provider = this.getAIProvider();
    return !!provider;
  }

  /**
   * Parse la réponse JSON de l'IA
   * @param {string} response - Réponse brute de l'IA
   * @returns {AnalysisResult} Objet JSON parsé
   * @throws {Error} si le parsing échoue
   */
  parseResponse(response: string): AnalysisResult {
    try {
      // Extraire le JSON même s'il est entouré de texte
      const jsonMatch = response.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("Aucun JSON trouvé dans la réponse");
      }

      const cleanJson = jsonMatch[0];
      const parsed = JSON.parse(cleanJson) as AnalysisResult;

      // Validation basique
      if (!parsed.overallScore) {
        throw new Error(
          `Structure de réponse invalide. Reçu: ${JSON.stringify(
            parsed
          ).substring(0, 100)}...`
        );
      }

      return parsed;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Échec du parsing de la réponse IA : ${error.message}`);
      }
      throw new Error("Échec du parsing de la réponse IA : erreur inconnue");
    }
  }

  /**
   * Analyse un CV via l'IA
   * @param {string} resumeText - Texte du CV
   * @param {string} prompt - Template du prompt
   * @returns {Promise<AnalysisResult>} - Résultat de l'analyse
   * @throws {Error} Si l'analyse échoue
   */
  async analyzeResume(
    resumeText: string,
    prompt: string
  ): Promise<AnalysisResult> {
    const aiProvider = this.getAIProvider();
    if (!aiProvider) {
      throw new Error(
        "Le service IA n'est pas disponible. Rechargez la page."
      );
    }

    try {
      const systemPrompt = `Tu es un expert RH spécialisé dans l'analyse de CV. 
      Tu dois analyser le CV et retourner UNIQUEMENT un objet JSON valide avec cette structure exacte:
      
      {
        "overallScore": number (entre 0 et 10),
        "summary": "résumé de l'analyse en 2-3 phrases",
        "strengths": ["point fort 1", "point fort 2", "point fort 3"],
        "improvements": ["amélioration 1", "amélioration 2", "amélioration 3"],
        "performanceMetrics": {
          "formatting": number (0-10),
          "contentQuality": number (0-10),
          "atsCompatibility": number (0-10),
          "keywordOptimization": number (0-10),
          "impactMetrics": number (0-10)
        },
        "keywords": ["mot-clé 1", "mot-clé 2", "mot-clé 3"],
        "actionItems": ["action 1", "action 2", "action 3"],
        "proTips": ["conseil 1", "conseil 2", "conseil 3"]
      }
      
      Réponds UNIQUEMENT avec le JSON, sans texte avant ou après.`;

      const userPrompt = prompt.replace("{{DOCUMENT_TEXT}}", resumeText);
      const response = await aiProvider.chat(
        [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        {
          model: "gpt-4o-mini",
          temperature: 0.7,
        }
      );

      const content =
        typeof response === "string"
          ? response
          : response.message?.content || "";

      if (!content) {
        throw new Error("Réponse Puter vide");
      }

      const result = this.parseResponse(content);
      return result;
      
    } catch (error: unknown) {
      console.error("❌ Erreur Puter AI:", error);

      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // Gestion des erreurs spécifiques Puter
      if (errorMessage.includes("Permission denied")) {
        throw new Error(
          "Connexion Puter requise. Rechargez la page et connectez-vous."
        );
      }

      if (errorMessage.includes("usage-limited")) {
        throw new Error(
          "LImite d'utilisation Puter atteinte. Réessayez plus tard."
        );
      }
      // Erreurs réseau ou timeout
      if (
        errorMessage.includes("network") ||
        errorMessage.includes("timeout")
      ) {
        throw new Error("Problème de connexion. Vérifiez votre réseau.");
      }
      // Re-throw l'erreur si elle n'est pas gérée
      throw error;
    }
  }
}

export const aiService = new AIService();
