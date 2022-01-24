import React from 'react';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Footer from './Footer';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

//foto
import imgAuthSuccessful from '../images/auth_reg-ok.svg';
import imgAuthError from '../images/auth_reg-error.svg';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState({ img: '', text: '' });
  const history = useHistory();


  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }, [history]);


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltipShow() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api.editUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
  }

  function handleUpdateAvatar({ avatar }) {
    api.editUserAvatar({ avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
  }


  function handleTooltipInfo({ img, text }) {
    setMessage({ img, text });
  }


  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    const changeLike = isLiked ? api.removeLike(card._id) : api.addLike(card._id)
    changeLike
      .then((newCard) => {
        //Создаем новый массив на основе имеющегося и вставляем в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
  }


  //закрытие попап по ESC и оверлей

  useEffect(() => {
    function hadleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', hadleEscClose);
    return () => {
      document.removeEventListener('keydown', hadleEscClose);
    }
  }, []);

  useEffect(() => {
    function hadleOverlayClose(evt) {
      if (evt.target.classList.contains('popup')) {
        closeAllPopups();
      }
    }
    document.addEventListener('mousedown', hadleOverlayClose);
    return () => {
      document.removeEventListener('mousedown', hadleOverlayClose);
    }
  }, []);

  //Регистрация, авторизация, выход

  function registration({ email, password }) {
    auth.register({ email, password })
      .then((res) => {
        handleTooltipInfo({
          img: imgAuthSuccessful,
          text: "Вы успешно зарегистрировались!",
        });
        handleInfoTooltipShow();
        history.push('/sing-in');
      })
      .catch((err) => {
        handleTooltipInfo({
          img: imgAuthError,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltipShow();
        console.log(`Ошибка: ${err}`);
      });
  }


  function authorization({ email, password }) {
    auth.authorize({ email, password })
      .then((data) => {
        if (!data) {
          return;
        }
        setLoggedIn(true);
        setEmail(email);
        history.push('/');
      })
      .catch((err) => {
        handleTooltipInfo({
          img: imgAuthError,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltipShow();
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail('');
    history.push('/sign-in');
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header loggedIn={loggedIn} email={email} onLogout={handleSignOut} />
          <Switch>
            <Route path="/sign-up">
              <Register registration={registration} />
            </Route>
            <Route path="/sign-in">
              <Login authorization={authorization} />
            </Route>
            <ProtectedRoute
              exact path="/"
              component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
        </div>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          message={message}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
