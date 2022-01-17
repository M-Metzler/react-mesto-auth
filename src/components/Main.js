import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile profile_box_position">
        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
        <button className="profile__avatar-edit" onClick={onEditAvatar}></button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__button-edit"
            type="button"
            onClick={onEditProfile}>
          </button>
          <p className="profile__about-self">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="кнопка добавить карточку"
          onClick={onAddPlace}>
        </button>
      </section>

      <section className="cards cards_box_position">
        <ul className="cards__items">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />)
          )}
        </ul>
      </section>
    </main>
  );

}

export default Main;