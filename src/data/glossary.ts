export type GlossaryTerm = {
  id: string;
  term: string;
  pronunciation?: string;
  shortDefinition: string;
  studentDefinition: string;
  relatedTraditionIds?: string[];
  relatedTerms?: string[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'bce-ce',
    term: 'BCE / CE',
    shortDefinition: 'A religiously neutral way to label years before and after year 1.',
    studentDefinition: 'BCE means “Before Common Era” and CE means “Common Era.” They use the same year numbers as BC and AD, but avoid centering the labels on one religious tradition.',
    relatedTerms: ['timeline', 'history']
  },
  {
    id: 'dharma',
    term: 'Dharma',
    shortDefinition: 'Duty, teaching, law, or the way things rightly hold together.',
    studentDefinition: 'Dharma means different things across Indian traditions. It can mean moral duty, cosmic order, Buddhist teaching, or the disciplined way of living that supports liberation.',
    relatedTraditionIds: ['hinduism', 'buddhism', 'jainism'],
    relatedTerms: ['karma', 'liberation']
  },
  {
    id: 'karma',
    term: 'Karma',
    shortDefinition: 'Action and consequence, especially the moral effects of intentional action.',
    studentDefinition: 'Karma is not simply “fate.” It is the idea that intentional actions shape future experience, character, and sometimes rebirth depending on the tradition.',
    relatedTraditionIds: ['hinduism', 'buddhism', 'jainism'],
    relatedTerms: ['dharma', 'rebirth']
  },
  {
    id: 'anatta',
    term: 'Anatta',
    pronunciation: 'AH-naht-tah',
    shortDefinition: 'The Buddhist teaching that there is no permanent, independent self.',
    studentDefinition: 'Anatta means “not-self.” Buddhism uses it to challenge the idea that identity is a fixed inner essence rather than a changing process of body, feeling, perception, habits, and awareness.',
    relatedTraditionIds: ['buddhism', 'watts'],
    relatedTerms: ['self', 'impermanence']
  },
  {
    id: 'nonduality',
    term: 'Nonduality',
    shortDefinition: 'The idea that apparent opposites are not ultimately separate.',
    studentDefinition: 'Nonduality means “not two.” It points to ways reality, self, world, sacred, and ordinary life may be understood as deeply interconnected rather than separate boxes.',
    relatedTraditionIds: ['hinduism', 'taoism', 'watts'],
    relatedTerms: ['atman', 'brahman', 'interdependence']
  },
  {
    id: 'covenant',
    term: 'Covenant',
    shortDefinition: 'A binding relationship of promise and responsibility.',
    studentDefinition: 'In Judaism and related Abrahamic traditions, covenant describes a committed relationship between God and a community, often involving promise, law, memory, and ethical obligation.',
    relatedTraditionIds: ['judaism', 'christianity', 'islam'],
    relatedTerms: ['law', 'community']
  },
  {
    id: 'salvation',
    term: 'Salvation',
    shortDefinition: 'Being rescued, healed, or restored from a fundamental human problem.',
    studentDefinition: 'Salvation often means restoration of relationship with God, freedom from sin, or ultimate healing. Different traditions define both the problem and the rescue differently.',
    relatedTraditionIds: ['christianity', 'islam'],
    relatedTerms: ['sin', 'grace']
  },
  {
    id: 'logos',
    term: 'Logos',
    shortDefinition: 'Reason, word, pattern, or ordering principle.',
    studentDefinition: 'Logos is a Greek term used in philosophy and theology. It can refer to rational order in the cosmos, reasoned speech, or divine Word depending on context.',
    relatedTraditionIds: ['stoicism', 'christianity'],
    relatedTerms: ['reason', 'order']
  },
  {
    id: 'existentialism',
    term: 'Existentialism',
    shortDefinition: 'A modern philosophy focused on freedom, responsibility, and meaning-making.',
    studentDefinition: 'Existentialism asks what it means to live authentically when people must choose, act, and create meaning without guaranteed answers from tradition or the universe.',
    relatedTraditionIds: ['existentialism', 'absurdism'],
    relatedTerms: ['authenticity', 'freedom']
  },
  {
    id: 'nihilism',
    term: 'Nihilism',
    shortDefinition: 'The view that life, morality, or truth lacks inherent meaning or foundation.',
    studentDefinition: 'Nihilism can be a diagnosis, a crisis, or a position. It challenges inherited meanings and asks whether values can survive without ultimate guarantees.',
    relatedTraditionIds: ['nihilism', 'absurdism'],
    relatedTerms: ['meaning', 'value']
  },
  {
    id: 'survivor-bias',
    term: 'Survivor Bias',
    shortDefinition: 'Mistaking what survived for all that existed or all that mattered.',
    studentDefinition: 'Survivor bias happens when we study only the traditions with surviving texts, institutions, or political support and forget traditions erased by conquest, suppression, language loss, or chance.',
    relatedTerms: ['history', 'lost traditions']
  },
  {
    id: 'liberation',
    term: 'Liberation',
    shortDefinition: 'Freedom from bondage, ignorance, suffering, sin, or illusion.',
    studentDefinition: 'Liberation names the goal in many traditions, but the “bondage” differs: craving, ignorance, ego, injustice, sin, attachment, or social domination.',
    relatedTraditionIds: ['hinduism', 'buddhism', 'jainism'],
    relatedTerms: ['moksha', 'nirvana', 'freedom']
  }
];
