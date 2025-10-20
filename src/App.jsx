import { METRIC_CONFIG } from "../constants";
import { useResumeAnalysis } from "./hooks/useResumeAnalysis";
import Header from "./components/layout/Header";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ErrorMessage from "./components/common/ErrorMessage";
import FileUploadZone from "./components/upload/FileUploadZone";
import FileCard from "./components/upload/FileCard";
import SummaryCard from "./components/analysis/SummaryCard";
import StrengthsCard from "./components/analysis/StrengthsCard";
import ImprovementsCard from "./components/analysis/ImprovementsCard";
import ActionsCard from "./components/analysis/ActionsCard";
import ProTipsCard from "./components/analysis/ProTipsCard";
import ATSInfoCard from "./components/analysis/ATSInfoCard";

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
          <FileUploadZone onFileSelect={analyzeFile} disabled={!isReady} />
        )}

        {/* ==================== ÉCRAN DE CHARGEMENT ==================== */}
        {state.isLoading && (
          <LoadingSpinner message="Analyse de votre CV en cours" />
        )}

        {/* ==================== RÉSULTATS DE L'ANALYSE ==================== */}
        {hasResults && (
          <div className="space-y-6 p-4 sm:px-8 lg:px-16">
            {/* Card: Fichier analysé */}
            <FileCard fileName="{state.uploadedFile.name}" onReset={reset} />

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
              <StrengthsCard strengths={state.analysis.strengths} />
              <ImprovementsCard improvements={state.analysis.improvements} />
            </div>

            {/* Card: Résumé exécutif */}
            <SummaryCard summary={state.analysis.summary} />

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
                <ActionsCard actions={state.analysis.actionItems} />
                <ProTipsCard tips={state.analysis.proTips} />
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

              <ATSInfoCard />

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
