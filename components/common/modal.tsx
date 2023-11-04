import * as RdxDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { cn } from "@/utils/cn";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  title: string;
  onClose?(): void;
}

export function Modal({ isOpen, title, onClose, children }: ModalProps) {
  return (
    <RdxDialog.Root open={isOpen} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay
          className={cn(
            "fixed inset-0 bg-black/60 backdrop-blur-sm z-50",
            "data-[state=open]:animate-overlay-show"
          )}
        />

        <RdxDialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 space-y-4 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none",
            "data-[state=open]:animate-content-show"
          )}
        >
          <header className="h-12 flex items-center justify-between text-gray-800">
            <span className="text-2xl font-bold">{title}</span>
            <button
              className="w-12 h-12 flex items-center justify-center outline-none"
              onClick={onClose}
            >
              <Cross2Icon className="w-6 h-6" />
            </button>
          </header>

          <div>{children}</div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
