import { ENDPOINTS } from "@/constants";
import { del, get, post } from "@/services/api.service";
import { CartCountResponse } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";
export const getCartCount = createAsyncThunk(
  "cart/getCartCount",
  async ({userId, token}: {userId: string, token: string}, { rejectWithValue }) => {
    try {
      const response = await get<CartCountResponse>(`${ENDPOINTS.CART_COUNT}/items/${userId}`, token);
      return response.data;
    }  catch (error) {
      if (error instanceof z.ZodError) {
        return rejectWithValue(error.errors);
      }
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({userId, productId, token}: {userId: string, productId: string, token: string}, { rejectWithValue }) => {
    try {
      const response = await post<any>(`${ENDPOINTS.ADD_TO_CART}/${userId}/addCart?productId=${productId}&quantity=1`,{}, token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Thêm vào giỏ hàng thất bại");
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({userId, productId, token}: {userId: string, productId: string, token: string}, { rejectWithValue }) => {
    try {
      const response = await del<any>(`${ENDPOINTS.DELETE_CART}?customerId=${userId}&productId=${productId}`, {}, token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Xóa sản phẩm trong giỏ hàng thất bại");
    }
  }
)

