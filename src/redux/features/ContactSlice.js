import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../globals";

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(`${API}/contact`, config);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API}/contact/${values.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values.details),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API}/contact`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async ({ id }, { rejectWithValue }) => {
    try {
      await fetch(`${API}/contact/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return { id };
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const ContactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.contacts = payload.data;
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        const index = state.contacts.findIndex(
          (el) => el._id === payload.data._id
        );
        state.contacts[index] = {
          ...state.contacts[index],
          ...payload.data,
        };
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.push(payload.data);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        let index = state.contacts.findIndex(({ id }) => id === payload.id);
        state.contacts.splice(index, 1);
      });
  },
});

export default ContactSlice.reducer;
