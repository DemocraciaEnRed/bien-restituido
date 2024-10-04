import axiosClientServices from "@/lib/utils/axios-client";

export const saveAsset = async (formData) => {
  try {
    let res = await axiosClientServices.post(`/api/asset`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    const { data } = res;
    if (res.status !== 200) {
      const error = new Error(data.message);
      error.status = res.status
      throw error
    }
    data.status = res.status
    return data
  } catch (error) {
    console.log(error);

    return JSON.stringify({
      status: error.status,
      message: error.message
    })
  }
}

export const editAsset = async (id, formData) => {
  try {
    let res = await axiosClientServices.put(`/api/asset/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    const { data } = res;
    if (res.status !== 200) {
      const error = new Error(data.message);
      error.status = res.status
      throw error
    }
    data.status = res.status
    return data
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      status: error.status,
      message: error.message
    })
  }

}