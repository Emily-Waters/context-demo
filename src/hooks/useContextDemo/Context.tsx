import { createContext, useContext } from "react";
import { stateKeys } from "./initialState";

// Create Context Values From State Keys
type StateContext<S> = { [P in keyof S]: React.Context<S | undefined> };

const stateContext = stateKeys.reduce((acc, key) => {
  return { ...acc, [key]: createContext(undefined) };
}, {}) as StateContext<ContextDemoState>;

// Create Custom Hooks To Access StateContext
type ContextHooks<S> = { [P in keyof S as `use${Capitalize<string & P>}`]: () => S[P] };

const capitalize = (str: string) => {
  const capitalized = `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
  return capitalized;
};
const contextHooks = stateKeys.reduce((acc, key) => {
  const name = `use${capitalize(key)}`;
  return { ...acc, [name]: () => useContextHook(name, key) };
}, {} as ContextHooks<ContextDemoState>);

type UseContextHook<S> = (hookName: string, key: keyof S) => S;

const useContextHook: UseContextHook<ContextDemoState> = (name, key) => {
  const context = useContext(stateContext[key]);
  if (context === undefined) throw new Error(`${name} can only be used in a child of AppContext`);
  return context;
};

// Create Entries to access StateKey and StateContext
type ContextEntries<S> = [keyof S, React.Context<S[keyof S] | undefined>][];

const contextEntries = Object.entries(stateContext) as ContextEntries<ContextDemoState>;

// Create Singular Provider Component To Create Providers From StateContext And Index State Values By Key
type ProviderReturn<S> = React.ReactElement<React.Provider<S[keyof S]>>;
type ContextProvidersType<Props, S> = (props: Props) => ProviderReturn<S>;
type AppContextProviderType = ContextProvidersType<AppContextProviderProps, ContextDemoState>;

const AppContextProvider: AppContextProviderType = ({ state, children: AppContextContainer }) => {
  const contextProviders = contextEntries.reduce((accumulatedContextProviders, [stateKey, Context], index) => {
    const children = !!index ? accumulatedContextProviders : AppContextContainer;
    return <Context.Provider value={state[stateKey]} children={children} />;
  }, {}) as ProviderReturn<ContextDemoState>;

  return contextProviders;
};

export const { useDispatch, useStateKeyOne, useStateKeyTwo, useStateKeyThree } = contextHooks;
export { AppContextProvider };
