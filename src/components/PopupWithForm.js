import React from 'react';

function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <form className={`popup__container popup__container_type_${name}-form`} name={name} onSubmit={onSubmit} action="#">
        <button
          className="popup__btn-close"
          type="button"
          aria-label="кнопка закрыть"
          onClick={onClose}>
        </button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button className="popup__btn-save" type="submit">{buttonText}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;

