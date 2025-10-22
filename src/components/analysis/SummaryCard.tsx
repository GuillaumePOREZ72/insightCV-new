/**
 * Interface du composnat SummaryCard
 */
interface SummaryCardProps {
  summary: string;
  title?: string;
  icon?: string;
}

/**
 * Composant SummaryCard - Affiche le résumé exécutif de l'analyse
 * @param {string} props.summary - Texte du résumé
 * @param {string} props.title="Résumé exécutif" - Titre de la section
 * @param {string} props.icon="📋" - Icône à afficher
 */

export default function SummaryCard({
  summary,
  title = "Résumé exécutif",
  icon = "📋",
}: SummaryCardProps) {
  return (
    <div className="section-card group">
      <div className="flex items-center gap-3 mb-4">
        <div className="icon-container bg-purple-500/20">
          <span className="text-purple-300 text-lg">{icon}</span>
        </div>
        <h4 className="text-xl font-bold text-white">{title}</h4>
      </div>
      <div className="summary-box">
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
          {summary}
        </p>
      </div>
    </div>
  );
}
