/**
 * Composant FileCard - Affiche le fichier analysé
 *
 * @param {Object} props
 * @param {string} props.fileName - Nom du fichier uploadé
 * @param {Function} props.onReset - Callback pour recommencer une analyse
 */

export default function FileCard({ fileName, onReset }) {
  return (
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
            <p className="text-slate-300 text-sm break-all">{fileName}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onReset} className="btn-secondary">
            🔃 Nouvelle analyse
          </button>
        </div>
      </div>
    </div>
  );
}
