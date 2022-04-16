const persistItemToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadItemFromStorage = (key) => JSON.parse(localStorage.getItem(key));

export { persistItemToStorage, loadItemFromStorage };
