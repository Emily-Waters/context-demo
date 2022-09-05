declare type ContextDemoState = {
  stateKeyOne: number;
  stateKeyTwo: number;
  stateKeyThree: number;
  dispatch: Spread<DispatchHelpers>;
};

enum D {
  INIT = "INIT",
  INCREMENT = "INCREMENT",
}

type S = ContextDemoState;
type KeyOfS = keyof S;
type KeyOfD = keyof D;

declare class DispatchHelpers {
  private dispatch;

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch;
  }

  public incrementKey = (key: KeyOfS) => {
    this.dispatch({ type: D.INCREMENT, payload: key });
  };
}

type DispatchAction = { type: D; payload: any };
type Dispatch = (action: DispatchAction) => void;

type Reducer = (state: S, action: DispatchAction) => S;
type Handler<P> = (state: S, payload: P) => S;

type InitPayload = Spread<DispatchHelpers>;
type IncrementPayload = keyof Omit<S, "dispatch">;
type Spread<T> = { [K in keyof T]: T[K] };

type AppContextProviderProps = { state: S; children: any };
type StateKeyComponentProps = { value: number; name: string };
