export const openModal = (popup) => {
  popup.classList.add('popup_is-animated', 'popup_is-opened');
  document.addEventListener('keydown', closeModalByEscape);
};

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
};

const closeModalByEscape = (event) => {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closeModal(activePopup);
  }
};
