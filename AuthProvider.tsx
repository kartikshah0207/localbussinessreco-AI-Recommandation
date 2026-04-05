import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  interests: string[];
}

interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "jaadu_token";
const USER_KEY = "jaadu_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedToken && storedUser) {
        const parsed = JSON.parse(storedUser) as User;
        setUser(parsed);
        setIsAuthenticated(true);
      }
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const login = (nextUser: User, token: string) => {
    setUser(nextUser);
    setIsAuthenticated(true);
    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    } catch {
      // ignore storage failures
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

