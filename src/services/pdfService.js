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
}
