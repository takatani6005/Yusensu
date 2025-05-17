// src/hooks/usePrevious.ts

import { useEffect, useRef } from 'react';

type UsePreviousOptions<T> = {
  shouldUpdate?: (prev: T | undefined, current: T) => boolean;
};

/**
 * Hook lưu lại giá trị trước đó của một biến với điều kiện tuỳ chọn.
 *
 * @param value Giá trị hiện tại muốn theo dõi
 * @param options Tuỳ chọn: shouldUpdate - kiểm soát khi nào nên lưu lại giá trị cũ
 * @returns Giá trị trước đó của biến
 */
function usePrevious<T>(
  value: T,
  options: UsePreviousOptions<T> = {}
): T | undefined {
  const { shouldUpdate } = options;
  const ref = useRef<T>();

  useEffect(() => {
    if (!shouldUpdate || shouldUpdate(ref.current, value)) {
      ref.current = value;
    }
  }, [value, shouldUpdate]);

  return ref.current;
}

export default usePrevious;
