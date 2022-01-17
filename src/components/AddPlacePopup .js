import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const nameRef = React.useRef();
    const linkRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
    }

    React.useEffect(() => {
        if (!isOpen) {
            nameRef.current.value = '';
            linkRef.current.value = '';
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            name='card'
            title='Новое место'
            buttonText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
                className="popup__text popup__text_type_title"
                type="text"
                id="title"
                name="title"
                autoComplete="off"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                ref={nameRef}
                required />
            <span className="popup__text-error" id="title-error"></span>
            <input
                className="popup__text popup__text_type_url"
                type="url"
                id="url"
                name="url"
                autoComplete="off"
                placeholder="Ссылка на картинку"
                ref={linkRef}
                required />
            <span className="popup__text-error" id="url-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;