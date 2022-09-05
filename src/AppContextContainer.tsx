import { StateKeyMemo } from "./StateKeyMemo";
import { useDispatch, useStateKeyOne, useStateKeyThree, useStateKeyTwo } from "./hooks/useContextDemo/Context";
import { CSSProperties } from "react";

const spanStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  border: "1px solid black",
  width: "25%",
  margin: "5px 0  0 5px",
  padding: "5px",
};

export const AppContextContainer = () => {
  const stateKeyOne = useStateKeyOne();
  const stateKeyTwo = useStateKeyTwo();
  const stateKeyThree = useStateKeyThree();
  const { incrementKey } = useDispatch();

  const components = [stateKeyOne, stateKeyTwo, stateKeyThree].map((value, index) => {
    const name = "stateKey" + ((!index && "One") || (index === 1 && "Two") || (index === 2 && "Three"));

    return (
      <span style={spanStyle} key={name}>
        <button onClick={() => incrementKey(name as keyof S)} style={{ marginRight: "20px" }}>
          Increment
        </button>
        <StateKeyMemo value={value} name={name} />
      </span>
    );
  });

  return <div>{components}</div>;
};
