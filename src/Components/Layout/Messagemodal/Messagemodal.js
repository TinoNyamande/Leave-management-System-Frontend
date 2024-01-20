import Modal from "react-modal"
import "./Messagemodal.css"
import { useEffect,useState } from "react";
function Messagemodal(props) {
    const [isModalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
      };
      useEffect(() => {
        if (isModalOpen) {
          const timeoutId = setTimeout(() => {
            closeModal();
          }, 10000); // Auto-close after 5 seconds
    
          return () => clearTimeout(timeoutId);
        }
      }, [isModalOpen]);
  return (
    <Modal
      className="message-modal"
      isOpen={props.isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Success Modal"
    >
      <h2>{props.modalHeader}</h2>
      <p>{props.modalMessage}</p>
    </Modal>
  );
}
export default Messagemodal
