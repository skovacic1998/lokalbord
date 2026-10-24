import type { ReactNode } from "react";
import { X } from "lucide-react";

type ModalProps = {
  titleId: string;
  className: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ titleId, className, onClose, children }: ModalProps) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" aria-label="Zatvori" onClick={onClose}>
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}
