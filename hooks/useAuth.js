import { createContext, useContext, useEffect, useState } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { auth } from "../lib/firebase";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
      {
        clientId: GOOGLE_WEB_CLIENT_ID,
      },
  );

    useEffect(() => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential);
      }
    }, [response])

    const signInWithGoogle = async () => {
      try {
        await promptAsync();
      } catch(err) {
        setError(err);
      }
    }

    return (
        <AuthContext.Provider value={{ error, request, signInWithGoogle, user: auth.currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth