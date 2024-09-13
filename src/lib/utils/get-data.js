import axiosServices from "./axios";

const fetchData = async (url) => {
  try {
    let res = await axiosServices.get(url)
    const { data } = res
    if (res.status !== 200) {

      const error = new Error(data.message);
      error.status = res.status
      throw error
    }
    data.status = res.status
    return data
  } catch (error) {
    console.error(error);
    return {
      status: error.status,
      message: error.response.data.message
    }
  }
}

export default fetchData