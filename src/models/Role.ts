export const Role = {
  GUEST: 0,
  DEVELOPER: 1,
  MAINTAINER: 2,
  OWNER: 3,
} as const

export type Role = (typeof Role)[keyof typeof Role]
