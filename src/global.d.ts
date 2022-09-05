type ContextDemoState = {
  stateKeyOne: number;
  stateKeyTwo: number;
  stateKeyThree: number;
  dispatch: Spread<DispatchHelpers>;
};

type StateKey = keyof Omit<ContextDemoState, "dispatch">;

type DispatchAction<T> = { type: T; payload: any };
type Dispatch<T> = (action: DispatchAction<T>) => void;

type Reducer<S, T> = (state: S, action: DispatchAction<T>) => S;
type Handler<S, P> = (state: S, payload: P) => S;

type IncrementKey<S> = (key: keyof S) => void;

type InitPayload = Spread<DispatchHelpers>;
type IncrementPayload = keyof Omit<ContextDemoState, "dispatch">;
type Spread<T> = { [K in keyof T]: T[K] };

type AppContextProviderProps = { state: ContextDemoState; children: any };
type StateKeyComponentProps = { value: number; name: string };
