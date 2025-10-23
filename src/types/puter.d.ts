/**
 * Déclarations de types pour l'API Puter
 *
 * Puter n'a pas de package @types/, donc on déclare manuellement.
 */

/**
 * Message de chat pour l'API IA
 */
export interface PuterChatMessage {
  role: "system" | "user";
  content: string;
}

/**
 * Options pour l'appel à l'IA
 */
export interface PuterChatOptions {
  model?: string;
  temperature?: number;
}

/**
 * Réponse de l'API Puter AI
 */
export interface PuterChatResponse {
  message?: {
    content: string;
  };
}

/**
 * Provider IA de Puter
 */
export interface PuterAIProvider {
  chat(
    messages: PuterChatMessage[],
    options?: PuterChatOptions
  ): Promise<PuterChatResponse | string>;
}

/**
 * Service d'authentification Puter
 */
export interface PuterAuth {
  isSignedIn(): boolean;
}

/**
 * Interface globale Puter
 */
export interface Puter {
  ai?: PuterAIProvider;
  auth?: PuterAuth;
}

/**
 * Extension de l'objet Window avec Puter
 */
declare global {
  interface Window {
    puter?: Puter;
  }
}


