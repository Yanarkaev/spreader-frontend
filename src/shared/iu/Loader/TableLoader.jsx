import React from "react";
import { Loader } from "./Loader";

export const TableLoader = () => {
  return (
    <div
      style={{
        width: "95%",
        margin: "0 auto",
      }}
    >
      <Loader w="100%" h="70px" margin="0 auto" />
      {new Array(10).fill(0).map((_, i) => {
        return <Loader key={i} w="100%" h="60px" br="0px" margin="5px 0" />;
      })}
    </div>
  );
};
