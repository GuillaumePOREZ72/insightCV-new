/**
 * Composant ErrorMessage - Affichage des erreurs
 *
 * @param {Object} props
 * @param {string} props.message - Message d'erreur à afficher
 * @param {Function} props.onRetry - Callback au clic sur "Réessayer"
 * @param {string} [props.title="Erreur"] - Titre de l'erreur
 */

export default function ErrorMessage({ message, onRetry, title = "Erreur" }) {
  return (
    <div>
      <div className="max-w-2xl mx-auto mb-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">❌</span>
            <div>
              <h3 className="text-red-400 font-bold mb-1">{title}</h3>
              <p className="text-slate-200 text-sm">{message}</p>
              <button
                onClick={onRetry}
                className="mt-3 text-red-400 hover:text-red-300 text-sm font-medium"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
