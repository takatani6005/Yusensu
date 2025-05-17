/**
 * useInView.ts
 * ----------------------------
 * Hook kiểm tra phần tử DOM có đang nằm trong vùng hiển thị (viewport) không.
 * Sử dụng Intersection Observer API.
 * 
 * ✅ Hữu ích cho:
 * - Lazy-load hình ảnh hoặc dữ liệu
 * - Kích hoạt animation khi scroll tới phần tử
 * - Theo dõi hành vi người dùng (tracking)
 * - Tạo hiệu ứng section scroll (full page, landing page, ...)

 * ✅ Ưu điểm:
 * - Dễ dùng, tái sử dụng cao
 * - Không phụ thuộc dự án, có thể áp dụng mọi loại layout
 * 
 **/
import { useState, useEffect, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  enabled?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

/**
 * useInView.ts
 * Hook kiểm tra một phần tử có đang hiển thị trong viewport không.
 */
const useInView = (
  ref: RefObject<HTMLElement>,
  options: UseInViewOptions = {}
): boolean => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = false,
    enabled = true,
    onEnter,
    onLeave,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (typeof window === 'undefined' || !element || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        if (once && isVisible) {
          setIsIntersecting(true);
          onEnter?.();
          observer.unobserve(element);
          observer.disconnect();
          return;
        }

        setIsIntersecting(prev => {
          if (prev !== isVisible) {
            if (isVisible) onEnter?.();
            else onLeave?.();
            return isVisible;
          }
          return prev;
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin, once, enabled, onEnter, onLeave]);

  return isIntersecting;
};

export default useInView;
