import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { useCodespaceContext } from "@/providers/codespace-provider";
import { useUtilsContext } from "@/providers/utils-providers";

/**
 * Connects to a codespace's WebSocket endpoint and updates the component state whenever
 * a new message is received. The `sendUpdate` function can be used to send an updated
 * version of the content, which will be optimistically applied to the local state
 * immediately and then confirmed by the server.
 *
 * @param codespaceId The unique identifier for the codespace.
 * @returns A tuple containing the content of the codespace and a function to send an
 * updated version of the content.
 */
const useCodeSocket = (codespaceId: string | undefined) => {
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

/**
 * CodespaceArea component
 * This component renders the main area of the codespace page.
 * It's a simple centered heading with the title "Codespace Area".
 * It's styled with Tailwind CSS.
 * @returns {JSX.Element} The rendered CodespaceArea component.
 */
export default function CodespaceArea(): React.JSX.Element {
  const { codespace } = useCodespaceContext();
  const codespaceId =
    codespace && typeof codespace === "object" && "id" in codespace
      ? (codespace as { id: string }).id
      : undefined;
  const [content, sendUpdate] = useCodeSocket(codespaceId);
  const { updatePreloader } = useUtilsContext();

  codespace && updatePreloader();

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
          defaultValue={content}
          className="h-screen overflow-y-auto resize-none scroll-smooth"
          onChange={(e) => sendUpdate(e.target.value)}
          placeholder="Write or paste code here then share. Anyone you share with will see code as it is typed!"
        ></Textarea>
      </div>
    </div>
  );
}
