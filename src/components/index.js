import '../pages/index.css';
import { createCard, toggleLikeCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  addNewCardServe,
  deleteCard,
} from './api.js';

const cardsList = document.querySelector('.places__list');

const formElementCard = document.forms['new-place'];
const formElementProfile = document.forms['edit-profile'];
const formElementAvatar = document.forms['edit-avatar'];

const formElementCardButton = formElementCard.querySelector('.popup__button');
const formElementProfileButton = formElementProfile.querySelector('.popup__button');
const formElementAvatarButton = formElementAvatar.querySelector('.popup__button');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const typeImagePopup = document.querySelector('.popup_type_image');
const userAvatarPopup = document.querySelector('.popup_type_avatar');

const imagePopup = typeImagePopup.querySelector('.popup__image');
const cardImageCaptionPopup = typeImagePopup.querySelector('.popup__caption');

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

const renderTextLoading = ({ isLoading, buttonElement }) => {
  if (!isLoading) {
    buttonElement.textContent = 'Сохранить';
  } else {
    buttonElement.textContent = 'Сохранение...';
  }
};

const openCardImage = (cardName, cardLink) => {
  cardImageCaptionPopup.textContent = cardName;
  imagePopup.src = cardLink;
  imagePopup.alt = cardName;
  openModal(typeImagePopup);
};

const addNewCard = (event) => {
  event.preventDefault();
  const cardItem = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
    likes: [],
  };
  renderTextLoading({
    isLoading: true,
    buttonElement: formElementCardButton,
  });
  addNewCardServe(cardItem)
    .then((cardData) => {
      cardsList.prepend(
        createCard({
          cardItem: cardData,
          deleteCard: deleteCard,
          openCardImage: openCardImage,
          toggleLikeCard: toggleLikeCard,
          currentUserId: cardData.owner['_id'],
        })
      );
      formElementCard.reset();
      closeModal(cardPopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderTextLoading({
        isLoading: false,
        buttonElement: formElementCardButton,
      });
    });
};

const handleFormProfileSubmit = (event) => {
  event.preventDefault();
  renderTextLoading({
    isLoading: true,
    buttonElement: formElementProfileButton,
  });
  clearValidation(profilePopup, validationConfig);
  updateUserInfo(nameInput.value, jobInput.value)
    .then(() => {
      const name = profileTitle;
      const job = profileDescription;
      name.textContent = nameInput.value;
      job.textContent = jobInput.value;
      closeModal(profilePopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderTextLoading({
        isLoading: false,
        buttonElement: formElementProfileButton,
      });
    });
};

const updateUserAvatarSubmit = (event) => {
  event.preventDefault();
  renderTextLoading({
    isLoading: true,
    buttonElement: formElementAvatarButton,
  })
  clearValidation(userAvatarPopup, validationConfig);
  updateUserAvatar(avatarInput.value)
  .then(() => {
    profileImage.style.backgroundImage = `url(${avatarInput.value})`;
    formElementAvatar.reset();
    closeModal(userAvatarPopup);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    renderTextLoading({
      isLoading: false,
      buttonElement: formElementAvatarButton,
    })
  });
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
        createCard({
          cardItem: cardItem,
          deleteCard: deleteCard,
          openCardImage: openCardImage,
          toggleLikeCard: toggleLikeCard,
          currentUserId: user['_id'],
        })
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

enableValidation(validationConfig);
