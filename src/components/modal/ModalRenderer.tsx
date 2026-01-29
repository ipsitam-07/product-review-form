import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Modal from './Modal';

function ModalRenderer() {
  const { state, dispatch } = useContext(AppContext);
  const { modal } = state;

  if (!modal.type) return null;

  if (modal.type === 'edit') {
    return (
      <Modal title="Edit Review" onClose={() => dispatch({ type: 'CLOSE_MODAL' })}>
        <p>Do you want to edit this review?</p>

        <button
          onClick={() => {
            dispatch({ type: 'EDIT_REVIEW', reviewId: modal.reviewId! });
            dispatch({ type: 'CLOSE_MODAL' });
          }}
        >
          Yes, Edit
        </button>
      </Modal>
    );
  }

  if (modal.type === 'delete') {
    return (
      <Modal title="Delete Review" onClose={() => dispatch({ type: 'CLOSE_MODAL' })}>
        <p>This action cannot be undone.</p>

        <button onClick={() => dispatch({ type: 'CONFIRM_DELETE' })}>Delete</button>
      </Modal>
    );
  }

  return null;
}

export default ModalRenderer;
