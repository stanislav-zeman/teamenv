export const Role = {
  GUEST: 'GUEST',
  DEVELOPER: 'DEVELOPER',
  MAINTAINER: 'MAINTAINER',
  OWNER: 'OWNER',
} as const

export type Role = (typeof Role)[keyof typeof Role]
