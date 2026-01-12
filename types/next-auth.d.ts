import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'ADMIN' | 'CLIENT' | 'USER'
    } & DefaultSession['user']
  }

  interface User {
    role: 'ADMIN' | 'CLIENT' | 'USER'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: 'ADMIN' | 'CLIENT' | 'USER'
  }
}
