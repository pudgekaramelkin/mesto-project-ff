import './pages/index.css';
import {
  createCard,
  deleteCard,
  likeCard,
  openImage,
} from './components/card.js';
import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modalWindows.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const formElementProfile = document.forms['edit-profile'];
const formElementCard = document.forms['new-place'];
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const typeImagePopup = document.querySelector('.popup_type_image');

const imagePopup = typeImagePopup.querySelector('.popup__image');
const captionPopup = typeImagePopup.querySelector('.popup__caption');

const closePopupButtons = document.querySelectorAll('.popup__close');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const nameInput = formElementProfile.name;
const jobInput = formElementProfile.description;
const cardNameInput = formElementCard['place-name'];
const cardLinkInput = formElementCard.link;

const openCardImage = (cardName, cardLink) => {
  captionPopup.textContent = cardName;
  imagePopup.src = cardLink;
  imagePopup.alt = cardName;
  openModal(typeImagePopup);
};

const addNewCard = (event) => {
  event.preventDefault();
  let cardItem = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  cardsList.prepend(
    createCard(cardItem, cardTemplate, deleteCard, likeCard, openCardImage)
  );
  closeModal(cardPopup);
  cardNameInput.value = '';
  cardLinkInput.value = '';
};

initialCards.forEach((cardItem) => {
  cardsList.append(
    createCard(cardItem, cardTemplate, deleteCard, likeCard, openCardImage)
  );
});

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

const handleFormSubmit = (event) => {
  event.preventDefault();
  let name = document.querySelector('.profile__title');
  let job = document.querySelector('.profile__description');
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closeModal(profilePopup);
};

formElementProfile.addEventListener('submit', handleFormSubmit);
formElementCard.addEventListener('submit', addNewCard);

editProfileButton.addEventListener('click', () => {
  openModal(profilePopup);
});

addCardButton.addEventListener('click', () => {
  openModal(cardPopup);
});

closePopupButtons.forEach((exitButton) => {
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
