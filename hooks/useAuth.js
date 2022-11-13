import { createContext, useContext, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { GOOGLE_WEB_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext();

console.log('clie', GOOGLE_WEB_CLIENT_ID)

export const AuthProvider = ({ children }) => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
          clientId: GOOGLE_WEB_CLIENT_ID,
        },
    );

    useEffect(() => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const auth = getAuth();
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential);
      }
    }, [response])

    const signInWithGoogle = () => {
      promptAsync();
    }
    return (
        <AuthContext.Provider value={{ signInWithGoogle, user: null }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth