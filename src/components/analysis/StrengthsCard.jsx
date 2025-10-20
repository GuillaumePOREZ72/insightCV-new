/**
 * Composant StrengthsCard - Affiche les points forts du CV
 *
 * @param {Object} props
 * @param {string[]} props.strengths - Liste des points forts
 * @param {number} [props.maxItems=3] - Nombre maximum d'items à afficher
 */

export default function StrengthsCard({ strengths, maxItems = 3 }) {
  return (
    <div>
      {" "}
      <div className="feature-card-green group">
        <div className="bg-green-500/20 icon-container-lg mx-auto mb-3 group-hover:bg-green-400/30 transition-colors">
          <span className="text-green-300 text-xl">✔️</span>
        </div>
        <h4 className="text-green-300 text-sm uppercase tracking-wide mb-3">
          Points forts
        </h4>
        <div className="space-y-2 text-left">
          {strengths.slice(0, maxItems).map((strength, index) => (
            <div key={index} className="list-item-green">
              <span className="text-green-400 text-sm mt-0.5">•</span>
              <span className="text-slate-200 font-medium text-sm leading-relaxed">
                {strength}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
