/**
 * Déclarations de types pour l'API Puter
 *
 * Puter n'a pas de package @types/, donc on déclare manuellement.
 */

/**
 * Message de chat pour l'API IA
 */
interface PuterChatMessage {
  role: "system" | "user";
  content: string;
}

/**
 * Options pour l'appel à l'IA
 */
interface PuterChatOptions {
  model?: string;
  temperature?: number;
}

/**
 * Réponse de l'API Puter AI
 */
interface PuterChatResponse {
  message?: {
    content: string;
  };
}

/**
 * Provider IA de Puter
 */
interface PuterAIProvider {
  chat(
    messages: PuterChatMessage[],
    options?: PuterChatOptions
  ): Promise<PuterChatResponse | string>;
}

/**
 * Service d'authentification Puter
 */
interface PuterAuth {
  isSignedIn(): boolean;
}

/**
 * Interface globale Puter
 */
interface Puter {
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

export {};
