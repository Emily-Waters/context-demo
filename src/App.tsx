import { useEffect, useState } from "react";
import { AppContextContainer } from "./AppContextContainer";
import { AppContextProvider } from "./hooks/useContextDemo/Context";
import { Initializer } from "./hooks/useContextDemo/ContextDemoReducer";
import { useContextDemo } from "./hooks/useContextDemo/useContextDemo";

import "./App.css";

export const App = () => {
  const [renderComponent, setRenderComponent] = useState<null | React.ReactElement>(null);
  const [state, dispatch] = useContextDemo();

  useEffect(() => {
    new Initializer(dispatch);
    setRenderComponent(<AppContextContainer />);
  }, [dispatch]);

  return <AppContextProvider state={state} children={renderComponent} />;
};
