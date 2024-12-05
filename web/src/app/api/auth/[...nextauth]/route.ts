import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak"
export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId      : process.env.AUTH_CLIENT_ID,
      clientSecret  : process.env.AUTH_CLIENT_SECRET,
      issuer        : process.env.AUTH_ISSUER
    })
  ]
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
