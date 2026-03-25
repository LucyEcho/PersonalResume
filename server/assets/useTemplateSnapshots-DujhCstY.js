import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useMemo, useEffect } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { c as cn } from "./utils-Dmlx_rqM.js";
import { b as buttonVariants } from "./button-DfjVf0tx.js";
import { D as DEFAULT_TEMPLATES } from "./index-BnsqTy7W.js";
import { d as getTemplateSnapshotSrc, i as isTemplatePreviewLocale } from "./templatePreview-BUrRhH0o.js";
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Action,
  {
    ref,
    className: cn(buttonVariants(), className),
    ...props
  }
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    ),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
const TEMPLATE_SNAPSHOT_MANIFEST = {
  "locales": {
    "zh": {
      "classic": "/template-snapshots/zh/classic.png?v=2026-03-15T07%3A27%3A11.337Z",
      "modern": "/template-snapshots/zh/modern.png?v=2026-03-15T07%3A27%3A11.337Z",
      "left-right": "/template-snapshots/zh/left-right.png?v=2026-03-15T07%3A27%3A11.337Z",
      "timeline": "/template-snapshots/zh/timeline.png?v=2026-03-15T07%3A27%3A11.337Z",
      "minimalist": "/template-snapshots/zh/minimalist.png?v=2026-03-15T07%3A27%3A11.337Z",
      "elegant": "/template-snapshots/zh/elegant.png?v=2026-03-15T07%3A27%3A11.337Z",
      "creative": "/template-snapshots/zh/creative.png?v=2026-03-15T07%3A27%3A11.337Z"
    },
    "en": {
      "classic": "/template-snapshots/en/classic.png?v=2026-03-15T07%3A27%3A11.337Z",
      "modern": "/template-snapshots/en/modern.png?v=2026-03-15T07%3A27%3A11.337Z",
      "left-right": "/template-snapshots/en/left-right.png?v=2026-03-15T07%3A27%3A11.337Z",
      "timeline": "/template-snapshots/en/timeline.png?v=2026-03-15T07%3A27%3A11.337Z",
      "minimalist": "/template-snapshots/en/minimalist.png?v=2026-03-15T07%3A27%3A11.337Z",
      "elegant": "/template-snapshots/en/elegant.png?v=2026-03-15T07%3A27%3A11.337Z",
      "creative": "/template-snapshots/en/creative.png?v=2026-03-15T07%3A27%3A11.337Z"
    }
  }
};
const useTemplateSnapshots = (locale) => {
  const resolvedLocale = isTemplatePreviewLocale(locale) ? locale : "zh";
  const snapshotMap = useMemo(
    () => Object.fromEntries(
      DEFAULT_TEMPLATES.map((template) => [
        template.id,
        getTemplateSnapshotSrc(
          TEMPLATE_SNAPSHOT_MANIFEST,
          resolvedLocale,
          template.id
        )
      ])
    ),
    [resolvedLocale]
  );
  useEffect(() => {
    const preloaders = Object.values(snapshotMap).filter((src) => Boolean(src)).map((src) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
      return image;
    });
    return () => {
      preloaders.forEach((image) => {
        image.src = "";
      });
    };
  }, [snapshotMap]);
  return {
    resolvedLocale,
    snapshotMap
  };
};
export {
  AlertDialog as A,
  AlertDialogTrigger as a,
  AlertDialogContent as b,
  AlertDialogHeader as c,
  AlertDialogTitle as d,
  AlertDialogDescription as e,
  AlertDialogFooter as f,
  AlertDialogCancel as g,
  AlertDialogAction as h,
  useTemplateSnapshots as u
};
