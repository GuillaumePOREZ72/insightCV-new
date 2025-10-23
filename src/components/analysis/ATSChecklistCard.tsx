import { ChecklistItem } from "../../types/analysis";

/**
 * Props du composant ATSChecklistCard
 */
interface ATSChecklistCardProps {
  items?: ChecklistItem[];
  title?: string;
  icon?: string;
}

/**
 * Composant ATSChecklistCard - Affiche la checklist de compatibilité ATS
 *
 * @param {Array<{label: string, present: boolean}>} props.checklist - Liste des éléments ATS
 * @param {string} [props.title="Liste de compatibilité ATS"] - Titre
 * @param {string} [props.icon="🤖"] - Icône
 */

export default function ATSChecklistCard({
  items = [],
  title = "Liste de compatibilité ATS",
  icon = "🤖",
}: ATSChecklistCardProps) {
  return (
    <div className="info-box-violet">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-violet-400 text-lg">{icon}</span>
        <h3 className="text-lg font-semibold text-violet-300">{title}</h3>
      </div>
      {/* Liste de la checklist */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2 text-slate-200">
            <span className="text-lg">{item.present ? "✅" : "❌"}</span>
            <span
              className={`${
                item.present ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-slate-400 text-sm">
            Aucun élément de checklist disponible
          </p>
        )}
      </div>
    </div>
  );
}
