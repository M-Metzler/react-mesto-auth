import React from "react";

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_view_opaque popup_type_fullscreen ${card.link ? 'popup_opened' : ''}`}>
            <div className="popup__wrap">
                <button
                    className="popup__btn-close"
                    type="button"
                    aria-label="кнопка закрыть"
                    onClick={onClose}>
                </button>
                <img className="popup__image" src={card.link} alt={card.name} />
                <p className="popup__caption">{card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;