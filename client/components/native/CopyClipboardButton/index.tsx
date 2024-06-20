"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const CopyClipboardButton = ({ text }: { text: string }) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (clicked) {
        setClicked(false);
      }
    }, 1500);
  }, [clicked]);

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setClicked(true);
      }}
    >
      {clicked ? <CheckIcon color="green" /> : <CopyIcon />}
    </Button>
  );
};
