/**
 * Color scheme for traditions using CSS variables and static classes
 * Fixes the dynamic Tailwind class bug
 */

export const TRADITION_COLORS = {
  watts: {
    primary: 'rgb(139, 92, 246)',    // violet-500
    secondary: 'rgb(167, 139, 250)', // violet-400
    accent: 'rgb(124, 58, 237)',     // violet-600
    bg: 'rgb(243, 232, 255)',        // violet-50
    bgLight: 'rgba(243, 232, 255, 0.3)',
    border: 'rgb(221, 214, 254)',    // violet-200
  },
  absurdism: {
    primary: 'rgb(100, 116, 139)',   // slate-500
    secondary: 'rgb(148, 163, 184)', // slate-400
    accent: 'rgb(71, 85, 105)',      // slate-600
    bg: 'rgb(248, 250, 252)',        // slate-50
    bgLight: 'rgba(248, 250, 252, 0.3)',
    border: 'rgb(226, 232, 240)',    // slate-200
  },
  buddhism: {
    primary: 'rgb(16, 185, 129)',    // emerald-500
    secondary: 'rgb(52, 211, 153)',  // emerald-400
    accent: 'rgb(5, 150, 105)',      // emerald-600
    bg: 'rgb(209, 250, 229)',        // emerald-50
    bgLight: 'rgba(209, 250, 229, 0.3)',
    border: 'rgb(167, 243, 208)',    // emerald-200
  },
  christianity: {
    primary: 'rgb(59, 130, 246)',    // blue-500
    secondary: 'rgb(96, 165, 250)',  // blue-400
    accent: 'rgb(37, 99, 235)',      // blue-600
    bg: 'rgb(239, 246, 255)',        // blue-50
    bgLight: 'rgba(239, 246, 255, 0.3)',
    border: 'rgb(191, 219, 254)',    // blue-200
  },
  daoism: {
    primary: 'rgb(34, 197, 94)',     // green-500
    secondary: 'rgb(74, 222, 128)',  // green-400
    accent: 'rgb(22, 163, 74)',      // green-600
    bg: 'rgb(220, 252, 231)',        // green-50
    bgLight: 'rgba(220, 252, 231, 0.3)',
    border: 'rgb(187, 247, 208)',    // green-200
  },
  hinduism: {
    primary: 'rgb(249, 115, 22)',    // orange-500
    secondary: 'rgb(251, 146, 60)',  // orange-400
    accent: 'rgb(234, 88, 12)',      // orange-600
    bg: 'rgb(255, 247, 237)',        // orange-50
    bgLight: 'rgba(255, 247, 237, 0.3)',
    border: 'rgb(254, 215, 170)',    // orange-200
  },
  islam: {
    primary: 'rgb(6, 182, 212)',     // cyan-500
    secondary: 'rgb(34, 211, 238)',  // cyan-400
    accent: 'rgb(8, 145, 178)',      // cyan-600
    bg: 'rgb(236, 254, 255)',        // cyan-50
    bgLight: 'rgba(236, 254, 255, 0.3)',
    border: 'rgb(165, 243, 252)',    // cyan-200
  },
  judaism: {
    primary: 'rgb(99, 102, 241)',    // indigo-500
    secondary: 'rgb(129, 140, 248)', // indigo-400
    accent: 'rgb(79, 70, 229)',      // indigo-600
    bg: 'rgb(238, 242, 255)',        // indigo-50
    bgLight: 'rgba(238, 242, 255, 0.3)',
    border: 'rgb(199, 210, 254)',    // indigo-200
  },
  advaita: {
    primary: 'rgb(236, 72, 153)',    // pink-500
    secondary: 'rgb(244, 114, 182)', // pink-400
    accent: 'rgb(219, 39, 119)',     // pink-600
    bg: 'rgb(253, 242, 248)',        // pink-50
    bgLight: 'rgba(253, 242, 248, 0.3)',
    border: 'rgb(251, 207, 232)',    // pink-200
  },
  indigenous: {
    primary: 'rgb(180, 83, 9)',      // amber-700
    secondary: 'rgb(217, 119, 6)',   // amber-600
    accent: 'rgb(146, 64, 14)',      // amber-800
    bg: 'rgb(255, 251, 235)',        // amber-50
    bgLight: 'rgba(255, 251, 235, 0.3)',
    border: 'rgb(253, 230, 138)',    // amber-200
  },
  aristotle: {
    primary: 'rgb(168, 85, 247)',    // purple-500
    secondary: 'rgb(192, 132, 252)', // purple-400
    accent: 'rgb(147, 51, 234)',     // purple-600
    bg: 'rgb(250, 245, 255)',        // purple-50
    bgLight: 'rgba(250, 245, 255, 0.3)',
    border: 'rgb(233, 213, 255)',    // purple-200
  },
  plato: {
    primary: 'rgb(20, 184, 166)',    // teal-500
    secondary: 'rgb(45, 212, 191)',  // teal-400
    accent: 'rgb(13, 148, 136)',     // teal-600
    bg: 'rgb(240, 253, 250)',        // teal-50
    bgLight: 'rgba(240, 253, 250, 0.3)',
    border: 'rgb(153, 246, 228)',    // teal-200
  },
  stoicism: {
    primary: 'rgb(107, 114, 128)',   // gray-500
    secondary: 'rgb(156, 163, 175)', // gray-400
    accent: 'rgb(75, 85, 99)',       // gray-600
    bg: 'rgb(249, 250, 251)',        // gray-50
    bgLight: 'rgba(249, 250, 251, 0.3)',
    border: 'rgb(229, 231, 235)',    // gray-200
  },
  confucianism: {
    primary: 'rgb(239, 68, 68)',     // red-500
    secondary: 'rgb(248, 113, 113)', // red-400
    accent: 'rgb(220, 38, 38)',      // red-600
    bg: 'rgb(254, 242, 242)',        // red-50
    bgLight: 'rgba(254, 242, 242, 0.3)',
    border: 'rgb(254, 202, 202)',    // red-200
  },
  existentialism: {
    primary: 'rgb(84, 56, 202)',     // violet-600
    secondary: 'rgb(109, 99, 234)',  // violet-500
    accent: 'rgb(76, 29, 149)',      // violet-700
    bg: 'rgb(237, 233, 254)',        // violet-100
    bgLight: 'rgba(237, 233, 254, 0.3)',
    border: 'rgb(196, 181, 253)',    // violet-300
  },
} as const;

export type TraditionColorKey = keyof typeof TRADITION_COLORS;

/**
 * Get color values for a tradition
 */
export function getTraditionColors(traditionId: string) {
  const colors = TRADITION_COLORS[traditionId as TraditionColorKey];
  if (!colors) {
    // Fallback colors if tradition not found
    return TRADITION_COLORS.stoicism;
  }
  return colors;
}

/**
 * Generate CSS variables for a tradition
 */
export function getTraditionCSSVars(traditionId: string) {
  const colors = getTraditionColors(traditionId);
  return {
    '--tradition-primary': colors.primary,
    '--tradition-secondary': colors.secondary,
    '--tradition-accent': colors.accent,
    '--tradition-bg': colors.bg,
    '--tradition-bg-light': colors.bgLight,
    '--tradition-border': colors.border,
  } as React.CSSProperties;
}