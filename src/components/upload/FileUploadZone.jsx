/**
 * Composant FileUploadZone - Zone d'upload de fichier
 *
 * @param {Object} props
 * @param {Function} props.onFileSelect - Callback appelé avec le fichier sélectionné
 * @param {boolean} [props.disabled=false] - Si true, désactive l'upload
 * @param {string} [props.title] - Titre personnalisable
 * @param {string} [props.description] - Description personnalisable
 */

export default function FileUploadZone({
  onFileSelect,
  disabled = false,
  title = "Téléchargez votre CV",
  description = "Fichiers PDF uniquement • Analyse instantanée",
}) {
  
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="upload-area">
      <div className="upload-zone">
        <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">📄</div>
        <h3 className="text-xl sm:text-2xl text-slate-200 mb-2">{title}</h3>
        <p className="text-slate-400 mb-4 sm:mb-6 text-sm sm:text-base">
          {description}
        </p>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={disabled}
          id="file-upload"
          className="hidden"
          aria-label="Sélectionner un fichier PDF"
        />
        <label
          htmlFor="file-upload"
          className={`inline-block btn-primary ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Choisir un fichier PDF
        </label>
      </div>
    </div>
  );
}
