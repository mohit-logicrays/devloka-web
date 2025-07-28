import { createContext, useContext, useState } from "react";
import { getRequest, patchRequest } from "@/utils/axios-request";
import { ApiUrl, UrlPaths } from "@/utils/constants";
import { loadingToast } from "@/utils/message-utils";
import { LoadingMessage } from "@/utils/loading-messages";
import { updateCodesapceSuccess } from "@/utils/success";

interface Syntax {
  id: number;
  title: string;
  description: string;
  status: number;
}
interface Codespace {
  id: string;
  title: string;
  description: string;
  status: number;
  syntax: Syntax;
  user: null;
  content: string;
  is_private: boolean;
}
interface CodespaceContextType {
  codespace: Codespace | {};
  codeSpaceContent: (codespaceId: string) => Promise<void>;
  partialUpdateCodespace: (codespaceId: string, data: any) => Promise<void>;
  syntaxes: Syntax[];
  getSyntaxes: () => Promise<void>;
}

const CodespaceContext = createContext<CodespaceContextType | null>(null);

/**
 * Provides a context for codespaces.
 *
 * This provider is used to wrap the part of the app that needs to know about
 * the current codespace.
 */
export const CodespaceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let id = null;
  const [codespace, setCodespace] = useState<Codespace | {}>({});
  const [syntaxes, setSyntaxes] = useState<Syntax[]>([]);

  /**
   * Fetches or updates the content for a specific codespace.
   *
   * This function interacts with the backend to retrieve or modify
   * the content associated with the given codespace ID.
   *
   * @param codespaceId - The unique identifier for the codespace.
   */
  const codeSpaceContent = async (codespaceId: string) => {
    const response = await getRequest(
      `${ApiUrl}${UrlPaths.CODESPACE}${codespaceId}/`,
      "",
      false,
      () => {}
    );
    setCodespace(response?.data);
  };

  /**
   * Partially updates the content for a specific codespace.
   *
   * This function interacts with the backend to retrieve the content associated
   * with the given codespace ID and updates the state with the new data.
   *
   * @param codespaceId - The unique identifier for the codespace.
   */
  const partialUpdateCodespace = async (codespaceId: string, data: any) => {
    id = loadingToast(LoadingMessage.UPDATE, null);
    const response = await patchRequest(
      `${ApiUrl}${UrlPaths.CODESPACE}${codespaceId}/`,
      data,
      id,
      false,
      updateCodesapceSuccess
    );
    setCodespace(response?.data);
  };

  /**
   * Retrieves the list of supported syntaxes from the backend.
   *
   * @returns Promise that resolves when the syntaxes have been fetched.
   */
  const getSyntaxes = async () => {
    const response = await getRequest(
      `${ApiUrl}${UrlPaths.SYNTAXES}`,
      "",
      false,
      () => {}
    );
    setSyntaxes(response?.data);
  };

  const data = {
    codespace,
    partialUpdateCodespace,
    codeSpaceContent,
    syntaxes,
    getSyntaxes,
  };
  return (
    <CodespaceContext.Provider value={data}>
      {children}
    </CodespaceContext.Provider>
  );
};

/**
 * Access the codespace context.
 *
 * This hook will throw an error if called outside of a `CodespaceProvider`.
 *
 * @returns The codespace context.
 */
export const useCodespaceContext = () => {
  const context = useContext(CodespaceContext);
  if (!context) {
    throw new Error("useCodespaceContext must be used within a UtilsProvider");
  }
  return context;
};
