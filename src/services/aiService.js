/**
 * Service d'analyse IA via Puter
 */
export class AIService {
  constructor(aiProvider = window.puter?.ai) {
    this.aiProvider = aiProvider;
  }

  /**
   * Vérifie que le provider IA est disponible
   * @returns {boolean} true si l'IA est prête
   */
  isReady() {
    return !!this.aiProvider?.chat;
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
        "Le service IA n'est pas disponible. Réessayez dans quelques secondes."
      );
    }

    const fullPrompt = prompt.replace("{{DOCUMENT_TEXT}}", resumeText);

    try {
      const response = await this.aiProvider.chat(
        [
          {
            role: "system",
            content: "Vous êtes un expert en révision de CV...",
          },
          {
            role: "user",
            content: fullPrompt,
          },
        ],
        {
          model: "gpt-4o",
        }
      );

      const content =
        typeof response === "string"
          ? response
          : response.message?.content || "";

      const result = this.parseResponse(content);

      if (result.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (error) {
      // Erreurs réseau ou timeout
      if (
        error.message.includes("network") ||
        error.message.includes("timeout")
      ) {
        throw new Error("Problème de connexion. Vérifiez votre réseau.");
      }
      throw error;
    }
  }
}

export const aiService = new AIService();
