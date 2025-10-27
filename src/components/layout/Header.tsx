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
  title = "InsightCV",
  subtitle = "Téléchargez votre CV PDF et obtenez un retour instantané par IA",
}: HeaderProps) {
  return (
    <div className="text-center mb-8">
      {/* Logo + Titre côte à côte */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-24">
          {" "}
          <img
            src="/logo.png"
            alt="InsightCV"
            className="h-full object-contain"
          />
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-linear-to-r from-cyan-300 via-teal-300 to-sky-300 bg-clip-text text-transparent h-24 flex items-center">
          {title}
        </h1>
      </div>
      <p className="text-slate-300 text-sm sm:text-base">{subtitle}</p>
    </div>
  );
}
