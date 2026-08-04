import { useEffect, useState } from 'react';

export function useToast(durationMs = 1800) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const id = window.setTimeout(() => setMessage(null), durationMs);
    return () => window.clearTimeout(id);
  }, [message, durationMs]);

  return {
    message,
    show: (text: string) => setMessage(text),
    Toast: message ? <div className="toast">{message}</div> : null,
  };
}
