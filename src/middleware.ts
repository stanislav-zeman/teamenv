import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ["/api/cli/projects(.*)"]
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
}
