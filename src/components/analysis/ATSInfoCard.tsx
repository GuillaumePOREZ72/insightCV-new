/**
 * Composant ATSInfoCard - Affiche les informations sur l'ATS
 *
 * @param {Object} props
 * @param {string} [props.title="Qu'est-ce qu'un ATS ?"] - Titre
 * @param {React.ReactNode} [props.content] - Contenu personnalisable
 */
export default function ATSInfoCard({
  title = "Qu'est-ce qu'un ATS?",
  content,
}) {
  const DEFAULT_CONTENT = (
    <>
      <strong className="text-violet-300">
        Les systèmes de suivi des candidatures (ATS)
      </strong>{" "}
      sont des outils logiciels utilisés par 75% des employeurs pour filtrer
      automatiquement les CV avant examen humain. Ces systèmes recherchent des
      mots-clés, une mise en forme appropriée et des qualifications pertinentes
      pour classer les candidats. Si votre CV n'est pas compatible ATS, il
      pourrait ne jamais atteindre un recruteur humain.
    </>
  );

  return (
    <div>
      {" "}
      <div className="info-box-violet mb-4">
        <div className="flex items-start gap-3 mb-3">
          <div>
            <h3 className="text-violet-300 font-semibold mb-2">{title}</h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              {content || DEFAULT_CONTENT}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
