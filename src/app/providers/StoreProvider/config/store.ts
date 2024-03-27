import { configureStore } from '@reduxjs/toolkit'
import {StateSchema} from "./StateSchema";
import {flightDetailsReducer} from "entities/Flight/model/slice/flightDetailsSlice";
import {mainPageReducer} from "pages/MainPage/model/slices/mainPageSlice";

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      flightDetails: flightDetailsReducer,
      mainPage: mainPageReducer,
    },
    devTools: true,
    preloadedState: initialState
  })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
