export const initialState: ContextDemoState = {
  stateKeyOne: 0,
  stateKeyTwo: 0,
  stateKeyThree: 0,
  dispatch: undefined as any,
};

export const stateKeys = Object.keys(initialState) as (keyof ContextDemoState)[];
