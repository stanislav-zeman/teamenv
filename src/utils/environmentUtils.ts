import { Environment } from "@prisma/client"

export const envToIndex = (env: Environment) => {
    switch (env) {
      case Environment.PREVIEW:
        return 0
      case Environment.DEVELOPMENT:
        return 1
      case Environment.STAGING:
        return 2
      default:
        return 3
    }
  }
  