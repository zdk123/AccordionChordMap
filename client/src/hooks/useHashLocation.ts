import { useState, useEffect, useCallback } from "react";

export function useHashLocation() {
  const [location, setLocation] = useState(() => window.location.hash.replace(/^#/, "") || "/");

  useEffect(() => {
    const onHashChange = () => {
      setLocation(window.location.hash.replace(/^#/, "") || "/");
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((to: string) => {
    window.location.hash = to;
  }, []);

  return [location, navigate] as const;
} 