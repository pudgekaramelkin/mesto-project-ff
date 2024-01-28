import './pages/index.css';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  addNewCardServe,
  deleteCard,
  likeCard,
  unlikeCard,
} from './components/api.js';

const cardsList = document.querySelector('.places__list');

const formElementCard = document.forms['new-place'];
const formElementProfile = document.forms['edit-profile'];
const formElementAvatar = document.forms['edit-avatar'];

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const typeImagePopup = document.querySelector('.popup_type_image');
const userAvatarPopup = document.querySelector('.popup_type_avatar');

const imagePopup = typeImagePopup.querySelector('.popup__image');
const captionPopup = typeImagePopup.querySelector('.popup__caption');

const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupNewCardOpenButton = document.querySelector('.profile__add-button');
const popupUserAvatarButton = document.querySelector('.profile__image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const nameInput = formElementProfile.name;
const jobInput = formElementProfile.description;
const avatarInput = formElementAvatar.avatar;
const cardNameInput = formElementCard['place-name'];
const cardLinkInput = formElementCard.link;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const openCardImage = (cardName, cardLink) => {
  captionPopup.textContent = cardName;
  imagePopup.src = cardLink;
  imagePopup.alt = cardName;
  openModal(typeImagePopup);
};

const addNewCard = (event) => {
  event.preventDefault();
  formElementCard.querySelector('.popup__button').textContent = 'Сохранение...';
  const cardItem = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
    likes: [],
  };
  addNewCardServe(cardItem).then((cardData) => {
    cardsList.prepend(
      createCard(
        cardData,
        deleteCard,
        openCardImage,
        toggleLikeCard,
        cardData.owner['_id']
      )
    );
  });
  cardNameInput.value = '';
  cardLinkInput.value = '';
  closeModal(cardPopup);
  formElementCard.querySelector('.popup__button').textContent = 'Сохранить';
};

const handleFormProfileSubmit = (event) => {
  event.preventDefault();
  formElementProfile.querySelector('.popup__button').textContent =
    'Сохранение...';
  clearValidation(profilePopup, validationConfig);
  const name = document.querySelector('.profile__title');
  const job = document.querySelector('.profile__description');
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  updateUserInfo(nameInput.value, jobInput.value);
  closeModal(profilePopup);
  formElementProfile.querySelector('.popup__button').textContent = 'Сохранить';
};

const updateUserAvatarSubmit = (event) => {
  event.preventDefault();
  formElementAvatar.querySelector('.popup__button').textContent =
    'Сохранение...';
  clearValidation(userAvatarPopup, validationConfig);
  profileImage.style.backgroundImage = `url(${avatarInput.value})`;
  updateUserAvatar(avatarInput.value);
  closeModal(userAvatarPopup);
  formElementAvatar.querySelector('.popup__button').textContent = 'Сохранить';
};

const toggleLikeCard = (event, cardItem, cardElement) => {
  const currentLikes = cardElement.querySelector('.card__like-amount');
  if (event.target.classList.contains('card__like-button_is-active')) {
    unlikeCard(cardItem)
      .then((card) => {
        event.target.classList.remove('card__like-button_is-active');
        currentLikes.textContent = card.likes.length;
      })
      .catch((error) => console.log(error));
  } else {
    likeCard(cardItem)
      .then((card) => {
        event.target.classList.add('card__like-button_is-active');
        currentLikes.textContent = card.likes.length;
      })
      .catch((error) => console.log(error));
  }
};

formElementProfile.addEventListener('submit', handleFormProfileSubmit);
formElementCard.addEventListener('submit', addNewCard);
formElementAvatar.addEventListener('submit', updateUserAvatarSubmit);

popupProfileOpenButton.addEventListener('click', () => {
  clearValidation(profilePopup, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

popupNewCardOpenButton.addEventListener('click', () => {
  clearValidation(cardPopup, validationConfig);
  openModal(cardPopup);
});

popupUserAvatarButton.addEventListener('click', () => {
  clearValidation(userAvatarPopup, validationConfig);
  openModal(userAvatarPopup);
});

popupCloseButtons.forEach((exitButton) => {
  const activePopup = exitButton.closest('.popup');
  exitButton.addEventListener('click', () => {
    closeModal(activePopup);
  });
  activePopup.addEventListener('mousedown', (event) => {
    if (event.currentTarget === event.target) {
      closeModal(activePopup);
    }
  });
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    profileImage.style.backgroundImage = `url(${user.avatar}`;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    cards.forEach((cardItem) => {
      cardsList.append(
        createCard(
          cardItem,
          deleteCard,
          openCardImage,
          toggleLikeCard,
          user['_id']
        )
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

enableValidation(validationConfig);
