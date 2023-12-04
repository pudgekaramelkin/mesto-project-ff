const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const createCard = (cardItem, deleteCardFunction) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardItem.link;
  cardElement.querySelector('.card__image').alt = `Локация: ${cardItem.name}`;
  cardElement.querySelector('.card__title').textContent = cardItem.name;
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', deleteCardFunction);
  return cardElement;
};

const deleteCard = (event) => {
  event.target.closest('.card').remove();
};

initialCards.forEach((cardItem) => {
  cardsList.append(createCard(cardItem, deleteCard));
});