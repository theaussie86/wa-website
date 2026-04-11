"use client";

import Script from "next/script";

export function ChatbotWidget() {
  return (
    <>
      <div
        id="chatbot-inline-container"
        className="w-full border border-gray-200 rounded-lg"
        style={{ height: "600px", minHeight: "500px" }}
      />
      <Script
        src="https://xjbkpfbiajcjkamvlrhw.supabase.co/storage/v1/object/public/widget-files/widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          if ((window as any).chatbot) {
            (window as any).chatbot("init", {
              target: "#chatbot-inline-container",
              projectId: "drk-luebeck-test",
              theme: {
                primaryColor: "#182d41ff",
              },
            });
          }
        }}
      />
    </>
  );
}
