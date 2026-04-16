// tests/setup.js

const storage = {};

global.localStorage = {
  getItem(key) {
    return key in storage ? storage[key] : null;
  },
  setItem(key, value) {
    storage[key] = String(value);
  },
  removeItem(key) {
    delete storage[key];
  },
  clear() {
    for (const key in storage) {
      delete storage[key];
    }
  },
};
