import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";
import {
  PDFDocumentProxy,
  PDFPageProxy,
  TextItem,
} from "pdfjs-dist/types/src/display/api";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * Service d'extraction de texte depuis un PDF
 *
 * Ce service isole toute la logique PDF de React.
 */
export class PDFService {
  static readonly MAX_FILE_SIZE: number = 10 * 1024 * 1024;
  static readonly ALLOWED_MIME_TYPE = "application/pdf" as const;

  constructor() {}

  /**
   * Valide qu'un fichier est un PDF valide
   * @param {File} file - Fichier à valider
   * @throws {Error} Si le fichier est invalide
   * @returns {boolean} true si valide
   */
  validateFile(file: File): boolean {
    if (!file) {
      throw new Error("Aucun fichier fourni.");
    }

    if (file.type !== PDFService.ALLOWED_MIME_TYPE) {
      throw new Error("Le fichier doit être au format PDF");
    }

    if (file.size > PDFService.MAX_FILE_SIZE) {
      const maxMB = PDFService.MAX_FILE_SIZE / (1024 * 1024);
      throw new Error(`Le fichier est trop volumineux (max ${maxMB} MB)`);
    }

    return true;
  }

  /**
   * Extrait le texte brut d'un fichier PDF
   * @param {File} file - Fichier PDF
   * @returns {Promise<string>} Texte extrait
   */
  async extractText(file: File): Promise<string> {
    this.validateFile(file);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf: PDFDocumentProxy = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("Invalid PDF")) {
          throw new Error("Le fichier PDF est corrompu ou invalide");
        }
        throw error;
      }
      throw new Error("Erreur inconnue lors de l'extraction du PDF");
    }
  }

  /**
   * Extrait le texte d'une page spécifique
   * @private
   * @param {PDFDocumentProxy} pdf - Document PDF chargé
   * @param {number} pageNumber - Numéro de la page (commence à 1)
   * @returns {Promise<string>} Texte de la page
   */
  async extractPageText(
    pdf: PDFDocumentProxy,
    pageNumber: number
  ): Promise<string> {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    return textContent.items
      .map((item) => {
        if ("str" in item) {
          return item.str;
        }
        return "";
      })
      .join(" ");
  }
}

// instance singleton
export const pdfService = new PDFService();
