import { cn } from "@/utils/cn";
import * as RdxPopover from "@radix-ui/react-popover";

interface PopoverRootProps {
  open: boolean;
  onChange: (state: boolean) => void;
  children: React.ReactNode;
}

function PopoverRoot({ open, onChange, children }: PopoverRootProps) {
  return (
    <RdxPopover.Root open={open} onOpenChange={onChange}>
      {children}
    </RdxPopover.Root>
  );
}

function PopoverTrigger({ children }: { children: React.ReactNode }) {
  return <RdxPopover.Trigger asChild>{children}</RdxPopover.Trigger>;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className={cn(
          "rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99] p-4",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-down-and-fade",
          className
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};
