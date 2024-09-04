import dbConnect from "@/lib/db/dbConnect";
import { Asset, ExtraField } from "@/lib/models";
import { objectToQueryString } from "@/lib/utils";
import axiosServices from "@/lib/utils/axios";
import { showCardOptions } from "@/lib/utils/constants";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_URL_APP

export async function getAssets(_filter) {

  try {
    let res = await axiosServices.get(`/api/asset?${objectToQueryString(_filter)}`)

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
