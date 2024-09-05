"use server"
import { objectToQueryString } from "@/lib/utils";
import axiosServices from "@/lib/utils/axios";

const fetchData = async (url) => {
  try {
    let res = await axiosServices.get(url)
    const { data } = res
    if (res.status !== 200) {
      const error = new Error(data.message);
      error.status = res.status
      throw error
    }
    return data
  } catch (error) {

    return {
      status: error.status,
      message: error.message
    }
  }
}


export const getAssets = async (_filter) => {
  return await fetchData(`/api/asset?${objectToQueryString(_filter)}`)
}

export const getAssetById = async (id) => {
  return await fetchData(`/api/asset/${id}`)
}

export const getCategoryBySlug = async (slug) => {
  return await fetchData(`/api/category/${slug}`)
}

export const getCategories = async () => {
  return await fetchData(`/api/category`)
}

export const getSubCategoriesByCategory = async (categoryId) => {
  return await fetchData(`/api/subcategory?category=${categoryId}`)
}

export const getSubCategories = async () => {
  return await fetchData(`/api/subcategory`)
}

export const getExtraFieldsByCategory = async (categoryId) => {
  return fetchData(`/api/extrafield?category=${categoryId}`)
}

export const getExtraFields = async () => {
  return await fetchData(`/api/extrafield`)
}