import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface Registration {
  id: string;
  name: string;
  batch: string;
  phone: string;
  email: string;
  profession: string;
  location: string;
  paymentStatus: "paid" | "pending";
  registrationType: "student" | "guest";
  image: string;
  tshirtSize: string;
  createdAt: string;
}

interface RegistrationContextType {
  registrations: Registration[];
  addRegistration: (reg: Omit<Registration, "id" | "createdAt">) => { success: boolean; message: string };
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredRegistrations: Registration[];
  clearRegistrations: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

const STORAGE_KEY = "eid_reunion_registrations";

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with empty registrations - only load from SAMPLE_REGISTRATIONS
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  }, [registrations]);

  const addRegistration = useCallback(
    (reg: Omit<Registration, "id" | "createdAt">) => {
      const duplicate = registrations.find((r) => r.phone === reg.phone);
      if (duplicate) {
        return { success: false, message: "This phone number is already registered." };
      }
      const newReg: Registration = {
        ...reg,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setRegistrations((prev) => [...prev, newReg]);
      return { success: true, message: "Registration successful! Welcome to the reunion." };
    },
    [registrations]
  );

  const filteredRegistrations = registrations.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.batch.toLowerCase().includes(q);
  });

  const clearRegistrations = useCallback(() => {
    setRegistrations([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <RegistrationContext.Provider value={{ registrations, addRegistration, searchQuery, setSearchQuery, filteredRegistrations, clearRegistrations }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error("useRegistration must be used within RegistrationProvider");
  return ctx;
};
