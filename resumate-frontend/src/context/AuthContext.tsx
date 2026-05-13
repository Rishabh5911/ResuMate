import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

interface User {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  checkAuthStatus: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/auth/status`,
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        setUser({
          id: response.data.data.userId,
          name: response.data.data.name,
        });
      }
    } catch (error:any) {
      console.error("Auth check failed:", error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user,setUser, loading, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};