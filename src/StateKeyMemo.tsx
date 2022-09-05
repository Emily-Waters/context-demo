import React from "react";

export const StateKeyMemo: React.FC<StateKeyComponentProps> = React.memo(({ name, value }) => {
  console.log(`StateKeyMemo Renders : ${name}`);
  return <div>{`${name}Memo : ${value}`}</div>;
});
