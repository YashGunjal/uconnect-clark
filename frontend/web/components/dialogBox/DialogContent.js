import React from "react";
import {
  useHistory,
} from "react-router-dom";
import { Modal } from "reactstrap";
import styles from "./DialogBox.style.css";

export default function DialogContent({ onReturn, perphericalClose = true, children,className, contentClass ,onClose, style}){
    let history = useHistory();
  
    const handleClose = () => {
      onClose && onClose()
      if (perphericalClose) {
        onReturn ? history.push(onReturn) : history.goBack();
      }
    };
  
    return (
      <Modal
        isOpen={true}
        toggle={handleClose}
        fullscreen="lg"
        onClosed={handleClose}
        className={className || styles.popOverRoot}
        style={style}
        contentClassName={contentClass || styles.modalMainContent}
      >
        {children}
      </Modal>
    );
  };