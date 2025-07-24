import React, { useEffect, useRef, useState } from "react";

const useCodeSocket = (codespaceId: string) => {
  const [content, setContent] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!codespaceId) return;

    socketRef.current = new WebSocket(
      `ws://localhost:8000/ws/codespace/${codespaceId}/`
    );

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (typeof data.content === "string") {
          setContent(data.content);
        }
      } catch (e) {
        // handle parse error
      }
    };

    return () => {
      socketRef.current?.close();
    };
  }, [codespaceId]);

  const sendUpdate = (newContent: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ content: newContent }));
      setContent(newContent); // optimistically update local state
    }
  };  

  return [content, sendUpdate] as const;
};

const CodeEditor = ({ codespaceId = "mohit" }: { codespaceId: string }) => {
  const [content, sendUpdate] = useCodeSocket(codespaceId);

  return (
    <textarea
      value={content}
      onChange={(e) => sendUpdate(e.target.value)}
      className="w-full h-screen"
    />
  );
};

export default CodeEditor;
