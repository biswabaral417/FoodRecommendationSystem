import { useState,useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      const parsed = item ? JSON.parse(item) : null;
      // Ensure valid fallback
      return parsed && typeof parsed === 'object' ? parsed : initialValue;
    } catch (error) {
      console.warn(`Failed to load from localStorage: ${key}`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Failed to save to localStorage: ${key}`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
