import { configureStore } from '@reduxjs/toolkit'
import {StateSchema} from "./StateSchema";
import {flightDetailsReducer} from "entities/Flight/model/slice/flightDetailsSlice";

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      flightDetails: flightDetailsReducer
    },
    devTools: true,
    preloadedState: initialState
  })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
