enum DispatchTypes {
  INIT = "INIT",
  INCREMENT = "INCREMENT",
}

export class DispatchHelpers {
  private dispatch;

  constructor(dispatch: Dispatch<DispatchTypes>) {
    this.dispatch = dispatch;
  }

  public incrementKey: IncrementKey<ContextDemoState> = (key) => {
    this.dispatch({ type: DispatchTypes.INCREMENT, payload: key });
  };
}

export class Initializer {
  private dispatch;

  constructor(dispatch: Dispatch<DispatchTypes>) {
    this.dispatch = dispatch;
    this.init();
  }

  private init = () => {
    const dispatch: Spread<DispatchHelpers> = { ...new DispatchHelpers(this.dispatch) };
    this.dispatch({ type: DispatchTypes.INIT, payload: dispatch });
  };
}

export class ContextDemoReducer {
  public REDUCER: Reducer<ContextDemoState, DispatchTypes> = (state, action) => {
    return this[action.type](state, action.payload);
  };

  private [DispatchTypes.INIT]: Handler<ContextDemoState, InitPayload> = (state, payload) => {
    return { ...state, dispatch: payload };
  };

  private [DispatchTypes.INCREMENT]: Handler<ContextDemoState, IncrementPayload> = (state, payload) => {
    return { ...state, [payload]: state[payload] + 1 };
  };
}
