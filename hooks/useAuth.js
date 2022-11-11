import { createContext, useContext } from "react"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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