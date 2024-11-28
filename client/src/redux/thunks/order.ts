import { ENDPOINTS } from "@/constants";
import { get } from "@/services/api.service";
import { OrderResponse } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const viewOrder = createAsyncThunk(
  "order/viewOrder",
  async ({userId, token}: {userId: string, token: string}, { rejectWithValue }) => {
    try {
      const response = await get<OrderResponse>(`${ENDPOINTS.ORDER}/${userId}`, token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lấy danh sách đơn hàng thất bại");
    }
  }
);



