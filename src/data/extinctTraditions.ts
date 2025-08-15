/**
 * Extinct and Lesser-Known Traditions
 * Demonstrates survivor bias in religious/philosophical history
 */

export interface ExtinctTradition {
  name: string;
  period: string;
  peakAdherents?: string;
  geography: string;
  reasonForDecline: string;
  keyIdeas: string;
  legacy: string;
  biasType: 'political' | 'cultural' | 'economic' | 'linguistic' | 'geographic';
}

export const extinctTraditions: ExtinctTradition[] = [
  // Major extinct religions
  {
    name: 'Manichaeism',
    period: '3rd-14th century CE',
    peakAdherents: '~10 million',
    geography: 'Rome to China',
    reasonForDecline: 'Systematic persecution by Christian and Islamic empires',
    keyIdeas: 'Dualistic cosmology, synthesis of Zoroastrian, Buddhist, and Christian elements',
    legacy: 'Influenced Augustine, Gnostic thought, Buddhist cosmology',
    biasType: 'political'
  },
  {
    name: 'Mithraism',
    period: '1st-4th century CE',
    peakAdherents: '~5 million',
    geography: 'Roman Empire',
    reasonForDecline: 'Competition with Christianity, exclusive male membership',
    keyIdeas: 'Mystery religion, salvation through trials, cosmic dualism',
    legacy: 'Influenced Christian symbolism, December 25th celebration',
    biasType: 'cultural'
  },
  {
    name: 'Catharism',
    period: '12th-14th century CE',
    peakAdherents: '~4 million',
    geography: 'Southern France, Northern Italy',
    reasonForDecline: 'Albigensian Crusade, Inquisition',
    keyIdeas: 'Dualist theology, rejection of material world, apostolic poverty',
    legacy: 'Challenged Catholic authority, influenced Protestant reformation ideas',
    biasType: 'political'
  },
  {
    name: 'Tengriism',
    period: '6th century BCE - 14th century CE',
    peakAdherents: '~30 million (Mongol Empire)',
    geography: 'Central Asia, Mongolia',
    reasonForDecline: 'Conversion to Buddhism and Islam, urbanization',
    keyIdeas: 'Sky father worship, shamanism, ancestor veneration, harmony with nature',
    legacy: 'Influenced Mongolian Buddhism, Turkish cultural identity',
    biasType: 'cultural'
  },
  {
    name: 'Zurvanism',
    period: '5th century BCE - 10th century CE',
    peakAdherents: '~2 million',
    geography: 'Persia (Iran)',
    reasonForDecline: 'Islamic conquest, Orthodox Zoroastrian opposition',
    keyIdeas: 'Time as ultimate deity, fatalistic determinism, cosmic cycles',
    legacy: 'Influenced Islamic philosophy, Gnostic time concepts',
    biasType: 'political'
  },
  
  // African traditions largely erased
  {
    name: 'Nubian Christianity',
    period: '6th-15th century CE',
    peakAdherents: '~8 million',
    geography: 'Sudan, Southern Egypt',
    reasonForDecline: 'Islamic expansion, loss of written records',
    keyIdeas: 'Monophysite Christianity, African liturgy, unique artistic tradition',
    legacy: 'Ethiopian Orthodox connections, archaeological remains',
    biasType: 'linguistic'
  },
  {
    name: 'Kushite Religion',
    period: '2500 BCE - 350 CE',
    peakAdherents: 'Unknown (major kingdom)',
    geography: 'Sudan (Kingdom of Kush)',
    reasonForDecline: 'Roman conflicts, Christianization, loss of Meroitic script',
    keyIdeas: 'Hybrid Egyptian-African deities, lion god Apedemak, powerful queens',
    legacy: 'Influenced Egyptian late period religion, Nubian pyramid tradition',
    biasType: 'linguistic'
  },
  
  // Asian traditions
  {
    name: 'Bon (pre-Buddhist)',
    period: '11th century BCE - 8th century CE',
    peakAdherents: '~5 million',
    geography: 'Tibet, Himalayas',
    reasonForDecline: 'Buddhist dominance, political suppression',
    keyIdeas: 'Shamanic practices, sky burial, sacred mountains, spiritual kingship',
    legacy: 'Heavily influenced Tibetan Buddhism, still practiced by minorities',
    biasType: 'political'
  },
  {
    name: 'Mazdakism',
    period: '5th-6th century CE',
    peakAdherents: '~3 million',
    geography: 'Sassanid Persia',
    reasonForDecline: 'Violent suppression by Sassanid nobility',
    keyIdeas: 'Proto-socialist ideals, communal property, pacifism, vegetarianism',
    legacy: 'Influenced later egalitarian movements, Islamic social justice concepts',
    biasType: 'economic'
  },
  {
    name: 'Jainism (Medieval)',
    period: '8th-13th century CE',
    peakAdherents: '~10 million',
    geography: 'Western and Southern India',
    reasonForDecline: 'Islamic invasions, Hindu revival, loss of royal patronage',
    keyIdeas: 'Extreme non-violence, complex cosmology, atomic theory',
    legacy: 'Still exists but greatly diminished, influenced Gandhi',
    biasType: 'political'
  },
  
  // Americas (pre-Columbian)
  {
    name: 'Olmec Religion',
    period: '1500-400 BCE',
    peakAdherents: 'Unknown (first Mesoamerican civilization)',
    geography: 'Gulf Coast of Mexico',
    reasonForDecline: 'Civilization collapse, no deciphered writing',
    keyIdeas: 'Jaguar transformation, maize god, bloodletting rituals, colossal heads',
    legacy: 'Foundation for all Mesoamerican religions',
    biasType: 'linguistic'
  },
  {
    name: 'Mississippian Religion',
    period: '800-1600 CE',
    peakAdherents: '~5 million',
    geography: 'Eastern North America',
    reasonForDecline: 'European diseases, colonization',
    keyIdeas: 'Mound building, solar worship, ancestral spirits, world tree',
    legacy: 'Influenced later Native American traditions',
    biasType: 'geographic'
  },
  {
    name: 'Muisca Religion',
    period: '600-1600 CE',
    peakAdherents: '~2 million',
    geography: 'Colombia',
    reasonForDecline: 'Spanish conquest, forced conversion',
    keyIdeas: 'El Dorado rituals, sun and moon deities, sacred lakes',
    legacy: 'El Dorado legend, influenced regional folklore',
    biasType: 'political'
  },
  
  // European pre-Christian
  {
    name: 'Celtic Druidism',
    period: '500 BCE - 500 CE',
    peakAdherents: '~15 million',
    geography: 'Britain, Ireland, Gaul',
    reasonForDecline: 'Roman suppression, Christianization',
    keyIdeas: 'Nature worship, oral tradition, sacred groves, reincarnation',
    legacy: 'Influenced Celtic Christianity, modern neo-paganism',
    biasType: 'political'
  },
  {
    name: 'Germanic Paganism',
    period: '500 BCE - 1200 CE',
    peakAdherents: '~20 million',
    geography: 'Northern Europe',
    reasonForDecline: 'Christianization, loss of oral traditions',
    keyIdeas: 'Ragnarok, world tree Yggdrasil, warrior culture, fate/wyrd',
    legacy: 'Norse mythology preservation, weekday names, cultural symbols',
    biasType: 'cultural'
  },
  {
    name: 'Slavic Paganism',
    period: '500 BCE - 1200 CE',
    peakAdherents: '~25 million',
    geography: 'Eastern Europe',
    reasonForDecline: 'Christianization, lack of written records',
    keyIdeas: 'Nature spirits, ancestor worship, seasonal festivals, duality',
    legacy: 'Folk traditions, fairy tales, seasonal celebrations',
    biasType: 'linguistic'
  },
  
  // Mystery religions
  {
    name: 'Eleusinian Mysteries',
    period: '1500 BCE - 392 CE',
    peakAdherents: 'Unknown (secret initiation)',
    geography: 'Greece, Roman Empire',
    reasonForDecline: 'Christian Emperor Theodosius ban',
    keyIdeas: 'Death and rebirth, Persephone myth, secret knowledge, afterlife promise',
    legacy: 'Influenced Christian mysteries, Western esotericism',
    biasType: 'political'
  },
  {
    name: 'Orphism',
    period: '6th century BCE - 5th century CE',
    peakAdherents: '~1 million',
    geography: 'Greece, Southern Italy',
    reasonForDecline: 'Christianity, loss of texts',
    keyIdeas: 'Soul purification, reincarnation, vegetarianism, mystical texts',
    legacy: 'Influenced Pythagoras, Plato, early Christianity',
    biasType: 'cultural'
  },
  {
    name: 'Cybele Cult',
    period: '6th century BCE - 4th century CE',
    peakAdherents: '~3 million',
    geography: 'Anatolia, Rome',
    reasonForDecline: 'Christian suppression, scandal over practices',
    keyIdeas: 'Great Mother worship, ecstatic rituals, self-castration, resurrection myth',
    legacy: 'Influenced Marian devotion, mother goddess concepts',
    biasType: 'cultural'
  },
  
  // Gnostic traditions
  {
    name: 'Valentinianism',
    period: '2nd-4th century CE',
    peakAdherents: '~2 million',
    geography: 'Mediterranean',
    reasonForDecline: 'Orthodox Christian persecution',
    keyIdeas: 'Cosmic mythology, divine spark, secret knowledge, female divine principle',
    legacy: 'Influenced Christian mysticism, discovered in Nag Hammadi',
    biasType: 'political'
  },
  {
    name: 'Mandaeism (historical)',
    period: '1st century CE - present',
    peakAdherents: '~1 million (now ~100,000)',
    geography: 'Mesopotamia',
    reasonForDecline: 'Islamic pressure, modern wars',
    keyIdeas: 'John the Baptist veneration, frequent baptism, dualistic cosmology',
    legacy: 'Last surviving Gnostic religion, unique Aramaic texts',
    biasType: 'geographic'
  },
  {
    name: 'Bogomilism',
    period: '10th-15th century CE',
    peakAdherents: '~4 million',
    geography: 'Balkans',
    reasonForDecline: 'Byzantine and Catholic persecution',
    keyIdeas: 'Dualism, rejection of material world, anti-clerical',
    legacy: 'Influenced Catharism, Protestant ideas',
    biasType: 'political'
  }
];

export const survivorBiasAnalysis = {
  patterns: [
    {
      type: 'Written vs Oral',
      description: 'Traditions with extensive written texts survived better than oral traditions',
      examples: ['Buddhism (Pali Canon)', 'Christianity (Bible)', 'Islam (Quran)'],
      lost: ['Druidism', 'Slavic Paganism', 'Mississippian Religion']
    },
    {
      type: 'Imperial Adoption',
      description: 'Religions adopted by empires had massive survival advantages',
      examples: ['Christianity (Rome)', 'Islam (Caliphates)', 'Buddhism (Ashoka)'],
      lost: ['Mithraism', 'Manichaeism', 'Celtic Druidism']
    },
    {
      type: 'Inclusive Membership',
      description: 'Religions open to all genders and classes survived better',
      examples: ['Christianity', 'Islam', 'Buddhism'],
      lost: ['Mithraism (men only)', 'Eleusinian Mysteries (Greek only)']
    },
    {
      type: 'Geographic Isolation',
      description: 'Isolated traditions were vulnerable to single-point elimination',
      examples: ['Judaism (diaspora survival)', 'Hinduism (subcontinental size)'],
      lost: ['Catharism (Languedoc)', 'Muisca (Colombia)', 'Nubian Christianity']
    },
    {
      type: 'Adaptability',
      description: 'Religions that could syncretize survived cultural changes',
      examples: ['Buddhism (adapted to each culture)', 'Christianity (absorbed pagan festivals)'],
      lost: ['Zurvanism (rigid theology)', 'Mazdakism (inflexible social program)']
    }
  ],
  
  modernImplications: [
    'Current "major world religions" represent <5% of all historical traditions',
    'Western philosophy canon ignores non-written traditions entirely',
    'African and American philosophies systematically erased',
    'Women\'s spiritual traditions largely undocumented',
    'Working class religious movements suppressed by elite chroniclers',
    'Many "extinct" ideas resurface in different forms'
  ]
};