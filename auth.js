import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import Github from "next-auth/providers/github";

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    Github({
      profile(profile){
        return {
          id: "some random id go here....",
          role: 'admin'
        }
      }
    }),
    Credentials({
      credentials: {
        email: {label: "Email", type: "email", placeholder: "Email"},
        password: {label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials){
        let user = null;

        //validate credentials
        const parsedCredentials = signInSchema.safeParse(credentials);
        if(!parsedCredentials.success) {
          console.error('Invalid credentials', parsedCredentials.error.error);
          return null;
        }
        //get user
        user = {
          id: '1',
          name: 'Jhon Doe',
          email: 'jhondoe@example.com',
          role: 'admin'
        }

        if(!user) {
          console.log('Invalid credentials');
          return null;
        }

        return user

      }
    })
  ],

  callbacks: {
    authorized({request: {nextUrl}, auth}){
      const isLoggedIn = !!auth?.user;
      const {pathname} = nextUrl;
      const role = auth?.user?.role || "user";
      // console.log("Role :", auth)
      if(pathname.startsWith('/auth/signin') && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      if(pathname.startsWith('/page2') && role !== 'admin') {
        return Response.redirect(new URL('/', nextUrl));
      }

    return !!auth;
  
  },

  jwt({token, user, trigger, session}) {
    if(user) {
      token.id = user.id;
      token.role = user.role;
    }

    if(trigger === "update" && session) {
      token = {...session,...token};
    }

    return token;
  },

  session({session, token}){
    session.user.id = token.id;
    session.user.role = token.role;
    // console.log("Session :", session)
    return session;
  }
},

  pages: {
    signIn: "/auth/signin",
  }
})