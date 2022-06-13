export const createSlot = (data) => {
  const url = `${process.env.REACT_APP_API_URL}/api/v1/slot/create`;
  return fetch(url, {
    method: "POST",
    body: data,
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getSlot = (slotID) => {
  const url = `${process.env.REACT_APP_API_URL}/api/v1/slot/individual/slot/get/${slotID}`;
  return fetch(url, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};
export const getAllSlot = () => {
  const url = `${process.env.REACT_APP_API_URL}/api/v1/slot/get/all`;
  return fetch(url, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteSlot = (SlotID) => {
  const url = `${process.env.REACT_APP_API_URL}/api/v1/slot/delete/${SlotID}`;
  return fetch(url, {
    method: "DELETE",
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};
export const deleteAllSlot = () => {
  const url = `${process.env.REACT_APP_API_URL}/api/v1/slot/all/remove`;
  return fetch(url, {
    method: "DELETE",
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const updateSlot = (slotID, data) => {
  const url = `${process.env.REACT_APP_API_URL}/api/v1/slot/update/${slotID}`;
  return fetch(url, {
    method: "PUT",
    body: data,
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      throw error;
    });
};
