"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ChapterProvider } from "@/lib/chapter-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ChapterProvider>{children}</ChapterProvider>
    </Provider>
  );
}
