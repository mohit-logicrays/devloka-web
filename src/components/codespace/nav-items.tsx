import { useCodespaceContext } from "@/providers/codespace-provider";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SyntaxSelect() {
  const { syntaxes, codespace, getSyntaxes, partialUpdateCodespace } = useCodespaceContext();
  const [syntax, setSyntax] = useState("");

  useEffect(() => {
    getSyntaxes();
  }, []);

  useEffect(() => {
    if (
      codespace &&
      "syntax" in codespace &&
      typeof codespace.syntax?.title === "string"
    ) {
      setSyntax(codespace.syntax.title);
    }
  }, [codespace]);

  /**
   * Handles the change event of the syntax select and updates the codespace
   * with the new syntax.
   *
   * @param {string} value - The new syntax value to update.
   */
  const handleChange = (value: string) => {
    // Update the codespace with the new syntax
    if (!codespace || !("id" in codespace)) return;
    partialUpdateCodespace(codespace?.id, {
      syntax_id: syntaxes.find((s) => s.title === value)?.id,
    });
  };

  return (
    <div>
      <Select value={syntax} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Syntax" />
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            {(Array.isArray(syntaxes) ? syntaxes : []).map((syntax) => (
              <SelectItem key={syntax.title} value={syntax.title}>
                {syntax.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function TabSize() {
  return (
    <div>
      <Select defaultValue="2">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Tab Size" />
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            <SelectItem value={"2"}>2</SelectItem>
            <SelectItem value={"4"}>4</SelectItem>
            <SelectItem value={"6"}>6</SelectItem>
            <SelectItem value={"8"}>8</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function ThemeSelect() {
  return (
    <div>
      <Select defaultValue="2">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Editor Theme" />
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            <SelectItem value={"2"}>2</SelectItem>
            <SelectItem value={"4"}>4</SelectItem>
            <SelectItem value={"6"}>6</SelectItem>
            <SelectItem value={"8"}>8</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
