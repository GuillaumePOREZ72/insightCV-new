/**
 * Composant LoadingSpinner - Indicateur de chargement
 *
 * @param {Object} props
 * @param {string} props.message - Message à afficher
 * @param {string} props.description - Description optionnelle
 */

export default function LoadingSpinner({
  message = "Analyse de votre CV en cours",
  description = "Veuillez patienter pendant que l'IA examine votre CV...",
}) {
  return (
    <div className="p-6 sm:p-8 max-w-md mx-auto">
      <div className="text-center">
        <div className="loading-spinner"></div>
        <h3 className="text-lg sm:text-xl text-slate-200 mb-2">{message}</h3>
        {description && (
          <p className="text-slate-400 text-sm sm:text-base">{description}</p>
        )}
      </div>
    </div>
  );
}
