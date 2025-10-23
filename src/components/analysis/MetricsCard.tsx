import { METRIC_CONFIG } from "../../../constants";
import { PerformanceMetrics } from "../../types/analysis";

/**
 * Config d'une métrique individuelle (UI)
 */
interface MetricConfig {
  key: string;
  icon: string;
  label: string;
  defaultValue: number;
  colorClass: string;
  shadowClass: string;
}

/**
 * Props du composant MetricsCard
 */
interface MetricsCardProps {
  metrics: PerformanceMetrics;
  title?: string;
  icon?: string;
}

const typedConfig = METRIC_CONFIG as MetricConfig[];

/**
 * Composant MetricsCard - Affiche les indicateurs de performance
 * @param {Object} props.metrics - Objet contenant les scores (performanceMetrics)
 * @param {string} props.title="Indicateurs de performance" - Titre de la section
 * @param {string} props.icon - Icône de la section
 */

export default function MetricsCard({
  metrics,
  title = "Indicateurs de performance",
  icon = "📊",
}: MetricsCardProps) {
  return (
    <div className="section-card group">
      {/* En-tête de la setion */}
      <div className="flex items-center gap-3 mb-6">
        <div className="icon-container bg-blue-500/20">
          <span className="text-cyan-300 text-lg">{icon}</span>
        </div>
        <h4 className="text-xl font-bold text-blue-400">{title}</h4>
      </div>

      {/* Grid des métriques */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {typedConfig.map((metric) => {
          const value = metrics?.[metric.key] ?? metric.defaultValue;

          return (
            <div key={metric.key} className="metric-card group/item">
              {/* En-tête de la métrique */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{metric.icon}</span>
                <h3 className="text-slate-200 font-semibold text-sm">
                  {metric.label}
                </h3>
              </div>

              {/* Score */}
              <div className="flex items-center gap-2 mb-2">
                {" "}
                <span className="text-3xl font-black text-white">{value}</span>
                <span className="text-slate-400 text-lg mb-1">/10</span>
              </div>

              {/* Barre de progression */}
              <div className="progress-bar-small">
                <div
                  className={`h-full bg-gradient-to-r ${metric.colorClass} rounded-full  transition-all duration-500 ease-out group-hover/item:shadow-lg ${metric.shadowClass}`}
                  style={{ width: `${value * 10}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
