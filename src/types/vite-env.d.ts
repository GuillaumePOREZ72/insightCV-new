/// <reference types="vite/client" />

/**
 * Déclaration de types pour les imports spéciaux Vite
 */

// Déclaration pour les imports avec ?url
declare module "*?url" {
  const url: string;
  export default url;
}

// Autres syntaxes Vite utiles
declare module "*?raw" {
  const content: string;
  export default content;
}

declare module "*?worker" {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
