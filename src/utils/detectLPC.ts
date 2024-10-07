// src/utils/detectLPC.ts
export const detectLCP = (setLCPUrl: (url: string) => void) => {
  if ("PerformanceObserver" in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      for (const entry of entries as PerformanceEntryList) {
        if (
          "element" in entry &&
          entry.element &&
          (entry.element as Element).tagName === "IMG"
        ) {
          // 이미지 요소의 LCP 이벤트를 감지
          const imgElement = entry.element as HTMLImageElement;
          setLCPUrl(imgElement.src); // LCP 이미지 URL을 상태로 업데이트
        }
      }
    });

    observer.observe({ type: "largest-contentful-paint", buffered: true });
  }
};
