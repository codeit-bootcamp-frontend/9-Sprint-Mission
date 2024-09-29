import React, { createContext, useContext, useState, ReactNode } from "react";
import { Query, QueryContextType } from "@/types/query";

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<Query>({
    page: 1,
    pageSize: 10,
    orderBy: "recent",
    keyword: "",
  });

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useQuery must be used within a QueryProvider");
  }
  return context;
};
