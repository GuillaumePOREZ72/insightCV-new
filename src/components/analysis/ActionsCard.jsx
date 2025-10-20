/**
 * Composant ActionsCard - Affiche les actions à entreprendre
 *
 * @param {Object} props
 * @param {string[]} props.actions - Liste des actions
 * @param {string} [props.title="Actions à entreprendre"] - Titre
 * @param {string} [props.icon="🎯"] - Icône
 */

export default function ActionsCard({
  actions = [],
  title = "Actions à entreprendre",
  icon = "🎯",
}) {
  const DEFAULT_ACTIONS = [
    "Optimiser le placement des mots-clés pour un meilleur score ATS",
    "Enrichir le contenu avec des réalisations quantifiables",
    "Considérer la terminologie spécifique au secteur",
  ];

  const displayActions = actions.length > 0 ? actions : DEFAULT_ACTIONS;

  return (
    <div>
      {" "}
      <div className="info-box-cyan group/item">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-lg text-cyan-400">{icon}</span>
          <h3 className="text-cyan-300 font-semibold">{title}</h3>
        </div>
        <div className="space-y-2">
          {displayActions.map((item, index) => (
            <div className="list-item-cyan" key={index}>
              <span className="text-cyan-400">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
