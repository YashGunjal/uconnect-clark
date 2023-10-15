import React from "react";
import { Button } from "reactstrap";
import { Modal, ModalBody,ModalFooter, ModalHeader } from "reactstrap";

export default function ({isOpen, onSubmit, onCancel, bodyContent}) {

    return(
        <Modal isOpen={isOpen}>
        <ModalHeader>Are you Sure?</ModalHeader>
        <ModalBody>{bodyContent}</ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={onSubmit}>
                Confirm
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
}