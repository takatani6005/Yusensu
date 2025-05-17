// // src/hooks/useFetch.ts

// import { useEffect, useRef, useState, useCallback } from 'react';

// interface UseFetchOptions {
//   method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
//   headers?: HeadersInit;
//   body?: any;
//   immediate?: boolean;
//   timeout?: number;            // milliseconds
//   pollingInterval?: number;    // tự động gọi lại sau X ms
//   cacheKey?: string;           // lưu cache (optional)
//   withToken?: boolean;         // tự động thêm Authorization header
//   retries?: number;            // số lần thử lại khi lỗi
// }

// interface UseFetchResult<T> {
//   data: T | null;
//   error: string | null;
//   isLoading: boolean;
//   refetch: () => void;
//   cancel: () => void;
// }

// const cacheStore = new Map<string, any>();

// function useFetch<T = any>(
//   url: string,
//   options: UseFetchOptions = {}
// ): UseFetchResult<T> {
//   const {
//     method = 'GET',
//     headers = {},
//     body,
//     immediate = true,
//     timeout = 10000,
//     pollingInterval,
//     cacheKey,
//     withToken = false,
//     retries = 0,
//   } = options;

//   const [data, setData] = useState<T | null>(cacheKey ? cacheStore.get(cacheKey) || null : null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const controllerRef = useRef<AbortController | null>(null);
//   const retryCount = useRef(0);
//   const pollingRef = useRef<NodeJS.Timeout | null>(null);

//   const cancel = () => controllerRef.current?.abort();

//   const fetchData = useCallback(() => {
//     setIsLoading(true);
//     setError(null);

//     const controller = new AbortController();
//     controllerRef.current = controller;

//     const timer = setTimeout(() => controller.abort(), timeout);

//     const token = withToken ? localStorage.getItem('token') || '' : '';

//     fetch(url, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         ...(withToken && token ? { Authorization: `Bearer ${token}` } : {}),
//         ...headers,
//       },
//       body: body ? JSON.stringify(body) : undefined,
//       signal: controller.signal,
//     })
//       .then(async res => {
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         return res.json();
//       })
//       .then(json => {
//         setData(json);
//         cacheKey && cacheStore.set(cacheKey, json);
//         retryCount.current = 0;
//       })
//       .catch(err => {
//         if (err.name === 'AbortError') return;
//         if (retryCount.current < retries) {
//           retryCount.current += 1;
//           fetchData(); // retry
//         } else {
//           setError(err.message || 'Something went wrong');
//         }
//       })
//       .finally(() => {
//         setIsLoading(false);
//         clearTimeout(timer);
//       });
//   }, [url, method, headers, body, timeout, cacheKey, withToken, retries]);

//   useEffect(() => {
//     if (immediate) fetchData();

//     return () => {
//       cancel();
//       if (pollingRef.current) clearInterval(pollingRef.current);
//     };
//   }, [fetchData, immediate]);

//   useEffect(() => {
//     if (pollingInterval && pollingInterval > 0) {
//       pollingRef.current = setInterval(() => {
//         fetchData();
//       }, pollingInterval);

//       return () => {
//         if (pollingRef.current) clearInterval(pollingRef.current);
//       };
//     }
//   }, [pollingInterval, fetchData]);

//   return { data, error, isLoading, refetch: fetchData, cancel };
// }

// export default useFetch;
export{}