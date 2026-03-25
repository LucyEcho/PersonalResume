import { jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
const Image = forwardRef(function Image2({ src, alt, fill, style, priority, ...rest }, ref) {
  const resolvedSrc = typeof src === "string" ? src : src.src;
  const mergedStyle = fill ? {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    ...style
  } : style || {};
  return /* @__PURE__ */ jsx(
    "img",
    {
      ref,
      src: resolvedSrc,
      alt: alt || "",
      loading: priority ? "eager" : "lazy",
      style: mergedStyle,
      ...rest
    }
  );
});
const Logo = ({
  size = 100,
  className = "",
  onClick
}) => {
  return /* @__PURE__ */ jsx(
    Image,
    {
      src: "/logo.svg",
      alt: "Magic Resume Logo",
      width: size,
      height: size,
      className,
      onClick,
      priority: size >= 64
    }
  );
};
export {
  Image as I,
  Logo as L
};
