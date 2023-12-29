export const createCard = (
  cardItem,
  cardTemplate,
  deleteCardFunction,
  likeCard,
  openCardImage
) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardItem.link;
  cardElement.querySelector('.card__image').alt = `Локация: ${cardItem.name}`;
  cardElement.querySelector('.card__title').textContent = cardItem.name;
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', deleteCardFunction);
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard);
	const showImageButton = cardElement.querySelector('.card__image');
  showImageButton.addEventListener('click', () => {
		openCardImage(cardItem.name, cardItem.link)
		console.log(cardItem.name)
	});
  return cardElement;
};

export const deleteCard = (event) => {
  event.target.closest('.card').remove();
};

export const likeCard = (event) => {
  event.target.classList.toggle('card__like-button_is-active');
};

