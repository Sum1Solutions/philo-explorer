/**
 * Data for Christian sub-traditions.
 */

import { Tradition } from './fullTraditionsData';

export const christianitySubtraditions: Tradition[] = [
  {
    id: "protestantism",
    name: "Protestantism",
    family: "Abrahamic",
    color: "pink",
    firstYear: 1517,
    overview: {
      reality: "Created by God and revealed through scripture; marred by sin; redeemed in Christ.",
      self: "An immortal soul created by God; justified by faith alone (sola fide).",
      problem: "Sin and estrangement from God.",
      response: "Grace through faith in Jesus Christ, as revealed in the Bible (Sola Scriptura).",
      aim: "Salvation and a personal relationship with God.",
    },
    references: [
      {
        title: "Britannica: Protestantism",
        url: "https://www.britannica.com/topic/Protestantism",
      },
      {
        title: "World Council of Churches",
        url: "https://www.oikoumene.org/",
      },
    ],
  },
  {
    id: "congregationalism",
    name: "Congregationalism",
    family: "Abrahamic",
    color: "red",
    firstYear: 1600,
    overview: {
      reality: "Created by God; each congregation is autonomous and answers to God alone.",
      self: "A member of a covenanted community of believers, responsible for their own faith journey.",
      problem: "Separation from God and community due to sin.",
      response: "A personal faith commitment within a self-governing church community (congregation).",
      aim: "To live in covenant with God and fellow believers, seeking justice and love.",
    },
    references: [
      {
        title: "National Association of Congregational Christian Churches",
        url: "https://www.naccc.org/",
      },
      {
        title: "Britannica: Congregationalism",
        url: "https://www.britannica.com/topic/Congregationalism",
      },
    ],
  },
  {
    id: "united-church-walpole",
    name: "United Church of Walpole, MA (UCC)",
    family: "Abrahamic",
    color: "sky",
    firstYear: 2008,
    overview: {
      reality: "A world created by a still-speaking, triune God, where faith is a journey and all are interconnected.",
      self: "A unique and valuable individual on a personal spiritual journey, unconditionally welcomed and loved by God.",
      problem: "Disconnection from God and community; failure to practice love, justice, and radical welcome.",
      response: "Worship, service, and a persistent search for God. Advocating for justice, peace, and showing extravagant welcome.",
      aim: "An authentic, loving relationship with God and a united, just community where all belong.",
    },
    deepDive: {
        keyIdeas: ["Open and Affirming (ONA)", "God is Still Speaking", "Extravagant Welcome", "In essentials–unity, in nonessentials–diversity, in all things–charity."],
        notes: "Represents a progressive, inclusive expression of mainline Protestantism within the United Church of Christ. This congregation voted to become Open and Affirming in 2008, formally committing to the inclusion of persons of all sexual orientations, gender identities, and expressions."
    },
    references: [
      {
        title: "United Church in Walpole | Who We Are",
        url: "https://www.unitedwalpole.org/about",
        type: "other",
        description: "Official statement of beliefs and mission."
      },
      {
        title: "United Church of Christ | What We Believe",
        url: "https://www.ucc.org/what-we-believe/",
        type: "other",
        description: "Denominational beliefs of the United Church of Christ."
      },
    ],
  },
];
