import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Add Firestore imports
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(); // Initialize Firestore
  const axiosPublic = useAxiosPublic();

  // user creation with email and password function
  const signUp = (email, password, additionalData) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      (data) => {
        const user = data.user;
        return updateProfile(user, {
          displayName: additionalData.name,
          photoURL: additionalData.avatar,
        }).then(() => {
          return setDoc(doc(db, "users", user.uid), {
            email: email,
            bloodGroup: additionalData.bloodGroup,
            district: additionalData.district,
            upazila: additionalData.upazila,
          }).then(() => user); // return user object for further use
        });
      }
    );
  };

  // login with email and password function
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout function
  const logout = () => {
    setLoading(true);
    return signOut(auth).then(() => {});
  };

  // user state change function
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(`Current user:  ${currentUser?.email}`);
      setUser(currentUser);
      if (currentUser) {
        // store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        //
        localStorage.removeItem("access-token");
      }
      setLoading(false);
      return () => {
        unsubscribe();
      };
    });
  }, []);

  // user information
  const userInfo = {
    user,
    loading,
    signUp,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
