import { createContext, useContext } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
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
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth