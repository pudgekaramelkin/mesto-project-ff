const CONFIG = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-5',
  headers: {
    authorization: 'd291c895-9cb6-404f-971c-d8cdcea01f0e',
    'Content-Type': 'application/json',
  },
};

const getServerAnswer = (result) => {
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(`Ошибка: ${result.status}`);
};

export const getInitialCards = () => {
  return fetch(`${CONFIG.baseUrl}/cards`, {
    headers: CONFIG.headers,
  }).then(getServerAnswer);
};

export const getUserInfo = () => {
  return fetch(`${CONFIG.baseUrl}/users/me`, {
    headers: CONFIG.headers,
  }).then(getServerAnswer);
};

export const updateUserInfo = (userName, userDescription) => {
  return fetch(`${CONFIG.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: CONFIG.headers,
    body: JSON.stringify({
      name: userName,
      about: userDescription,
    }),
  }).then(getServerAnswer);
};

export const addNewCardServe = (cardItem) => {
  return fetch(`${CONFIG.baseUrl}/cards`, {
    method: 'POST',
    headers: CONFIG.headers,
    body: JSON.stringify({
      name: cardItem.name,
      link: cardItem.link,
    }),
  }).then(getServerAnswer);
};

export const deleteCard = (cardItem) => {
  return fetch(`${CONFIG.baseUrl}/cards/${cardItem['_id']}`, {
    method: 'DELETE',
    headers: CONFIG.headers,
  }).then(getServerAnswer);
};

export const updateUserAvatar = (userAvatar) => {
  return fetch(`${CONFIG.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: CONFIG.headers,
    body: JSON.stringify({
      avatar: userAvatar,
    }),
  }).then(getServerAnswer);
};

export const likeCard = (cardItem) => {
  return fetch(`${CONFIG.baseUrl}/cards/likes/${cardItem['_id']}`, {
    method: 'PUT',
    headers: CONFIG.headers,
  }).then(getServerAnswer);
};

export const unlikeCard = (cardItem) => {
  return fetch(`${CONFIG.baseUrl}/cards/likes/${cardItem['_id']}`, {
    method: 'DELETE',
    headers: CONFIG.headers,
  }).then(getServerAnswer);
};
