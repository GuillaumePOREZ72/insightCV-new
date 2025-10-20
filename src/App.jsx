import { METRIC_CONFIG } from "../constants";
import { useResumeAnalysis } from "./hooks/useResumeAnalysis";
import Header from "./components/layout/Header";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ErrorMessage from "./components/common/ErrorMessage";

function App() {
  const { state, analyzeFile, reset, hasResults, isReady } =
    useResumeAnalysis();

  return (
    <div className="min-h-screen bg-main-gradient p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* ==================== EN-TÊTE ====================  */}
        <Header />

        {/* ==================== AFFICHAGE ERREUR ==================== */}
        {state.error && <ErrorMessage message={state.error} onRetry={reset} />}

        {/* ==================== ZONE DE TÉLÉCHARGEMENT ==================== */}
        {!state.uploadedFile && (
          <div className="upload-area">
            <div className="upload-zone">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">📄</div>
              <h3 className="text-xl sm:text-2xl text-slate-200 mb-2">
                Téléchargez votre CV
              </h3>
              <p className="text-slate-400 mb-4 sm:mb-6 text-sm sm:text-base">
                Fichiers PDF uniquement • Analyse instantanée
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => analyzeFile(e.target.files[0])}
                disabled={!isReady}
                id="file-upload"
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className={`inline-block btn-primary ${
                  !isReady ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Choisir un fichier PDF
              </label>
            </div>
          </div>
        )}

        {/* ==================== ÉCRAN DE CHARGEMENT ==================== */}
        {state.isLoading && (
          <LoadingSpinner message="Analyse de votre CV en cours" />
        )}

        {/* ==================== RÉSULTATS DE L'ANALYSE ==================== */}
        {hasResults && (
          <div className="space-y-6 p-4 sm:px-8 lg:px-16">
            {/* Card: Fichier analysé */}
            <div className="file-upload-card">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="icon-container-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
                    <span className="text-3xl">📄</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-500 mb-1">
                      Analyse terminée
                    </h3>
                    <p className="text-slate-300 text-sm break-all">
                      {state.uploadedFile.name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={reset} className="btn-secondary">
                    🔃 Nouvelle analyse
                  </button>
                </div>
              </div>
            </div>

            {/* Card: Score global */}
            <div className="score-card">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-2xl">🏆</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Score global
                  </h2>
                </div>
                <div className="relative">
                  <p className="text-6xl sm:text-8xl font-extrabold text-cyan-400 drop-shadow-lg">
                    {state.analysis.overallScore || "7"}
                  </p>
                </div>
                <div
                  className={`inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full ${
                    parseInt(state.analysis.overallScore) >= 8
                      ? "score-status-excellent"
                      : parseInt(state.analysis.overallScore) >= 6
                      ? "score-status-good"
                      : "score-status-improvement"
                  }`}
                >
                  <span>
                    {parseInt(state.analysis.overallScore) >= 8
                      ? "🌟"
                      : parseInt(state.analysis.overallScore) >= 6
                      ? "⭐"
                      : "📈"}
                  </span>
                  <span className="font-semibold text-lg">
                    {parseInt(state.analysis.overallScore) >= 8
                      ? "Excellent"
                      : parseInt(state.analysis.overallScore) >= 6
                      ? "Bon"
                      : "À améliorer"}
                  </span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className={`
                  h-full transition-all duration-1000 ease-out shadow-sm ${
                    parseInt(state.analysis.overallScore) >= 8
                      ? "progress-excellent"
                      : parseInt(state.analysis.overallScore) >= 6
                      ? "progress-good"
                      : "progress-improvement"
                  }
                  `}
                  style={{
                    width: `${
                      (parseInt(state.analysis.overallScore) / 10) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-slate-400 text-sm mt-3 text-center font-medium">
                Score basé sur la qualité du contenu, la mise en forme et
                l'utilisation des mots-clés
              </p>
            </div>

            {/* Card: Points forts et Améliorations */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="feature-card-green group">
                <div className="bg-green-500/20 icon-container-lg mx-auto mb-3 group-hover:bg-green-400/30 transition-colors">
                  <span className="text-green-300 text-xl">✔️</span>
                </div>
                <h4 className="text-green-300 text-sm uppercase tracking-wide mb-3">
                  Points forts
                </h4>
                <div className="space-y-2 text-left">
                  {state.analysis.strengths
                    .slice(0, 3)
                    .map((strength, index) => (
                      <div key={index} className="list-item-green">
                        <span className="text-green-400 text-sm mt-0.5">•</span>
                        <span className="text-slate-200 font-medium text-sm leading-relaxed">
                          {strength}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="feature-card-orange group">
                <div className="bg-orange-500/20 icon-container-lg mx-auto mb-3 group-hover:bg-orange-400/30 transition-colors">
                  <span className="text-orange-300 text-xl">⚡</span>
                </div>
                <h4 className="text-orange-300 text-sm uppercase tracking-wide mb-3">
                  Améliorations principales
                </h4>
                <div className="space-y-2 text-left">
                  {state.analysis.improvements
                    .slice(0, 3)
                    .map((improvement, index) => (
                      <div key={index} className="list-item-orange">
                        <span className="text-orange-400 text-sm mt-0.5">
                          •
                        </span>
                        <span className="text-slate-200 font-medium text-sm leading-relaxed">
                          {improvement}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Card: Résumé exécutif */}
            <div className="section-card group">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container bg-purple-500/20">
                  <span className="text-purple-300 text-lg">📋</span>
                </div>
                <h4 className="text-xl font-bold text-white">
                  Résumé exécutif
                </h4>
              </div>
              <div className="summary-box">
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {state.analysis.summary}
                </p>
              </div>
            </div>

            {/* Card: Indicateurs de performance */}
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
                    state.analysis.performanceMetrics?.[cfg.key] ??
                    cfg.defaultValue;
                  return (
                    <div key={i} className="group/item">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{cfg.icon}</span>
                          <p className="text-slate-200 font-medium">
                            {cfg.label}
                          </p>
                        </div>
                        <span className="text-slate-300 font-bold">
                          {value}/10
                        </span>
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

            {/* Card: Informations sur le CV (Actions et Conseils) */}
            <div className="section-card group">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container bg-purple-500/20">
                  <span className="text-lg text-purple-300">🔍</span>
                </div>
                <h2 className="text-xl font-bold text-purple-400">
                  Informations sur le CV
                </h2>
              </div>
              <div className="grid gap-4">
                <div className="info-box-cyan group/item">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg text-cyan-400">🎯</span>
                    <h3 className="text-cyan-300 font-semibold">
                      Actions à entreprendre
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {(
                      state.analysis.actionItems || [
                        "Optimiser le placement des mots-clés pour un meilleur score ATS",
                        "Enrichir le contenu avec des réalisations quantifiables",
                        "Considérer la terminologie spécifique au secteur",
                      ]
                    ).map((item, index) => (
                      <div className="list-item-cyan" key={index}>
                        <span className="text-cyan-400">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="info-box-emerald group/item">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">💡</span>
                    <h3 className="text-emerald-300 font-semibold">
                      Conseils de pro
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {(
                      state.analysis.proTips || [
                        "Utiliser des verbes d'action pour commencer les puces",
                        "Garder les descriptions concises et percutantes",
                        "Adapter les mots-clés aux descriptions de poste spécifiques",
                      ]
                    ).map((tip, index) => (
                      <div key={index} className="list-item-emerald">
                        <span className="text-emerald-400">•</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card: Optimisation ATS */}
            <div className="section-card group">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container bg-violet-500/20">
                  <span className="text-lg">🤖</span>
                </div>
                <h2 className="text-violet-400 font-bold text-xl">
                  Optimisation ATS
                </h2>
              </div>

              <div className="info-box-violet mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <div>
                    <h3 className="text-violet-300 font-semibold mb-2">
                      Qu'est-ce qu'un ATS ?
                    </h3>
                    <p className="text-slate-200 text-sm leading-relaxed">
                      <strong className="text-violet-300">
                        Les systèmes de suivi des candidatures (ATS)
                      </strong>{" "}
                      sont des outils logiciels utilisés par 75% des employeurs
                      pour filtrer automatiquement les CV avant examen humain.
                      Ces systèmes recherchent des mots-clés, une mise en forme
                      appropriée et des qualifications pertinentes pour classer
                      les candidats. Si votre CV n'est pas compatible ATS, il
                      pourrait ne jamais atteindre un recruteur humain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="info-box-violet">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-violet-400 text-lg">🤖</span>
                  <h3 className="text-lg font-semibold text-violet-300">
                    Liste de compatibilité ATS
                  </h3>
                </div>
                <div className="space-y-2">
                  {(state.presenceChecklist || []).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-slate-200"
                    >
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
            </div>

            {/* Card: Mots-clés recommandés */}
            <div className="section-card group">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container bg-blue-500/20">
                  <span className="text-lg">🔑</span>
                </div>
                <h2 className="text-blue-400 font-bold text-xl">
                  Mots-clés recommandés
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {state.analysis.keywords.map((k, i) => (
                  <span key={i} className="keyword-tag group/item">
                    {k}
                  </span>
                ))}
              </div>
              <div className="info-box-blue">
                <p className="text-slate-300 text-sm leading-relaxed flex items-start gap-2">
                  <span className="text-lg mt-0.5">💡</span>
                  Pensez à incorporer ces mots-clés naturellement dans votre CV
                  pour améliorer la compatibilité ATS et augmenter vos chances
                  d'être remarqué par les recruteurs.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
