import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase";

// const AuthContext = createContext<any>({});

// export const useAuth = () => useContext(AuthContext);

// export const AuthContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // setUser({
//         //   uid: user.uid,
//         //   email: user.email,
//         //   displayName: user.displayName,
//         // });
//         getUserById(user.uid);
//       } else {
//         // setUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const signup = (email: string, password: string) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const login = (email: string, password: string) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = async () => {
//     // setUser(null);
//     await signOut(auth);
//   };

//   return (
//     <AuthContext.Provider value={{ login, signup, logout }}>
//       {loading ? null : children}
//     </AuthContext.Provider>
//   );
// };

// export const tryLoginUser = (email: string, password: string) => {
//   signInWithEmailAndPassword(auth, email, password).then((res) => {
//     console.log("hamedkabir  ", res);
//   });
// };

interface UserType {
  user: any;
}

const AuthContext = createContext({});
export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({ user: null });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUser({
        //   email: user.email,
        //   uid: user.uid,
        // });
        console.log("hamedkabir user  ", user);
      } else {
        setUser({ user: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = async () => {
    setUser({ user: null });
    await signOut(auth);
  };
  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
