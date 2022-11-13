import { AuthProvider } from "./hooks/useAuth";
import Route from "./Route";

export default function App() {
  return (
    <AuthProvider>
      <Route />
    </AuthProvider>
  );
}
