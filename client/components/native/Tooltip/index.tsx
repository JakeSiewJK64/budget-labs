import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { BsInfoSquareFill } from "react-icons/bs";

export const GenericTooltip = ({ content }: { content: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <BsInfoSquareFill className="my-auto" />
        </TooltipTrigger>
        <TooltipContent
          avoidCollisions
          className={cn(
            "TooltipContent",
            "bg-black p-1 mx-2 max-w-[30rem] font-normal text-sm rounded"
          )}
        >
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
