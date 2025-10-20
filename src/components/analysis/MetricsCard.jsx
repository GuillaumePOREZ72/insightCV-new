
export default function MetricsCard() {
  return (
    <div className="section-card group">
      <div className="flex items-center gap-3 mb-6">
        <div className="icon-container bg-cyan-500/20">
          <span className="text-cyan-300 text-lg">📊</span>
        </div>
        <h4 className="text-xl font-bold text-white">
          Indicateurs de performance
        </h4>
      </div>
      <div className="space-y-4">
        {METRIC_CONFIG.map((cfg, i) => {
          const value =
            state.analysis.performanceMetrics?.[cfg.key] ?? cfg.defaultValue;
          return (
            <div key={i} className="group/item">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cfg.icon}</span>
                  <p className="text-slate-200 font-medium">{cfg.label}</p>
                </div>
                <span className="text-slate-300 font-bold">{value}/10</span>
              </div>
              <div className="progress-bar-small">
                <div
                  className={`h-full bg-gradient-to-r ${cfg.colorClass} rounded-full  transition-all duration-1000 ease-out group-hover/item:shadow-lg ${cfg.shadowClass}`}
                  style={{ width: `${(value / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
