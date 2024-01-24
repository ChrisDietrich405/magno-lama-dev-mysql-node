export const validation = (validObj) => {
  for (let item in validObj) {
    if (!validObj[item]) {
      return `add ${item} value`;
    }
  }
};

export const emailFormat = (email) => {
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const paramPresent = (id) => {
  if (!id) {
    return "Please add customer id";
  }
};
