/**
 * Composant KeywordsCard - Affiche les mots-clés recommandés
 *
 * @param {Object} props
 * @param {string[]} props.keywords - Liste des mots-clés
 * @param {string} [props.title="Mots-clés recommandés"] - Titre
 * @param {string} [props.icon="🔑"] - Icône
 * @param {string} [props.tip] - Conseil personnalisé
 */

export default function KeywordCard({
  keywords = [],
  title = "Mots-clés recommandés",
  icon = "🔑",
  tip,
}) {
  const DEFAULT_TIP =
    "Pensez à incorporer ces mots-clés naturellement dans votre CV pour améliorer la compatibilité ATS et augmenter vos chances d'être remarqué par les recruteurs.";
  return (
    <div className="section-card group">
      <div className="flex items-center gap-3 mb-6">
        <div className="icon-container bg-blue-500/20">
          <span className="text-lg">{icon}</span>
        </div>
        <h2 className="text-blue-400 font-bold text-xl">{title}</h2>
      </div>
      {/* Liste des mots-clés */}
      <div className="flex flex-wrap gap-3 mb-4">
        {keywords.map((keyword, index) => (
          <span key={index} className="keyword-tag group/item">
            {keyword}
          </span>
        ))}
      </div>

      {/* Conseil */}
      <div className="info-box-blue">
        <p className="text-slate-300 text-sm leading-relaxed flex items-start gap-2">
          <span className="text-lg mt-0.5">💡</span>
          <span>{tip || DEFAULT_TIP}</span>
        </p>
      </div>
    </div>
  );
}
