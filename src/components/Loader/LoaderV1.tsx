import React from "react";
import { Rings } from "react-loader-spinner";

interface IProps {
  height: string;
  width: string;
  color?: string;
  wrapperClass?: string;
}
function LoaderV1(props: IProps) {
  const { height, width, color, wrapperClass } = props;
  return <Rings height={height} width={width} color={color} radius="6" wrapperStyle={{}} wrapperClass={wrapperClass} visible ariaLabel="rings-loading" />;
}

export default LoaderV1;

LoaderV1.defaultProps = {
  color: "#8460c3",
  wrapperClass: "",
};
