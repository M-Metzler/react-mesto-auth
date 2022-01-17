import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = `${isOwn ? 'card__btn-delete' : 'card__btn-delete_hidden'}`;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `card__btn-like ${isLiked ? 'card__btn-like_active' : ''}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="card">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="card__info">
                <h2 className="card__header">{card.name}</h2>
                <div className="card__container-like">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label="кнопка лайк"
                        onClick={handleLikeClick}>
                    </button>
                    <span className="card__counter-like">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;