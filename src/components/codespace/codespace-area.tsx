import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { useCodespaceContext } from "@/providers/codespace-provider";
import { useUtilsContext } from "@/providers/utils-providers";

/**
 * Custom hook to manage WebSocket connection for code sharing.
 */
const useCodeSocket = (codespaceId: string | undefined) => {
  const [content, setContent] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!codespaceId) return;

    let socket: WebSocket;

    const connect = () => {
      socket = new WebSocket(`ws://localhost:8000/ws/codespace/${codespaceId}/`);
      socketRef.current = socket;

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (typeof data.content === "string") {
            setContent(data.content);
          }
        } catch (error) {
          console.error("WebSocket message parse error:", error);
        }
      };

      socket.onclose = () => {
        console.warn("WebSocket closed. Reconnecting in 3 seconds...");
        setTimeout(connect, 3000);
      };

      socket.onerror = (err) => {
        console.error("WebSocket error:", err);
        socket.close();
      };
    };

    connect();

    return () => {
      socket?.close();
    };
  }, [codespaceId]);

  const sendUpdate = (newContent: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ content: newContent }));
      setContent(newContent); // optimistic update
    }
  };

  return [content, sendUpdate] as const;
};

/**
 * Main collaborative codespace area.
 */
export default function CodespaceArea(): React.JSX.Element {
  const { codespace } = useCodespaceContext();
  const codespaceId =
    codespace && typeof codespace === "object" && "id" in codespace
      ? (codespace as { id: string }).id
      : undefined;

  const [content, sendUpdate] = useCodeSocket(codespaceId);
  const { updatePreloader } = useUtilsContext();

  useEffect(() => {
    if (codespace) updatePreloader();
  }, [codespace]);

  return (
    <div className="h-full w-full p-5">
      <div className="bg-secondary rounded-xl p-3 flex flex-col gap-y-5">
        <div className="flex justify-between items-center">
          <p>
            {codespace && "title" in codespace
              ? codespace.title
              : "Codespace Area"}
          </p>
        </div>
        <Textarea
          style={{ scrollbarWidth: "auto" }}
          value={content}
          className="h-screen overflow-y-auto resize-none scroll-smooth"
          onChange={(e) => sendUpdate(e.target.value)}
          placeholder="Write or paste code here then share. Anyone you share with will see code as it is typed!"
        />
      </div>
    </div>
  );
}
