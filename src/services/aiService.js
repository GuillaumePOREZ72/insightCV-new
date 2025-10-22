/**
 * Service d'analyse IA via Puter
 */
export class AIService {
  constructor(aiProvider = window.puter?.ai) {
    this.aiProvider = aiProvider;
  }

  /**
   * Vérifie que le provider IA est disponible et authentifié
   * @returns {boolean} true si l'IA est prête
   */
  isReady() {
    return !!this.aiProvider?.chat && window.puter?.auth?.isSignedIn?.();
  }

  /**
   * Parse la réponse JSON de l'IA (gère les cas où le JSON est enrobé de texte)
   * @param {string} response - Réponse brute de l'IA
   * @returns {Object} Objet JSON parsé
   * @throws {Error} si le parsing échoue
   */
  parseResponse(response) {
    try {
      // Extraire le JSON même s'il est entouré de texte
      const jsonMatch = response.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("Aucun JSON trouvé dans la réponse");
      }

      const parsed = JSON.parse(jsonMatch[0]);

      // Validation basique
      if (!parsed.overallScore && !parsed.error) {
        throw new Error(
          `Structure de réponse invalide. Reçu: ${JSON.stringify(
            parsed
          ).substring(0, 100)}...`
        );
      }

      return parsed;
    } catch (error) {
      throw new Error(`Échec du parsing de la réponse IA : ${error.message}`);
    }
  }

  /**
   * Analyse un CV via l'IA
   * @param {string} resumeText - Texte du CV
   * @param {string} prompt - Template du prompt
   * @returns {Promise<Object>} Résultat de l'analyse
   * @throws {Error} Si l'analyse échoue
   */
  async analyzeResume(resumeText, prompt) {
    if (!this.isReady()) {
      throw new Error(
        "Le service IA n'est pas disponible. Connectez-vous à Puter."
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
      const response = await this.aiProvider.chat(
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

      if (result.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (error) {
      console.error("❌ Erreur Puter AI:", error);

      const errorMessage = error?.message || String(error) || "Erreur inconnue";

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
      throw error;
    }
  }
}

export const aiService = new AIService();
