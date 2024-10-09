"use server"
import { revalidatePath } from "next/cache";
import fetchData from "@/lib/utils/get-data";
import axiosServices from "@/lib/utils/axios";

export const archiveAsset = async (id) => {
    revalidatePath(`/admin/bien`)
    return await fetchData(`/api/asset/archive/${id}`)

}


