/**
 * Composant Header - En-tête de l'application
 *
 * @param {Object} props
 * @param {string} props.title="CVBoost" - Titre principal
 * @param {string} props.subtitle - Sous-titre descriptif
 */

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({
  title = "CVBoost",
  subtitle = "Téléchargez votre CV PDF et obtenez un retour instantané par IA",
}: HeaderProps) {
  return (
    <div className="text-center mb-6">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-300 via-teal-300 to-sky-300 bg-clip-text text-transparent mb-4">
        {title}
      </h1>
      <p className="text-slate-300 text-sm sm:text-base">{subtitle}</p>
    </div>
  );
}
