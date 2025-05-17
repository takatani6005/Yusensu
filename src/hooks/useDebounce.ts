import { useEffect, useRef, useState } from 'react';

type UseDebounceOptions = {
  delay?: number;
  leading?: boolean; // Trả giá trị ngay lần đầu thay đổi
  trailing?: boolean; // Trả giá trị sau khi ngừng thay đổi
};

/**
 * Hook debounce với các tuỳ chọn leading, trailing.
 * @param value Giá trị đầu vào
 * @param options Các tùy chọn delay (ms), leading và trailing
 * @returns Giá trị đã debounce
 */
export function useDebounce<T>(
  value: T,
  { delay = 500, leading = false, trailing = true }: UseDebounceOptions = {}
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const isFirstRun = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasValueChanged = useRef(false);

  useEffect(() => {
    if (leading && isFirstRun.current) {
      setDebouncedValue(value);
      isFirstRun.current = false;
      return;
    }

    // Nếu trailing là true và giá trị đã thay đổi
    if (trailing && hasValueChanged.current) {
      clearTimeout(timer.current as NodeJS.Timeout);
      timer.current = setTimeout(() => {
        setDebouncedValue(value);
        hasValueChanged.current = false; // Reset
      }, delay);
    } else {
      // Nếu không trailing, chỉ debounce
      clearTimeout(timer.current as NodeJS.Timeout);
      timer.current = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    }

    // Đánh dấu khi giá trị thay đổi
    hasValueChanged.current = true;

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [value, delay, leading, trailing]);

  return debouncedValue;
}
