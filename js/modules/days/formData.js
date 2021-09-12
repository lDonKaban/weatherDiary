function formData (formSelector) {
    const formData = new FormData(formSelector),
          json = JSON.stringify(Object.fromEntries(formData.entries()));

    return json;
}

export default formData;