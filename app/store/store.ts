import { configureStore, Middleware } from '@reduxjs/toolkit';
import userReducer from '@/app/store/features/userSlice';
import messagesReducer from '@/app/store/features/messageSlice';
import { IUser } from '@/app/types/userType';
import { IMessage } from '../types/messageType';

type UserState = {
  user: IUser | null;
}

type MessagesState = {
  messages: IMessage[] | null;
}

export interface RootState {
  user: UserState;
  messages: MessagesState;
}

const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);

  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));

  return result;
};

const loadStateFromLocalStorage = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState) {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    console.error('Could not load state from localStorage', err);
  }
  return undefined;
};

const persistedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messagesReducer, 
  },
  preloadedState: persistedState, 
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
