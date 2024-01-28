const cardTemplate = document.querySelector('#card-template').content;
export const createCard = (
  cardItem,
  deleteCard,
  openCardImage,
  toggleLikeCard,
  currentUserId
) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardUserId = cardItem.owner['_id'];
  cardElement.querySelector('.card__image').src = cardItem.link;
  cardElement.querySelector('.card__image').alt = `Локация: ${cardItem.name}`;
  cardElement.querySelector('.card__title').textContent = cardItem.name;
  cardElement.querySelector('.card__like-amount').textContent =
    cardItem.likes.length;
  (currentUserId === cardUserId)
    ? cardElement
        .querySelector('.card__delete-button')
        .addEventListener('click', (event) => {
          event.target.closest('.card').remove();
          deleteCard(cardItem);
        })
    : cardElement.querySelector('.card__delete-button').remove();
  const likeButton = cardElement.querySelector('.card__like-button');
  if (cardItem.likes.some((like) => (currentUserId === like['_id']))) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', (event) => {
    toggleLikeCard(event, cardItem, cardElement);
  });
  const showImageButton = cardElement.querySelector('.card__image');
  showImageButton.addEventListener('click', () => {
    openCardImage(cardItem.name, cardItem.link);
  });
  return cardElement;
};
