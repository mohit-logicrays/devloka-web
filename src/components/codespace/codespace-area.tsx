import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useCodespaceContext } from "@/providers/codespace-provider";
import { CheckIcon, InfoIcon, PencilIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DOMAIN } from "@/utils/constants";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';

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
      socket = new WebSocket(`wss://${DOMAIN}ws/codespace/${codespaceId}/`);
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
  const { codespace, partialUpdateCodespace } = useCodespaceContext();
  const codespaceId =
    codespace && typeof codespace === "object" && "id" in codespace
      ? (codespace as { id: string }).id
      : undefined;

  const [content, sendUpdate] = useCodeSocket(codespaceId);
  const [edit, setEdit] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!codespace || !("id" in codespace)) return;
    const form = e.target as HTMLFormElement;
    if (!form) return;
    partialUpdateCodespace(codespace.id, new FormData(form));
    setEdit(true);
  };


  return (
    <div className="h-full w-full p-5">
      <div className="bg-secondary rounded-xl p-3 flex flex-col gap-y-5">
        {edit ? (
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">
              {codespace && "title" in codespace
                ? codespace.title
                : "Codespace Area"}
            </h1>
            <div className="flex gap-x-2">
              <Button variant={"ghost"} onClick={() => setEdit(false)}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button>
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Title</p>
                  </TooltipContent>
                </Tooltip>
              </Button>
              <AlertDialog>
                <Tooltip>
                  <TooltipTrigger>
                    <Button>
                      <AlertDialogTrigger>
                        <InfoIcon className="h-4 w-4" />
                      </AlertDialogTrigger>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Update codespace details</p>
                  </TooltipContent>
                </Tooltip>
                <AlertDialogContent>
                  <form className="flex flex-col gap-y-5" method="POST" onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                      <div className="flex items-center justify-between mb-5 border-b pb-2">
                        <AlertDialogTitle>Update Codespace Details.</AlertDialogTitle>
                        <AlertDialogTrigger asChild>
                          <Button variant={"ghost"}>
                            <XIcon className="h-6 w-6" />
                          </Button>
                        </AlertDialogTrigger>
                      </div>
                      <AlertDialogDescription className="flex flex-col gap-y-5">
                        <Input
                          name="title"
                          defaultValue={codespace && "title" in codespace ? codespace.title : ""}
                        />
                        <Textarea
                          name="description"
                          placeholder="Description"
                          defaultValue={codespace && "description" in codespace ? codespace.description : ""}
                        />
                        <div className="flex items-center space-x-2">
                          <Switch name="is_private" defaultChecked={codespace && "is_private" in codespace ? codespace.is_private : false} />
                          <Label htmlFor="is_private">Private Codespace</Label>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <Button data-slot="alert-dialog-trigger" type="submit">
                        Save
                      </Button>
                    </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : (
          <form method="POST" onSubmit={handleSubmit} className="flex justify-between items-center">
            <Input
              name="title"
              defaultValue={codespace && "title" in codespace ? codespace.title : ""} className="w-2xs" />
            <div className="flex gap-x-2">
              <Tooltip>
                <TooltipTrigger>
                  <Button>
                    <CheckIcon className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save Changes</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </form>
        )}
        <CodeMirror
          value={content}
          height="100%"
          extensions={[python(), javascript()]}
          className="h-screen overflow-y-auto resize-none scroll-smooth"
          theme="dark"
          placeholder="Write or paste code here then share. Anyone you share with will see code as it is typed!"
          onChange={(newContent) => sendUpdate(newContent)}
        />
      </div>
    </div >
  );
}
