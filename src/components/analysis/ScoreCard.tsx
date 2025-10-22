interface ScoreRange {
  min: number;
  title: string;
  description: string;
  gradient: string;
}

interface ScoreCardProps {
  score: number;
}

/**
 * Configuration des ranges des score
 * Définit les seuils et messages pour chaque niveau
 */
const SCORE_RANGES: ScoreRange[] = [
  {
    min: 8,
    title: "🎉 Excellent CV !",
    description:
      "Votre CV est très bien optimisé pour les ATS et les recruteurs.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    min: 6,
    title: "👍 Bon CV !",
    description: "Votre CV est solide avec quelques optimisations possibles.",
    gradient: "from-orange-400 to-amber-500",
  },
  {
    min: 0,
    title: "⚠️ A améliorer",
    description:
      "Votre CV nécessite des améliorations pour maximiser vos chances.",
    gradient: "from-red-400 to-rose-500",
  },
];

/**
 * Détermine le statut du score basé sur sa valeur
 * @param score - Score de 0 à 10
 * @returns Configuration du statut (label, message, gradient)
 */
function getScoreStatus(score: number): ScoreRange {
  const status = SCORE_RANGES.find((range) => score >= range.min);
  return status || SCORE_RANGES[SCORE_RANGES.length - 1];
}

/**
 * Composant ScoreCard - Affiche le score global du CV
 * @param {number} props.score - Score de 0 à 10
 */
export default function ScoreCard({ score }: ScoreCardProps) {
  const status = getScoreStatus(score);
  return (
    <div className="score-card">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Cercle du score*/}
        <div className="score-circle">
          <div
            className={`text-5xl sm:text-6xl font-black bg-gradient-to-br ${status.gradient} bg-clip-text text-transparent`}
          >
            {score}
            <span className="text-3xl">/10</span>
          </div>
          <div className="text-slate-400 text-xs sm:text-sm mt-1 uppercase tracking-wider">
            Score global
          </div>
        </div>

        {/* Statut et message */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {status.title}
          </h3>
          <p className="text-slate-300 text-sm sm:text-base">
            {status.description}
          </p>
        </div>
      </div>
    </div>
  );
}
