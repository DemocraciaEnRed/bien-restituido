"use server"
import { objectToQueryString } from "@/lib/utils";
import fetchData from "@/lib/utils/get-data";

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

export const downloadAssets = async (_filter) => {
  return fetchData(`/api/asset/download?${objectToQueryString(_filter)}`)
}
