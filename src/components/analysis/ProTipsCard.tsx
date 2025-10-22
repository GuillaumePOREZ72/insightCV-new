interface ProTipsCardProps {
  tips: string[];
  title?: string;
  icon?: string;
}

/**
 * Composant ProTipsCard - Affiche les conseils professionnels
 * @param {string[]} props.tips - Liste des conseils
 * @param {string} [props.title="Conseils de pro"] - Titre
 * @param {string} [props.icon="💡"] - Icône
 */

export default function ProTipsCard({
  tips,
  title = "Conseils d'expert",
  icon = "💡",
}: ProTipsCardProps) {
  const DEFAULT_TIPS = [
    "Utiliser des verbes d'action pour commencer les puces",
    "Garder les descriptions concises et percutantes",
    "Adapter les mots-clés aux descriptions de poste spécifiques",
  ];

  const displayTips = tips.length > 0 ? tips : DEFAULT_TIPS;

  return (
    <div>
      {" "}
      <div className="info-box-emerald group/item">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-lg text-emerald-400">{icon}</span>
          <h3 className="text-emerald-300 font-semibold">{title}</h3>
        </div>
        <div className="space-y-2">
          {displayTips.map((tip, index) => (
            <div className="list-item-emerald" key={index}>
              <span className="text-emerald-400">•</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
