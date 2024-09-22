import Api from "../services/axios";

export const uploadPdf = async (file) => {
  try {
    const formData = new FormData();
    formData.append('pdfFile', file);

    const response = await Api.post('/api/upload', formData);
    return response
  } catch (error) {
    console.log(error);
    throw error; // Optionally re-throw the error for further handling
  }
};
export const checkPdf = async (fileName) => {
  try {
    const response = await Api.get(`/api/check`, {
      params: {
        filename: fileName
      }
    });
    return response

  } catch (error) {
    console.log(error)
    throw error

  }
}

export const selected = async (order, fileName) => {
  try {
    const response = await Api.post('api/extract', {
      order,
      fileName
    })
    return response

  } catch (error) {
    console.log(error);
    throw error

  }
}
