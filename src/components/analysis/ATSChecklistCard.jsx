/**
 * Composant ATSChecklistCard - Affiche la checklist de compatibilité ATS
 *
 * @param {Object} props
 * @param {Array<{label: string, present: boolean}>} props.checklist - Liste des éléments ATS
 * @param {string} [props.title="Liste de compatibilité ATS"] - Titre
 * @param {string} [props.icon="🤖"] - Icône
 */

export default function ATSChecklistCard({
  checklist = [],
  title = "Liste de compatibiloté ATS",
  icon = "🤖",
}) {
  return (
    <div className="info-box-violet">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-violet-400 text-lg">{icon}</span>
        <h3 className="text-lg font-semibold text-violet-300">{title}</h3>
      </div>
      {/* Liste de la checklist */}
      <div className="space-y-2">
        {checklist.map((item, index) => (
          <div key={index} className="flex items-start gap-2 text-slate-200">
            <span
              className={`${
                item.present ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {item.present ? "✅" : "❌"}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
