import { ChecklistItem } from "./src/types/analysis";

/**
 * Configuration d'une métrique de performance
 */
export interface MetricConfigItem {
  key: string;
  label: string;
  defaultValue: number;
  colorClass: string;
  shadowClass: string;
  icon: string;
}

/**
 * Constantes de l'application
 */
const constants = {
  ANALYZE_RESUME_PROMPT: `Tout d'abord, déterminez si ce document est réellement un CV. Recherchez :
- Expérience professionnelle, historique de travail ou informations sur l'emploi
- Formation, diplômes ou informations académiques
- Compétences, qualifications ou compétences professionnelles
- Coordonnées et informations personnelles

Si ce n'est PAS un CV (par exemple, facture, reçu, contrat, article, manuel, etc.), répondez avec :
{
  "error": "Ce document ne semble pas être un CV. Veuillez télécharger un vrai CV contenant une expérience professionnelle, une formation et des sections de compétences."
}

Si c'est bien un CV, analysez-le en profondeur et fournissez un retour complet dans ce format JSON :
{
  "overallScore": "X/10",
  "strengths": [
    "point fort 1", 
    "point fort 2", 
    "point fort 3"
  ],
  "improvements": [
    "amélioration 1", 
    "amélioration 2", 
    "amélioration 3"
  ],
  "keywords": [
    "mot-clé 1", 
    "mot-clé 2", 
    "mot-clé 3"
  ],
  "summary": "Bref résumé général",
  "performanceMetrics": {
    "formatting": X,
    "contentQuality": X,
    "keywordUsage": X,
    "atsCompatibility": X,
    "quantifiableAchievements": X
  },
  "actionItems": [
    "action spécifique 1",
    "action spécifique 2", 
    "action spécifique 3"
  ],
  "proTips": [
    "conseil professionnel 1",
    "conseil professionnel 2",
    "conseil professionnel 3"
  ],
  "atsChecklist": [
    "exigence ats 1",
    "exigence ats 2", 
    "exigence ats 3"
  ]
}

Pour performanceMetrics, notez chaque domaine de 1 à 10 en fonction de :

- formatting: Mise en page, structure, attrait visuel, cohérence, lisibilité. Recherchez des sections nettes, un espacement approprié, des polices cohérentes, une apparence professionnelle
- contentQuality: Pertinence, réalisations, impact, clarté, complétude. Évaluez si le contenu est pertinent pour les postes ciblés, si les réalisations sont bien décrites et si les informations sont complètes
- keywordUsage: Termes de l'industrie, optimisation ATS, mots-clés de compétences, pertinence du poste. Vérifiez la terminologie spécifique à l'industrie, les compétences techniques, les noms de logiciels, les méthodologies et les mots-clés pertinents
- atsCompatibility: Formatage compatible ATS, structure analysable, titres appropriés. Évaluez si le CV utilise des en-têtes de section standard (Expérience, Formation, Compétences), évite les graphiques/images, a un formatage propre et est facilement analysable par les systèmes ATS
- quantifiableAchievements: Utilisation de chiffres, de pourcentages, de métriques dans les accomplissements. Recherchez des chiffres spécifiques, des pourcentages, des montants en euros, des délais, des tailles d'équipe, des portées de projet et des résultats mesurables

Pour atsCompatibility spécifiquement, soyez très strict et recherchez :
- En-têtes de section standard (Expérience, Formation, Compétences, Résumé, etc.)
- Formatage propre et simple sans graphiques, images ou mises en page complexes
- Utilisation appropriée de mots-clés pertinents pour l'industrie/le poste
- Réalisations quantifiées avec des chiffres et des métriques spécifiques
- Verbes d'action au début des points de puce
- Formatage cohérent dans tout le document
- Informations de contact clairement visibles
- Pas de tableaux, graphiques ou formatage complexe qui pourrait confondre les systèmes ATS

Pour atsChecklist, fournissez des exigences et améliorations spécifiques pour garantir que le CV passe avec succès les systèmes ATS.

Pour actionItems, fournissez des étapes spécifiques et concrètes que l'utilisateur peut prendre immédiatement pour améliorer son CV.

Pour proTips, donnez des conseils professionnels qui les aideront dans leur recherche d'emploi et l'optimisation de leur CV.

Texte du document :
{{DOCUMENT_TEXT}}`,
} as const;

export const METRIC_CONFIG: readonly MetricConfigItem[] = [
  {
    key: "formatting",
    label: "Mise en forme",
    defaultValue: 7,
    colorClass: "from-emerald-400 to-emerald-500",
    shadowClass: "group-hover/item:shadow-emerald-500/30",
    icon: "🎨",
  },
  {
    key: "contentQuality",
    label: "Qualité du contenu",
    defaultValue: 6,
    colorClass: "from-blue-400 to-blue-500",
    shadowClass: "group-hover/item:shadow-blue-500/30",
    icon: "📝",
  },
  {
    key: "atsCompatibility",
    label: "Compatibilité ATS",
    defaultValue: 6,
    colorClass: "from-violet-400 to-violet-500",
    shadowClass: "group-hover/item:shadow-violet-500/30",
    icon: "🤖",
  },
  {
    key: "keywordUsage",
    label: "Utilisation des mots-clés",
    defaultValue: 5,
    colorClass: "from-purple-400 to-purple-500",
    shadowClass: "group-hover/item:shadow-purple-500/30",
    icon: "🔍",
  },
  {
    key: "quantifiableAchievements",
    label: "Résultats quantifiés",
    defaultValue: 4,
    colorClass: "from-orange-400 to-orange-500",
    shadowClass: "group-hover/item:shadow-orange-500/30",
    icon: "📊",
  },
] as const;

/**
 * Construit une checklist de présence basée sur le texte du CV
 * @param text - Texte extrait du CV
 * @returns Liste des éléments vérifiés avec leur statut
 */
export const buildPresenceChecklist = (text: string): ChecklistItem[] => {
  const normalizedText = (text || "").toLowerCase();
  return [
    {
      label: "Titres de sections standard",
      present:
        /experience|education|skills|summary|objective|work history|professional experience|employment/.test(
          normalizedText
        ),
    },
    {
      label: "Informations de contact",
      present: /email|phone|linkedin|github|portfolio|@|\.com|\.net|\.org/.test(
        normalizedText
      ),
    },
    {
      label: "Mots-clés et compétences",
      present:
        /skills|technologies|tech skills|competencies|programming|software|tools|javascript|python|java|react|node|sql|html|css|aws|docker|kubernetes|agile|scrum|git|api|database|framework|library|language|technology|stack/.test(
          normalizedText
        ),
    },
    {
      label: "Réalisations quantifiées",
      present:
        /\d+%|\d+ percent|\d+ people|\d+ team|\d+ project|\d+ year|\d+ month|\d+ dollar|\$\d+|\d+ users|\d+ customers|\d+ revenue|\d+ growth|\d+ improvement|\d+ reduction|\d+ increase|\d+ decrease/.test(
          normalizedText
        ),
    },
    {
      label: "Verbes d'action",
      present:
        /developed|created|implemented|managed|led|designed|built|improved|increased|decreased|achieved|delivered|launched|optimized|streamlined|enhanced|established|coordinated|facilitated|orchestrated|spearheaded|pioneered|architected|engineered|deployed|maintained|supported|troubleshot|resolved|analyzed|researched|evaluated|assessed|planned|organized|executed|completed|finished|accomplished|generated|produced|created|developed|built|constructed|assembled|fabricated|manufactured|produced|yielded|resulted|caused|brought|about|led|to|contributed|to|helped|assisted|aided|supported|enabled|empowered|facilitated|promoted|encouraged|fostered|nurtured|cultivated|developed|grew|expanded|scaled|increased|boosted|enhanced|improved|upgraded|refined|polished|perfected|optimized|streamlined|simplified|clarified|organized|structured|arranged|systematized|standardized|formalized|institutionalized|established|founded|created|initiated|started|began|commenced|launched|introduced|unveiled|revealed|disclosed|announced|declared|proclaimed|stated|expressed|communicated|conveyed|transmitted|delivered|presented|demonstrated|exhibited|displayed|showcased|highlighted|emphasized|stressed|underscored|accentuated|featured|spotlighted|focused|centered|concentrated|targeted|aimed|directed|guided|steered|navigated|piloted|drove|propelled|pushed|advanced|progressed|moved|forward|accelerated|expedited|hastened|rushed|hurried|sped|up|quickened|fastened|accelerated|boosted|enhanced|amplified|magnified|multiplied|doubled|tripled|quadrupled|quintupled|sextupled|septupled|octupled|nonupled|decupled/.test(
          normalizedText
        ),
    },
    {
      label: "Expérience professionnelle",
      present:
        /experience|employment|work history|professional experience|job|position|role|career|occupation|employment|work|job|position|role|title|responsibilities|duties|tasks|projects|initiatives|achievements|accomplishments|contributions|impact|results|outcomes|deliverables|outputs|work|employment|job|position|role|title|company|organization|employer|client|customer|stakeholder|team|department|division|unit|group|section|branch|office|location|site|facility|premises|workplace|workstation|desk|office|cubicle|workspace|environment|setting|context|situation|circumstance|condition|state|status|level|grade|rank|tier|category|class|type|kind|sort|variety|form|style|manner|way|method|approach|technique|strategy|tactic|procedure|process|system|framework|model|paradigm|theory|concept|idea|notion|thought|belief|opinion|view|perspective|standpoint|position|stance|attitude|mindset|outlook|approach|methodology|philosophy|principle|value|standard|criterion|benchmark|measure|metric|indicator|signal|sign|mark|token|symbol|emblem|badge|insignia|logo|brand|label|tag|stamp|seal|signature|autograph|mark|trace|track|trail|path|route|way|road|street|avenue|boulevard|highway|freeway|expressway|turnpike|parkway|drive|lane|alley|path|trail|track|route|way|road|street|avenue|boulevard|highway|freeway|expressway|turnpike|parkway|drive|lane|alley/.test(
          normalizedText
        ),
    },
    {
      label: "Section formation",
      present:
        /education|bachelor|master|phd|university|degree|college|school|academic|academy|institute|institution|faculty|department|program|course|curriculum|syllabus|textbook|lecture|seminar|workshop|tutorial|training|certification|certificate|diploma|transcript|gpa|grade|score|mark|result|outcome|achievement|accomplishment|success|performance|progress|development|growth|improvement|enhancement|advancement|promotion|elevation|upgrade|boost|lift|raise|increase|improvement|enhancement|betterment|refinement|polishing|perfection|optimization|streamlining|simplification|clarification|organization|structuring|arrangement|systematization|standardization|formalization|institutionalization|establishment|foundation|creation|initiation|start|beginning|commencement|launch|introduction|unveiling|revelation|disclosure|announcement|declaration|proclamation|statement|expression|communication|conveyance|transmission|delivery|presentation|demonstration|exhibition|display|showcase|highlighting|emphasis|stress|underscoring|accentuation|featuring|spotlighting|focusing|centering|concentration|targeting|aiming|directing|guiding|steering|navigating|piloting|driving|propelling|pushing|advancing|progressing|moving|forward|accelerating|expediting|hastening|rushing|hurrying|speeding|up|quickening|fastening|accelerating|boosting|enhancing|amplifying|magnifying|multiplying|doubling|tripling|quadrupling|quintupling|sextupling|septupling|octupling|nonupling|decupling/.test(
          normalizedText
        ),
    },
  ];
};

export default constants;
