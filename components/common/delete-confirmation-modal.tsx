import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./button";
import { Modal } from "./modal";

interface DeleteConfirmationModalProps {
  title: string;
  description?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onConfirm(): void;
  onClose(): void;
}

export function DeleteConfirmationModal({
  onConfirm,
  onClose,
  title,
  description,
  isLoading,
  isOpen,
}: DeleteConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} title="" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-0 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>

        <p className="w-[180px] text-gray-800 tracking-[-0.5px] font-bold">
          {title}
        </p>

        {description && (
          <p className="tracking-[-0.5px] text-gray-800">{description}</p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          variant="danger"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Confirm
        </Button>

        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
