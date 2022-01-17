import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupConfirmDelete({ isOpen, onClose }) {
    return (
        <PopupWithForm name='delete-card' title='Вы уверены?' buttonText='Да' isOpen={isOpen} onClose={onClose} />
    );
}

export default PopupConfirmDelete;