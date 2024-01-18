import './pages/index.css';
import {
  createCard,
  deleteCard,
  likeCard
} from './components/card.js';
import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const formElementCard = document.forms['new-place'];
const formElementProfile = document.forms['edit-profile'];
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const typeImagePopup = document.querySelector('.popup_type_image');

const imagePopup = typeImagePopup.querySelector('.popup__image');
const captionPopup = typeImagePopup.querySelector('.popup__caption');

const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupNewCardOpenButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const nameInput = formElementProfile.name;
const jobInput = formElementProfile.description;
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
  const cardItem = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  cardsList.prepend(
    createCard(cardItem, cardTemplate, deleteCard, likeCard, openCardImage)
  );
  cardNameInput.value = '';
  cardLinkInput.value = '';
  closeModal(cardPopup);
};

initialCards.forEach((cardItem) => {
  cardsList.append(
    createCard(cardItem, cardTemplate, deleteCard, likeCard, openCardImage)
  );
});

const handleFormProfileSubmit = (event) => {
  event.preventDefault();
  clearValidation(profilePopup, validationConfig);
  const name = document.querySelector('.profile__title');
  const job = document.querySelector('.profile__description');
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closeModal(profilePopup);
};

formElementProfile.addEventListener('submit', handleFormProfileSubmit);
formElementCard.addEventListener('submit', addNewCard);

popupProfileOpenButton.addEventListener('click', () => {
  clearValidation(profilePopup, validationConfig)
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

popupNewCardOpenButton.addEventListener('click', () => {
  clearValidation(cardPopup, validationConfig);
  openModal(cardPopup);
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

enableValidation(validationConfig); 
