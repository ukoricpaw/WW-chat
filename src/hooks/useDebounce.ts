import { useEffect, useState } from 'react';

interface UseDebounceIProps<T> {
  value: T;
  delay: number;
}

export default function useDebounce<T>({ value, delay }: UseDebounceIProps<T>): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}
