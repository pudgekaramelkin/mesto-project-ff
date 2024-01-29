const cardTemplate = document.querySelector('#card-template').content;

import { likeCard, unlikeCard, deleteCard } from './api.js';

export const createCard = ({
  cardItem,
  openCardImage,
  deleteCardFunction,
  toggleLikeCard,
  currentUserId,
}) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardUserId = cardItem.owner['_id'];
  cardElement.querySelector('.card__image').src = cardItem.link;
  cardElement.querySelector('.card__image').alt = `Локация: ${cardItem.name}`;
  cardElement.querySelector('.card__title').textContent = cardItem.name;
  cardElement.querySelector('.card__like-amount').textContent =
    cardItem.likes.length;
  currentUserId === cardUserId
    ? cardElement
        .querySelector('.card__delete-button')
        .addEventListener('click', (event) => {
          deleteCardFunction(event, cardItem);
        })
    : cardElement.querySelector('.card__delete-button').remove();
  const likeButton = cardElement.querySelector('.card__like-button');
  if (cardItem.likes.some((like) => currentUserId === like['_id'])) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', (event) => {
    toggleLikeCard(event, cardItem, cardElement);
  });
  const cardImageButton = cardElement.querySelector('.card__image');
  cardImageButton.addEventListener('click', () => {
    openCardImage(cardItem.name, cardItem.link);
  });
  return cardElement;
};

export const deleteFunctionCallback = (event, cardItem) => {
  deleteCard(cardItem)
    .then(() => {
      event.target.closest('.card').remove();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const toggleLikeCard = (event, cardItem, cardElement) => {
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
