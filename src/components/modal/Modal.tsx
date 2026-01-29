import type { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

function Modal({ title, children, onClose }: Props) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>✕</button>
        </header>

        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
