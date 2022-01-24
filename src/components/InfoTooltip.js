import React from 'react';
import imgOk from '../images/auth_reg-ok.svg';
import imgError from '../images/auth_reg-error.svg';

function InfoTooltip({ isOpen, onClose, message }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    className="popup__btn-close"
                    type="button"
                    aria-label="кнопка закрыть"
                    onClick={onClose}>
                </button>
                <img className="popup__reg-icon" src={message.img} alt="Подтверждение" />
                <h2 className="popup__title popup__title_center">{message.text}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;