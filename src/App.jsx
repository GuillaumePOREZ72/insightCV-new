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
import ScoreCard from "./components/analysis/ScoreCard";
import MetricsCard from "./components/analysis/MetricsCard";

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
            <FileCard fileName={state.uploadedFile.name} onReset={reset} />

            {/* Card: Score global */}
            <ScoreCard score={state.analysis.overallScore} />

            {/* Card: Points forts et Améliorations */}
            <div className="grid sm:grid-cols-2 gap-4">
              <StrengthsCard strengths={state.analysis.strengths} />
              <ImprovementsCard improvements={state.analysis.improvements} />
            </div>

            {/* Card: Résumé exécutif */}
            <SummaryCard summary={state.analysis.summary} />

            {/* Card: Indicateurs de performance */}
            <MetricsCard metrics={state.analysis.performanceMetrics} />

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

             
            </div>

            {/* Card: Mots-clés recommandés */}
            
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
