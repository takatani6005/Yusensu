import { RefObject, useEffect } from 'react';

// Hook useOnClickOutside được sử dụng để phát hiện các click bên ngoài một element
// ref: Tham chiếu đến element cần theo dõi
// handler: Function xử lý khi click ra ngoài element
// Ví dụ sử dụng: Đóng modal, dropdown, menu khi click ra ngoài
const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void => {
  useEffect(() => {
    // Hàm xử lý sự kiện click hoặc touch
    const listener = (event: MouseEvent | TouchEvent) => {
      // Kiểm tra nếu ref hoặc ref.current không tồn tại
      // Hoặc nếu click vào bên trong element thì không làm gì cả
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      // Nếu click ra ngoài thì gọi handler
      handler(event);
    };

    // Đăng ký các event listener cho cả click và touch events
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Cleanup function để remove event listeners khi component unmount
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Effect sẽ chạy lại khi ref hoặc handler thay đổi
};

export default useOnClickOutside;