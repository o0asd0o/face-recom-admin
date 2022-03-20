import React from "react";
import { User } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { onAuthStateChanged } from "../providers/firebase";
import { CurrentUser } from "types";
import { getCurrentUser } from "providers/users";

type AuthContextType = {
  user: User | null | undefined,
  userInfo: CurrentUser | null | undefined
} | undefined;

const AuthContext = createContext<AuthContextType>(undefined);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<CurrentUser | null | undefined>();


  useEffect(() => {
    const unsubAuthListener = onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubAuthListener();
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    (async () => {
      if (user.email)  {
         const info = await getCurrentUser(user.email);
         setUserInfo({
            id: info.id,
            avatarUrl: info.data().avatarUrl,
            address: info.data().address,
            firstName: info.data().firstName,
            lastName: info.data().lastName,
            phoneNumber: info.data().phoneNumber,
            email: info.data().email,
            role: info.data().role,
         });
      }
    })();
  }, [user?.email])

  return (
    <AuthContext.Provider value={{ user, userInfo }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return { 
    user: context.user,
    userInfo: context.userInfo
  };
}
