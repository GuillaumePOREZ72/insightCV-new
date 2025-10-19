import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * Service d'extraction de texte depuis un PDF
 *
 * Ce service isole toute la logique PDF de React.
 * IL est testable et réutilisable indépendamment.
 */
export class PDFService {
  constructor() {}

  /**
   * Valide qu'un fichier est un PDF valide
   * @param {File} file - Fichier à valider
   * @throws {Error} Si le fichier est invalide
   * @returns {boolean} true si valide
   */
  validateFile(file) {
    if (!file) {
      throw new Error("Aucun fichier fourni.");
    }

    if (file.type !== "application/pdf") {
      throw new Error("Le fichier doit être au format PDF");
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      throw new Error("Le fichier est trop volumineux (max 10MB)");
    }

    return true;
  }

  /**
   * Extrait le texte brut d'un fichier PDF
   * @param {File} file - Fichier PDF
   * @returns {Promise<string>} Texte extrait
   */
  async extractText(file) {
    this.validateFile(file);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      // Extraction parallèle de toutes les pages
      const pageTexts = await Promise.all(
        Array.from({ length: pdf.numPages }, (_, index) =>
          this.extractPageText(pdf, index + 1)
        )
      );

      const fullText = pageTexts.join("\n").trim();

      if (!fullText) {
        throw new Error("Le PDF ne contient aucun texte extractible");
      }
      return fullText;
    } catch (error) {
      if (error.message.includes("Invalid PDF")) {
        throw new Error("Le fichier PDF est corrompu ou invalide");
      }
      throw error;
    }
  }

  /**
   * Extrait le texte brut d'une page spécifique
   * @private - Méthode interne, pas utilisée directement
   */
  async extractPageText(pdf, pageNumber) {
    const page = pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    return textContent.items.map((item) => item.str).join(" ");
  }
}

// instance singleton
export const pdfService = new PDFService();
