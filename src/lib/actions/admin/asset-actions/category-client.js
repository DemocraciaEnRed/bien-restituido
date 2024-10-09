import axiosClientServices from "@/lib/utils/axios-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const saveCompleteCategory = async (formData) => {
  try {
    let res = await axiosClientServices.post(`/api/category`, formData, {
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


export const deleteCategory = async (categoryId) => {
  try {
    let res = await axiosClientServices.delete(`/api/category/${categoryId}`);

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