export const RoutesUrl = {
  BASE_URL: '/',
  ERROR_AREA: '/error-area',
} as const

export type RouterUrl = (typeof RoutesUrl)[keyof typeof RoutesUrl]
