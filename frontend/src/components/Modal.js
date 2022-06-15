import React from "react";
import { useState } from 'react';

const Modal = () => {
    const [showModal, setShowModal] = useState(true);
    return (
        <>
            {
                showModal ? 
                <div className="modal-wrapper">
                    <div className="modal-content">
                        <h1>Success</h1>
                    </div>
                </div> : ''
            }
        </>
    )
};

export default Modal;