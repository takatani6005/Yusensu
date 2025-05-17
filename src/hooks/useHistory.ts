// src/hooks/useHistory.ts
import { useState, useRef, useEffect, useCallback } from 'react';

interface UseHistoryOptions<T> {
  maxHistory?: number; // Giới hạn số lượng bản ghi cũ
  initialValue?: T;    // Giá trị ban đầu, có thể reset lại sau này
}

/**
 * Hook lưu lại lịch sử của một giá trị và hỗ trợ undo, redo, reset.
 *
 * @param value Giá trị hiện tại muốn theo dõi
 * @param options Tuỳ chọn: maxHistory - giới hạn số lượng bản ghi cũ, initialValue - giá trị ban đầu
 * @returns Lịch sử và các chức năng: undo, redo, reset, clear, rollback
 */
function useHistory<T>(value: T, options: UseHistoryOptions<T> = {}) {
  const { maxHistory = 10, initialValue = value } = options;

  const [history, setHistory] = useState<T[]>([]);
  const [future, setFuture] = useState<T[]>([]); // Lưu trữ các giá trị redo
  const [currentIndex, setCurrentIndex] = useState<number>(-1); // Chỉ số hiện tại trong lịch sử

  // Lưu lại lịch sử của giá trị mới
  useEffect(() => {
    setHistory((prevHistory) => {
      const newHistory = [value, ...prevHistory];

      // Giới hạn số lượng bản ghi
      if (newHistory.length > maxHistory) {
        newHistory.pop();
      }

      setCurrentIndex(0);  // Cập nhật chỉ số hiện tại
      setFuture([]); // Reset future khi có thay đổi mới
      return newHistory;
    });
  }, [value, maxHistory]);

  // Undo (quay lại giá trị trước đó)
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setFuture((prevFuture) => [history[currentIndex - 1], ...prevFuture]); // Lưu vào future
    }
  }, [currentIndex, history]);

  // Redo (thực hiện lại giá trị đã undo)
  const redo = useCallback(() => {
    if (future.length > 0) {
      const nextValue = future[0];
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setHistory((prevHistory) => [nextValue, ...prevHistory]); // Thêm vào lịch sử
      setFuture((prevFuture) => prevFuture.slice(1)); // Loại bỏ giá trị đã redo
    }
  }, [future]);

  // Reset (quay lại giá trị ban đầu)
  const reset = useCallback(() => {
    setHistory([initialValue]);
    setFuture([]);
    setCurrentIndex(0);
  }, [initialValue]);

  // Clear history (Xóa toàn bộ lịch sử)
  const clear = useCallback(() => {
    setHistory([]);
    setFuture([]);
    setCurrentIndex(-1);
  }, []);

  // Quay lại giá trị trước đó (rollback nhiều bước)
  const rollback = useCallback((steps: number = 1) => {
    const newIndex = Math.max(0, currentIndex - steps);
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  // Lấy giá trị hiện tại trong lịch sử
  const current = history[currentIndex];

  return {
    current,          // Giá trị hiện tại (mới nhất)
    history,          // Toàn bộ lịch sử
    undo,
    redo,
    reset,
    clear,
    rollback,         // Quay lại giá trị trước
    canUndo: currentIndex > 0, // Kiểm tra có thể undo không
    canRedo: future.length > 0, // Kiểm tra có thể redo không
  };
}

export default useHistory;
