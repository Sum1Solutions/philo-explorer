/**
 * Evolution of Philosophical and Religious Ideas Over Time
 * Tracks how core concepts have changed across historical periods
 */

export interface EvolutionPeriod {
  name: string;
  timeRange: string;
  years: { start: number; end: number };
  color: string;
  description: string;
}

export interface ConceptEvolution {
  aspect: 'reality' | 'self' | 'problem' | 'response' | 'aim';
  periods: {
    period: string;
    dominantIdeas: string[];
    keyThinkers: string[];
    examples: string[];
    innovations: string[];
  }[];
}

export const evolutionPeriods: EvolutionPeriod[] = [
  {
    name: 'Prehistoric',
    timeRange: '100,000 - 3,000 BCE',
    years: { start: -100000, end: -3000 },
    color: 'rgb(120, 53, 15)', // brown
    description: 'Animistic and shamanic worldviews, oral traditions'
  },
  {
    name: 'Ancient',
    timeRange: '3,000 - 500 BCE', 
    years: { start: -3000, end: -500 },
    color: 'rgb(251, 191, 36)', // amber
    description: 'First written traditions, polytheism, early philosophy'
  },
  {
    name: 'Axial Age',
    timeRange: '800 - 200 BCE',
    years: { start: -800, end: -200 },
    color: 'rgb(59, 130, 246)', // blue
    description: 'Major religious and philosophical breakthroughs worldwide'
  },
  {
    name: 'Classical',
    timeRange: '500 BCE - 500 CE',
    years: { start: -500, end: 500 },
    color: 'rgb(16, 185, 129)', // emerald
    description: 'Systematic philosophy, synthesis of traditions'
  },
  {
    name: 'Medieval',
    timeRange: '500 - 1500 CE',
    years: { start: 500, end: 1500 },
    color: 'rgb(168, 85, 247)', // purple
    description: 'Scholasticism, mysticism, religious institutionalization'
  },
  {
    name: 'Renaissance',
    timeRange: '1400 - 1650 CE',
    years: { start: 1400, end: 1650 },
    color: 'rgb(236, 72, 153)', // pink
    description: 'Humanism, individualism, scientific revolution'
  },
  {
    name: 'Enlightenment',
    timeRange: '1650 - 1800 CE',
    years: { start: 1650, end: 1800 },
    color: 'rgb(249, 115, 22)', // orange
    description: 'Reason, secularism, natural religion'
  },
  {
    name: 'Modern',
    timeRange: '1800 - 1950 CE',
    years: { start: 1800, end: 1950 },
    color: 'rgb(139, 92, 246)', // violet
    description: 'Evolution, psychology, existentialism, fundamentalism'
  },
  {
    name: 'Contemporary',
    timeRange: '1950 - Present',
    years: { start: 1950, end: 2024 },
    color: 'rgb(6, 182, 212)', // cyan
    description: 'Globalization, neuroscience, quantum physics, ecology'
  }
];

export const conceptEvolutions: ConceptEvolution[] = [
  {
    aspect: 'reality',
    periods: [
      {
        period: 'Prehistoric',
        dominantIdeas: ['Animistic universe', 'Spirit-matter unity', 'Sacred landscapes'],
        keyThinkers: ['Shamans', 'Tribal elders'],
        examples: ['Everything has spirit', 'Sacred mountains and rivers', 'Ancestor realms'],
        innovations: ['First concept of non-material reality', 'Sacred/profane distinction']
      },
      {
        period: 'Ancient',
        dominantIdeas: ['Polytheistic cosmos', 'Divine order (Ma\'at, Rita)', 'Cyclic time'],
        keyThinkers: ['Egyptian priests', 'Vedic seers', 'Mesopotamian scribes'],
        examples: ['Multiple gods governing reality', 'Divine law underlying nature', 'Eternal return'],
        innovations: ['Written cosmologies', 'Mathematical order', 'Divine emanation']
      },
      {
        period: 'Axial Age',
        dominantIdeas: ['Universal principles', 'Transcendent reality', 'Moral order'],
        keyThinkers: ['Buddha', 'Laozi', 'Hebrew prophets', 'Parmenides'],
        examples: ['Dharma/Dao', 'One God', 'Being vs Becoming', 'Nirvana'],
        innovations: ['Abstract universals', 'Transcendence', 'Philosophical logic']
      },
      {
        period: 'Classical',
        dominantIdeas: ['Platonic Forms', 'Aristotelian substances', 'Stoic logos'],
        keyThinkers: ['Plato', 'Aristotle', 'Plotinus', 'Nagarjuna'],
        examples: ['World of Forms', 'Four causes', 'Divine mind', 'Emptiness (Śūnyatā)'],
        innovations: ['Systematic metaphysics', 'Substance theory', 'Dialectical method']
      },
      {
        period: 'Medieval',
        dominantIdeas: ['Divine creation', 'Great Chain of Being', 'Analogical reality'],
        keyThinkers: ['Augustine', 'Aquinas', 'Al-Ghazali', 'Sankara'],
        examples: ['God as Being itself', 'Hierarchy of existence', 'Divine illumination'],
        innovations: ['Creation ex nihilo', 'Scholastic synthesis', 'Mystical union']
      },
      {
        period: 'Renaissance',
        dominantIdeas: ['Mathematical nature', 'Hermetic cosmos', 'Human dignity'],
        keyThinkers: ['Galileo', 'Bruno', 'Pico della Mirandola'],
        examples: ['Book of nature in mathematics', 'Infinite worlds', 'Microcosm/macrocosm'],
        innovations: ['Experimental method', 'Infinite universe', 'Human creativity']
      },
      {
        period: 'Enlightenment',
        dominantIdeas: ['Mechanical universe', 'Natural law', 'Deistic watchmaker'],
        keyThinkers: ['Newton', 'Descartes', 'Hume', 'Kant'],
        examples: ['Clockwork cosmos', 'Laws of physics', 'Phenomena vs noumena'],
        innovations: ['Scientific materialism', 'Critical philosophy', 'Natural religion']
      },
      {
        period: 'Modern',
        dominantIdeas: ['Evolutionary cosmos', 'Relative space-time', 'Unconscious mind'],
        keyThinkers: ['Darwin', 'Einstein', 'Freud', 'Process philosophers'],
        examples: ['Emergent complexity', 'Relativity', 'Depth psychology'],
        innovations: ['Deep time', 'Quantum mechanics', 'Systems thinking']
      },
      {
        period: 'Contemporary',
        dominantIdeas: ['Quantum reality', 'Complex systems', 'Information universe'],
        keyThinkers: ['Quantum physicists', 'Systems theorists', 'Cognitive scientists'],
        examples: ['Observer effect', 'Gaia hypothesis', 'Simulation theory'],
        innovations: ['Holistic physics', 'Ecological thinking', 'Digital reality']
      }
    ]
  },
  {
    aspect: 'self',
    periods: [
      {
        period: 'Prehistoric',
        dominantIdeas: ['Tribal identity', 'Soul as breath/life force', 'Shapeshifting'],
        keyThinkers: ['Shamans', 'Wise women'],
        examples: ['We-self over I-self', 'Animal spirits', 'Dream journeys'],
        innovations: ['First self-awareness', 'Soul concept', 'Altered states']
      },
      {
        period: 'Ancient',
        dominantIdeas: ['Ka/Ba (Egypt)', 'Atman (India)', 'Heroic identity'],
        keyThinkers: ['Egyptian priests', 'Upanishadic sages', 'Homer'],
        examples: ['Multiple souls', 'True Self = Brahman', 'Glory and fame'],
        innovations: ['Immortal soul', 'Inner divine spark', 'Individual worth']
      },
      {
        period: 'Axial Age',
        dominantIdeas: ['No-self (Buddhism)', 'Moral agent', 'Inner voice'],
        keyThinkers: ['Buddha', 'Confucius', 'Socrates', 'Hebrew prophets'],
        examples: ['Anatta', 'Ren (humaneness)', 'Know thyself', 'Covenant relationship'],
        innovations: ['Selflessness', 'Ethical responsibility', 'Self-examination']
      },
      {
        period: 'Classical',
        dominantIdeas: ['Rational soul', 'Moral character', 'Contemplative self'],
        keyThinkers: ['Plato', 'Aristotle', 'Stoics', 'Plotinus'],
        examples: ['Tripartite soul', 'Virtue ethics', 'Sage ideal', 'Return to One'],
        innovations: ['Psychological analysis', 'Character development', 'Mystical union']
      },
      {
        period: 'Medieval',
        dominantIdeas: ['Image of God', 'Fallen nature', 'Mystical self'],
        keyThinkers: ['Augustine', 'Aquinas', 'Al-Ghazali', 'Eckhart'],
        examples: ['Original sin', 'Pilgrim journey', 'Fana (self-annihilation)'],
        innovations: ['Autobiography', 'Introspection', 'Dark night of soul']
      },
      {
        period: 'Renaissance',
        dominantIdeas: ['Individual dignity', 'Self-creation', 'Unique perspective'],
        keyThinkers: ['Pico', 'Montaigne', 'Shakespeare'],
        examples: ['Dignity of man', 'Essay form', 'Complex characters'],
        innovations: ['Humanism', 'Subjective experience', 'Artistic genius']
      },
      {
        period: 'Enlightenment',
        dominantIdeas: ['Rational ego', 'Natural self', 'Autonomous will'],
        keyThinkers: ['Descartes', 'Locke', 'Rousseau', 'Kant'],
        examples: ['Cogito ergo sum', 'Blank slate', 'Noble savage', 'Categorical imperative'],
        innovations: ['Mind-body dualism', 'Empirical self', 'Moral autonomy']
      },
      {
        period: 'Modern',
        dominantIdeas: ['Unconscious', 'Evolving self', 'Authentic existence'],
        keyThinkers: ['Freud', 'Jung', 'Kierkegaard', 'Nietzsche'],
        examples: ['Id/ego/superego', 'Individuation', 'Leap of faith', 'Übermensch'],
        innovations: ['Depth psychology', 'Existential analysis', 'Self-actualization']
      },
      {
        period: 'Contemporary',
        dominantIdeas: ['Constructed self', 'Networked identity', 'Embodied cognition'],
        keyThinkers: ['Postmodernists', 'Cognitive scientists', 'Buddhist modernists'],
        examples: ['Multiple selves', 'Digital identity', 'Extended mind'],
        innovations: ['Social construction', 'Neuroscience of self', 'Virtual reality']
      }
    ]
  },
  {
    aspect: 'problem',
    periods: [
      {
        period: 'Prehistoric',
        dominantIdeas: ['Disharmony with spirits', 'Sickness', 'Tribal conflict'],
        keyThinkers: ['Shamans', 'Healers'],
        examples: ['Taboo violation', 'Soul loss', 'Enemy curses'],
        innovations: ['First problem diagnosis', 'Healing rituals', 'Community response']
      },
      {
        period: 'Ancient',
        dominantIdeas: ['Divine displeasure', 'Cosmic disorder', 'Pollution/impurity'],
        keyThinkers: ['Priests', 'Diviners'],
        examples: ['Angering gods', 'Ma\'at disrupted', 'Ritual uncleanliness'],
        innovations: ['Divine law', 'Sacrificial system', 'Purification rites']
      },
      {
        period: 'Axial Age',
        dominantIdeas: ['Suffering (Dukkha)', 'Ignorance', 'Sin/moral failing'],
        keyThinkers: ['Buddha', 'Hebrew prophets', 'Greek philosophers'],
        examples: ['Four Noble Truths', 'Idolatry', 'Cave allegory'],
        innovations: ['Universal suffering', 'Moral evil', 'Philosophical ignorance']
      },
      {
        period: 'Classical',
        dominantIdeas: ['Vice/lack of virtue', 'Error in thinking', 'Distance from Good'],
        keyThinkers: ['Aristotle', 'Stoics', 'Plotinus'],
        examples: ['Akrasia (weakness of will)', 'False beliefs', 'Material imprisonment'],
        innovations: ['Moral psychology', 'Logical fallacies', 'Metaphysical evil']
      },
      {
        period: 'Medieval',
        dominantIdeas: ['Original sin', 'Separation from God', 'Spiritual blindness'],
        keyThinkers: ['Augustine', 'Aquinas', 'Islamic philosophers'],
        examples: ['Fall of Adam', 'Veil of ignorance', 'Spiritual dryness'],
        innovations: ['Inherited corruption', 'Grace theology', 'Mystical darkness']
      },
      {
        period: 'Renaissance',
        dominantIdeas: ['Ignorance/superstition', 'Lack of dignity', 'Limited perspective'],
        keyThinkers: ['Humanists', 'Scientists'],
        examples: ['Dark Ages', 'Dehumanization', 'Geocentric error'],
        innovations: ['Educational reform', 'Human rights', 'Scientific revolution']
      },
      {
        period: 'Enlightenment',
        dominantIdeas: ['Irrationality', 'Oppression', 'Prejudice'],
        keyThinkers: ['Voltaire', 'Kant', 'Revolutionary thinkers'],
        examples: ['Superstition', 'Tyranny', 'Dogmatism'],
        innovations: ['Critical thinking', 'Political liberation', 'Religious tolerance']
      },
      {
        period: 'Modern',
        dominantIdeas: ['Alienation', 'Unconscious drives', 'Meaninglessness'],
        keyThinkers: ['Marx', 'Freud', 'Existentialists'],
        examples: ['Class struggle', 'Neurosis', 'Absurd condition'],
        innovations: ['Social analysis', 'Psychological therapy', 'Existential diagnosis']
      },
      {
        period: 'Contemporary',
        dominantIdeas: ['Environmental crisis', 'Information overload', 'Global inequality'],
        keyThinkers: ['Ecologists', 'Global ethicists', 'Technology critics'],
        examples: ['Climate change', 'Digital addiction', 'Wealth gap'],
        innovations: ['Planetary thinking', 'Systems problems', 'Technological critique']
      }
    ]
  }
];

export const evolutionTrends = [
  {
    title: 'From Concrete to Abstract',
    description: 'Movement from physical spirits to universal principles to information',
    examples: ['Tree spirits → Logos → Quantum fields']
  },
  {
    title: 'From Collective to Individual',
    description: 'Increasing emphasis on personal choice and individual responsibility',
    examples: ['Tribal identity → Soul salvation → Authentic existence']
  },
  {
    title: 'From Cyclical to Progressive',
    description: 'Shift from eternal return to linear development',
    examples: ['Seasonal cycles → Divine plan → Evolution']
  },
  {
    title: 'From External to Internal',
    description: 'Movement from external authority to inner experience',
    examples: ['Priestly oracles → Revealed law → Personal insight']
  },
  {
    title: 'From Simple to Complex',
    description: 'Increasing sophistication and nuance in understanding',
    examples: ['Good vs evil → Moral psychology → Systems thinking']
  }
];