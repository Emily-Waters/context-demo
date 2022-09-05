enum D {
  INIT = "INIT",
  INCREMENT = "INCREMENT",
}

export class DispatchHelpers {
  private dispatch;

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch;
  }

  public incrementKey = (key: KeyOfS) => {
    this.dispatch({ type: D.INCREMENT, payload: key });
  };
}

export class Initializer {
  private dispatch;

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch;
    this.init();
  }

  private init = () => {
    const dispatch = { ...new DispatchHelpers(this.dispatch) };
    this.dispatch({ type: D.INIT, payload: dispatch });
  };
}

export class ContextDemoReducer {
  public REDUCER: Reducer = (state, action) => {
    return this[action.type](state, action.payload);
  };

  private [D.INIT]: Handler<InitPayload> = (state, payload) => {
    return { ...state, dispatch: payload };
  };

  private [D.INCREMENT]: Handler<IncrementPayload> = (state, payload) => {
    return { ...state, [payload]: state[payload] + 1 };
  };
}
