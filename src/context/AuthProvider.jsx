import { createContext, useEffect, useState } from "react";
import app from "../firebase.config";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const googleLogin = () => signInWithPopup(auth, googleProvider);
  const updateUser = (name, photoURL) => updateProfile(auth.currentUser, { displayName: name, photoURL });
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}