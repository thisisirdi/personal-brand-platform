"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAnalytics } from "@/lib/useAnalytics";

export default function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { capture } = useAnalytics();

  useEffect(() => {
    if (pathname) {
      let url = window.location.origin + pathname;
      const search = searchParams.toString();
      if (search) {
        url += `?${search}`;
      }

      capture("page_viewed", {
        path: pathname,
        url,
        search: search || undefined,
        referrer: document.referrer || undefined,
      });
    }
  }, [capture, pathname, searchParams]);

  return null;
}
