// src/utils/cookies.ts

export type CookieOptions = {
  path?: string;
  maxAge?: number;       // Tính bằng giây
  expires?: Date;        // Thời điểm hết hạn
  secure?: boolean;      // Chỉ gửi qua HTTPS
  sameSite?: 'Strict' | 'Lax' | 'None';
  httpOnly?: boolean;    // Không dùng được trong JS (dùng khi set từ server)
};

/**
 * Đặt cookie
 * @param name Tên cookie
 * @param value Giá trị (sẽ tự động stringify nếu là object)
 * @param options Tuỳ chọn cookie
 */
export function setCookie(name: string, value: string | object, options: CookieOptions = {}) {
  let cookieValue =
    typeof value === 'object' ? encodeURIComponent(JSON.stringify(value)) : encodeURIComponent(String(value));

  let cookieString = `${encodeURIComponent(name)}=${cookieValue}`;

  if (options.expires) {
    cookieString += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.maxAge !== undefined) {
    cookieString += `; max-age=${options.maxAge}`;
  }

  cookieString += `; path=${options.path || '/'}`;

  if (options.secure) {
    cookieString += `; Secure`;
  }

  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }

  // ⚠️ httpOnly không thể set từ JavaScript

  document.cookie = cookieString;
}

/**
 * Lấy giá trị cookie
 * @param name Tên cookie cần lấy
 */
export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + "=";
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * Xóa cookie
 * @param name Tên cookie cần xóa
 * @param path Đường dẫn (mặc định là '/')
 */
export function removeCookie(name: string, path: string = '/') {
  document.cookie = `${encodeURIComponent(name)}=; max-age=0; path=${path}`;
}
