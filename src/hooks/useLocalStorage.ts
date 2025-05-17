// src/hooks/useLocalStorage.ts

import { useState, useEffect } from 'react';

type SetValue<T> = (value: T | ((prev: T) => T)) => void;
type RemoveValue = () => void;

/**
 * Hook thao tác với localStorage có state đồng bộ.
 * @param key Tên khóa trong localStorage
 * @param initialValue Giá trị mặc định nếu chưa có trong localStorage
 * @returns [giá trị, hàm set, hàm xóa]
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>, RemoveValue] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue: SetValue<T> = value => {
    setStoredValue(prev =>
      typeof value === 'function' ? (value as (prev: T) => T)(prev) : value
    );
  };

  const removeValue: RemoveValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
