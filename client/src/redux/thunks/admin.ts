import { ENDPOINTS } from "@/constants";
import { get, post } from "@/services/api.service";
import { ListCustomerResponse } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { z } from "zod";

export const getCustomer = createAsyncThunk(
  "admin/getCustomer",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await get<ListCustomerResponse>(
        `${ENDPOINTS.ADMIN}/customers`,
        token
      );
      return response.data;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return rejectWithValue(error.errors);
      }
      return rejectWithValue((error as Error).message);
    }
  }
);

export const setIsAdmin = createAsyncThunk(
  "admin/setIsAdmin",
  async ({ token, userName }: { token: string; userName: string }, { rejectWithValue }) => {
    try {
      const response = await post(
        ENDPOINTS.ADMIN + `/update-role/${userName}`,
        {},
        token
      );
      return response.data;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return rejectWithValue(error.errors);
      }
      const err = error as Error;
      return rejectWithValue(err.message);
    }
  }
);
