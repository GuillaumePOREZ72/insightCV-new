/**
 * Composant ImprovementsCard - Affiche les améliorations suggérées
 *
 * @param {Object} props
 * @param {string[]} props.improvements - Liste des points forts
 * @param {number} [props.maxItems=3] - Nombre maximum d'items à afficher
 */

export default function ImprovementsCard({ improvements, maxItems = 3 }) {
  return (
    <div>
      {" "}
      <div className="feature-card-orange group">
        <div className="bg-orange-500/20 icon-container-lg mx-auto mb-3 group-hover:bg-orange-400/30 transition-colors">
          <span className="text-orange-300 text-xl">⚡</span>
        </div>
        <h4 className="text-orange-300 text-sm uppercase tracking-wide mb-3">
          Améliorations principales
        </h4>
        <div className="space-y-2 text-left">
          {improvements.slice(0, maxItems).map((improvement, index) => (
            <div key={index} className="list-item-orange">
              <span className="text-orange-400 text-sm mt-0.5">•</span>
              <span className="text-slate-200 font-medium text-sm leading-relaxed">
                {improvement}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
