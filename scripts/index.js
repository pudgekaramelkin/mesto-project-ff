const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

function createCard(cardItem) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardItem.link;
  cardElement.querySelector('.card__image').alt = cardItem.name;
  cardElement.querySelector('.card__title').textContent = cardItem.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(event) {
    event.target.closest('.card').remove();
  });
  cardsList.append(cardElement);
}

initialCards.forEach(cardItem => {
  createCard(cardItem);
});