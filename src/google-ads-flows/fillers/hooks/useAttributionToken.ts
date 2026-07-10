import { useEffect, useRef } from "react";
import { captureAttributionParams, createAttributionToken } from "../lib/attributionApi";

export function useAttributionToken(): string | null {
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (tokenRef.current) return;
    const params = captureAttributionParams();
    createAttributionToken(params).then((token) => {
      tokenRef.current = token;
    });
  }, []);

  return tokenRef.current;
}