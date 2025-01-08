import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from "@/app/types/messageType";

interface MessagesState {
  messages: IMessage[] | null;
}

const initialState: MessagesState = {
  messages: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<IMessage[]>) {
      state.messages = action.payload;
    },
    clearMessages(state) {
      state.messages = null;
    },
  },
});

export const { setMessages, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
