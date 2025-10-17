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
   * Valide qu'un fichier est un PDF acceptable
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

  
}
