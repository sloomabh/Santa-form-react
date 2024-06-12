import React from "react";
import "../styles/style.css";

interface ModalProps {
    message: string;
    onClose: () => void;
    type: "error" | "success";
}

const Modal: React.FC<ModalProps> = ({ message, onClose, type }) => {
    return (
        <div className="modal">
            <div className="modal__content">
                <div className={`modal__header modal__header--${type}`}>
                    {type === "error" ? "ERROR" : "SUCCESS"}
                </div>
                <div className="modal__body">
                    <p>{message}</p>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
