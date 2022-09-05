import { useReducer } from "react";
import { ContextDemoReducer } from "./ContextDemoReducer";
import { initialState } from "./initialState";

const REDUCER = new ContextDemoReducer().REDUCER;
export const useContextDemo = () => useReducer(REDUCER, { ...initialState });
