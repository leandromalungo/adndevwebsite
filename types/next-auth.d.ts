/**
 * NextAuth Type Definitions
 * 
 * Extends default NextAuth types to include custom fields.
 */

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
        };
    }

    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {
        id: string;
        email: string;
        name: string;
        role: string;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        uid: string;
        email: string;
        name: string;
        role: string;
    }
}
