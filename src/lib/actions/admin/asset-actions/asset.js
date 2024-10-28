"use server"
import { revalidatePath } from "next/cache";
import fetchData from "@/lib/utils/get-data";

export const archiveAsset = async (id) => {
    revalidatePath(`/admin/bien`)
    return await fetchData(`/api/asset/archive/${id}`)
}

export const togglePublish = async (id) => {
    revalidatePath(`/admin/bien`)
    return await fetchData(`/api/asset/publish/${id}`)
}

