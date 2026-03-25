import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import React__default, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { b as useTranslations, u as useLocale } from "./router-DDFDFkQR.js";
import { a as useRouter } from "./navigation-xj3hhcts.js";
import { X, FilePlus, ChevronLeft, Sparkles, Braces, Loader2, Settings, AlertCircle, Plus } from "lucide-react";
import { toast } from "sonner";
import { B as Button } from "./button-DfjVf0tx.js";
import { C as Card, c as CardContent, d as CardFooter, b as CardTitle, e as CardDescription } from "./card-H7Yv_5MJ.js";
import { cva } from "class-variance-authority";
import { c as cn } from "./utils-Dmlx_rqM.js";
import { D as Dialog, a as DialogContent, c as DialogTitle, S as ScrollArea, b as DialogHeader, d as DialogDescription, e as DialogFooter } from "./dialog-C7rnNAyc.js";
import { g as getFileHandle, v as verifyPermission, a as getConfig } from "./fileSystem-BUemSlsv.js";
import { D as DEFAULT_TEMPLATES, j as initialResumeState, R as ResumeTemplateComponent, n as normalizeFontFamily, h as generateUUID, u as useResumeStore } from "./index-BnsqTy7W.js";
import { u as useAIConfigStore } from "./useAIConfigStore-CCqhVQ4X.js";
import { u as useTemplateSnapshots, A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./useTemplateSnapshots-DujhCstY.js";
import "@tanstack/react-router";
import "next-themes";
import "@heroui/react";
import "@google/generative-ai";
import "undici";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-dialog";
import "zustand";
import "zustand/middleware";
import "uuid";
import "@radix-ui/react-alert-dialog";
import "./templatePreview-BUrRhH0o.js";
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  }
));
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
const A4_WIDTH_PX = 793.700787;
const A4_HEIGHT_PX = 1122.519685;
const toTemplateNameKey = (templateId) => templateId === "left-right" ? "leftRight" : templateId;
const BLANK_TEMPLATE = { id: null };
const NORMAL_TEMPLATES = DEFAULT_TEMPLATES.map((template) => ({
  ...template,
  isBlank: false,
  nameKey: toTemplateNameKey(template.id)
}));
const BlankTemplateThumbnail = ({ t }) => /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50", children: [
  /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-6 text-gray-400 group-hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(FilePlus, { className: "w-12 h-12" }) }),
  /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors", children: t("dashboard.resumes.createDialog.blankTitle") }),
  /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-4 text-base px-8 text-center leading-relaxed", children: t("dashboard.resumes.createDialog.blankThumbnailDescription") })
] });
const TemplateCardThumbnail = ({
  template,
  t,
  snapshotSrc
}) => {
  if (template.isBlank) {
    return /* @__PURE__ */ jsx(BlankTemplateThumbnail, { t });
  }
  if (snapshotSrc) {
    return /* @__PURE__ */ jsx(
      "img",
      {
        src: snapshotSrc,
        alt: t(`dashboard.templates.${template.nameKey}.name`),
        className: "h-full w-full object-cover object-top",
        loading: "eager",
        draggable: false
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className: "w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50", children: /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-700 dark:text-gray-200", children: t(`dashboard.templates.${template.nameKey}.name`) }) });
};
const TemplateThumbnail = ({
  template,
  t,
  scaleModifier = 1,
  quality = "low"
  // low for grid, high for preview
}) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.2);
  useEffect(() => {
    if (!containerRef.current || template.isBlank) return;
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (width > 0) {
        setScale(width / A4_WIDTH_PX * scaleModifier);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [template.isBlank, scaleModifier]);
  if (template.isBlank) {
    return /* @__PURE__ */ jsx(BlankTemplateThumbnail, { t });
  }
  const sampleExperience = quality === "high" ? [
    {
      id: "1",
      company: t("dashboard.resumes.createDialog.sample.company"),
      position: t("dashboard.resumes.createDialog.sample.position"),
      date: `2020-01 - ${t("dashboard.resumes.createDialog.sample.present")}`,
      details: t("dashboard.resumes.createDialog.sample.workDescription"),
      visible: true
    }
  ] : [];
  const previewData = {
    ...initialResumeState,
    id: "preview-mock",
    templateId: template.id,
    createdAt: (/* @__PURE__ */ new Date(0)).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date(0)).toISOString(),
    globalSettings: {
      ...initialResumeState.globalSettings,
      themeColor: template.colorScheme?.primary || "#000",
      sectionSpacing: template.spacing?.sectionGap || 16,
      paragraphSpacing: template.spacing?.itemGap || 8,
      pagePadding: template.spacing?.contentPadding || 32
    },
    basic: {
      ...initialResumeState.basic,
      layout: template.basic?.layout || "left"
    },
    // Feed richer mock content in large preview.
    experience: sampleExperience
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full h-full overflow-hidden bg-white flex items-center justify-center", ref: containerRef, children: /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        width: scale * A4_WIDTH_PX,
        height: scale * A4_HEIGHT_PX
      },
      className: "flex-shrink-0",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "bg-white origin-top-left pointer-events-none",
          style: {
            width: "210mm",
            height: "297mm",
            transform: `scale(${scale})`,
            padding: `${template.spacing?.contentPadding || 32}px`,
            fontFamily: normalizeFontFamily(previewData.globalSettings?.fontFamily)
          },
          children: /* @__PURE__ */ jsx(
            ResumeTemplateComponent,
            {
              data: previewData,
              template
            }
          )
        }
      )
    }
  ) });
};
const CreateResumeModal = ({
  open,
  onOpenChange,
  onCreate
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const { snapshotMap } = useTemplateSnapshots(locale);
  const [previewTarget, setPreviewTarget] = useState(null);
  const handleCreate = (template) => {
    onCreate(template.id);
    setPreviewTarget(null);
  };
  useEffect(() => {
    if (!open) {
      const timeoutId = window.setTimeout(() => setPreviewTarget(null), 300);
      return () => window.clearTimeout(timeoutId);
    }
  }, [open]);
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { hideClose: true, className: "max-w-[1100px] w-[95vw] h-[90vh] sm:h-[85vh] p-0 overflow-hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl border-white/20 dark:border-white/10 shadow-2xl rounded-[2rem] flex flex-col", children: [
    /* @__PURE__ */ jsx(DialogTitle, { className: "sr-only", children: t("dashboard.resumes.createDialog.title") }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full min-h-0 flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-none px-8 py-6 flex items-center justify-between z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 flex items-center", children: t("dashboard.resumes.createDialog.title") }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => onOpenChange(false),
            "aria-label": t("common.cancel"),
            className: "p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
            children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6 text-gray-400" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 relative w-full", children: /* @__PURE__ */ jsx(ScrollArea, { className: "h-full w-full", children: /* @__PURE__ */ jsxs("div", { className: "px-8 pb-12 max-w-7xl mx-auto space-y-12", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900 dark:text-white", children: t("dashboard.resumes.createDialog.startFromBlank") }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-gray-200 dark:bg-gray-800 flex-1 ml-6" })
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              layoutId: `card-container-blank`,
              whileHover: { y: -4, scale: 1.01 },
              whileTap: { scale: 0.99 },
              onClick: () => handleCreate(BLANK_TEMPLATE),
              className: "group cursor-pointer rounded-2xl border border-gray-200/60 dark:border-gray-800/60 shadow-sm bg-gray-50/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 p-6 flex flex-col sm:flex-row items-center gap-6",
              children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    layoutId: `card-image-blank`,
                    className: "h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 rounded-2xl bg-white dark:bg-gray-800 shadow-inner flex items-center justify-center border border-gray-100 dark:border-gray-700",
                    children: /* @__PURE__ */ jsx(FilePlus, { className: "w-10 h-10 text-gray-400 group-hover:text-primary transition-colors" })
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
                  /* @__PURE__ */ jsx(motion.div, { layoutId: `card-title-blank`, className: "inline-block", children: /* @__PURE__ */ jsx("h5", { className: "text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors", children: t("dashboard.resumes.createDialog.blankTitle") }) }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm max-w-lg leading-relaxed", children: t("dashboard.resumes.createDialog.blankCardDescription") })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex text-primary font-medium items-center text-sm   group-hover:translate-x-0 duration-300", children: [
                  t("dashboard.resumes.createDialog.createNow"),
                  " ",
                  /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4 ml-1 rotate-180" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900 dark:text-white", children: t("dashboard.resumes.createDialog.startFromTemplate") }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-gray-200 dark:bg-gray-800 flex-1 ml-6" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 hover:!shadow-none", children: NORMAL_TEMPLATES.map((template) => {
            const templateName = t(`dashboard.templates.${template.nameKey}.name`);
            return /* @__PURE__ */ jsxs(
              motion.div,
              {
                layoutId: `card-container-${template.id}`,
                whileHover: { y: 0, scale: 1.02 },
                whileTap: { scale: 0.98 },
                onClick: () => setPreviewTarget(template),
                className: "group cursor-pointer flex flex-col",
                children: [
                  /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      layoutId: `card-image-${template.id}`,
                      className: "aspect-[210/297] rounded-2xl overflow-hidden border border-gray-200/60 dark:border-gray-800/60 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/50 dark:group-hover:border-primary/50 bg-white dark:bg-gray-900 relative",
                      children: [
                        /* @__PURE__ */ jsx(
                          TemplateCardThumbnail,
                          {
                            template,
                            t,
                            snapshotSrc: snapshotMap[template.id]
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-2xl pointer-events-none" }),
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      layoutId: `card-title-${template.id}`,
                      className: "mt-4 flex items-center justify-center",
                      children: /* @__PURE__ */ jsx("span", { className: "text-[15px] font-semibold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors", children: templateName })
                    }
                  )
                ]
              },
              template.id
            );
          }) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: previewTarget && /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.3, ease: "easeInOut" },
          className: "fixed inset-0 z-50 bg-white dark:bg-gray-950 flex flex-col sm:flex-row overflow-hidden rounded-[2rem]",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 relative bg-gray-50 dark:bg-gray-900/50 flex flex-col items-center justify-center p-8 sm:p-12 h-full overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "p-6 flex justify-start w-full absolute top-0 left-0 z-20", children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPreviewTarget(null),
                  className: "rounded-full p-2 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors",
                  "aria-label": t("dashboard.resumes.createDialog.backToGrid"),
                  children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 text-gray-500 hover:text-primary dark:text-gray-400" })
                }
              ) }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  layoutId: `card-container-${previewTarget.id || "blank"}`,
                  className: "w-full flex-1 flex flex-col items-center justify-center p-2 min-h-0",
                  children: /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      layoutId: `card-image-${previewTarget.id || "blank"}`,
                      className: "aspect-[210/297] rounded-xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/10 bg-white",
                      style: {
                        maxHeight: "100%",
                        maxWidth: "100%",
                        height: "100%",
                        width: "auto"
                      },
                      children: /* @__PURE__ */ jsx(TemplateThumbnail, { template: previewTarget, t, quality: "high", scaleModifier: 1 })
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full sm:w-[400px] bg-white dark:bg-gray-950 border-l border-gray-100 dark:border-gray-800 flex flex-col h-full shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 p-10 flex flex-col justify-center", children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  layoutId: `card-title-${previewTarget.id || "blank"}`,
                  className: "inline-block",
                  children: /* @__PURE__ */ jsx("h3", { className: "text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-4", children: previewTarget.isBlank ? t("dashboard.resumes.createDialog.blankTitle") : t(`dashboard.templates.${previewTarget.nameKey}.name`) })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "w-12 h-1.5 bg-primary rounded-full mb-6" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10 font-medium", children: previewTarget.isBlank ? t("dashboard.resumes.createDialog.blankPreviewDescription") : t(`dashboard.templates.${previewTarget.nameKey}.description`) }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "lg",
                  className: "w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]",
                  onClick: () => handleCreate(previewTarget),
                  children: [
                    t("dashboard.resumes.createDialog.useThisTemplate"),
                    /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 ml-2 opacity-70" })
                  ]
                }
              ) })
            ] }) })
          ]
        }
      ) })
    ] })
  ] }) });
};
const PdfIcon = ({ className }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: cn("h-full w-full", className),
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M4 4C4 2.89543 4.89543 2 6 2H14L20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z",
            fill: "#EF4444"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M14 2V8H20L14 2Z",
            fill: "#FECACA",
            fillOpacity: "0.9"
          }
        ),
        /* @__PURE__ */ jsxs("g", { fill: "white", children: [
          /* @__PURE__ */ jsx("path", { d: "M7 11.5H8.8C9.35228 11.5 9.8 11.9477 9.8 12.5C9.8 13.0523 9.35228 13.5 8.8 13.5H8V15H7V11.5ZM8.8 12.5H8V11.5H8.8V12.5Z" }),
          /* @__PURE__ */ jsx("path", { d: "M11 11.5H12.5C13.3284 11.5 14 12.1716 14 13C14 13.8284 13.3284 14.5 12.5 14.5H12V15H11V11.5ZM12.5 13.5C12.7761 13.5 13 13.2761 13 13C13 12.7239 12.7761 12.5 12.5 12.5H12V13.5H12.5Z" }),
          /* @__PURE__ */ jsx("path", { d: "M15 11.5H17.5V12.5H16V13H17.5V14H16V15H15V11.5Z" })
        ] })
      ]
    }
  );
};
const ImportResumeDialog = ({
  open,
  isImporting,
  onOpenChange,
  jsonFileInputRef,
  pdfFileInputRef,
  onJsonFileChange,
  onPdfFileChange
}) => {
  const t = useTranslations();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: jsonFileInputRef,
        type: "file",
        accept: ".json,application/json",
        className: "hidden",
        onChange: onJsonFileChange
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: pdfFileInputRef,
        type: "file",
        accept: ".pdf,application/pdf",
        className: "hidden",
        onChange: onPdfFileChange
      }
    ),
    /* @__PURE__ */ jsx(
      Dialog,
      {
        open,
        onOpenChange: (nextOpen) => {
          if (isImporting) return;
          onOpenChange(nextOpen);
        },
        children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[480px]", children: [
          /* @__PURE__ */ jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsx(DialogTitle, { children: t("dashboard.resumes.importDialog.title") }),
            /* @__PURE__ */ jsx(DialogDescription, {})
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                disabled: isImporting,
                className: cn(
                  "group relative flex w-full items-start gap-4 rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200",
                  "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md",
                  "active:scale-[0.98]",
                  "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                ),
                onClick: () => jsonFileInputRef.current?.click(),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 transition-colors group-hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400", children: /* @__PURE__ */ jsx(Braces, { className: "h-6 w-6" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground leading-none", children: t("dashboard.resumes.importDialog.jsonTitle") }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: t("dashboard.resumes.importDialog.jsonDescription") })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                disabled: isImporting,
                className: cn(
                  "group relative flex w-full items-start gap-4 rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200",
                  "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md",
                  "active:scale-[0.98]",
                  "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                ),
                onClick: () => pdfFileInputRef.current?.click(),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600 transition-colors group-hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400", children: /* @__PURE__ */ jsx(PdfIcon, { className: "h-6 w-6" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground leading-none", children: t("dashboard.resumes.importDialog.pdfTitle") }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: t("dashboard.resumes.importDialog.pdfDescription") })
                  ] })
                ]
              }
            )
          ] }),
          isImporting && /* @__PURE__ */ jsx(DialogFooter, { className: "sm:justify-start", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-primary" }),
            t("dashboard.resumes.importDialog.importing")
          ] }) })
        ] })
      }
    )
  ] });
};
const ResumeCardItem = ({
  id,
  resume,
  t,
  locale,
  setActiveResume,
  router,
  deleteResume,
  index
}) => {
  const containerRef = React__default.useRef(null);
  const [scale, setScale] = React__default.useState(0.24);
  const activeTemplate = DEFAULT_TEMPLATES.find((template) => template.id === resume.templateId) ?? DEFAULT_TEMPLATES[0];
  const templateNameKey = activeTemplate.id === "left-right" ? "leftRight" : activeTemplate.id;
  React__default.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (width > 0) {
        setScale(width / 793.700787);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: {
        duration: 0.3,
        delay: index * 0.1
      },
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      children: /* @__PURE__ */ jsxs(
        Card,
        {
          className: cn(
            "group border transition-all duration-200 aspect-[210/297] flex flex-col overflow-hidden",
            "hover:border-primary/40 hover:shadow-lg",
            "dark:hover:border-primary/40"
          ),
          children: [
            /* @__PURE__ */ jsxs(CardContent, { className: "p-0 flex-1 relative bg-gray-50 dark:bg-gray-900 overflow-hidden cursor-pointer", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pb-6 flex items-center justify-center pointer-events-none transition-transform duration-300 group-hover:scale-[1.02] overflow-hidden", ref: containerRef, children: /* @__PURE__ */ jsx("div", { className: "w-full h-full relative origin-top bg-white", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute top-0 left-0 bg-white",
                  style: {
                    width: "210mm",
                    height: "297mm",
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    padding: `${resume.globalSettings?.pagePadding || 32}px`,
                    fontFamily: normalizeFontFamily(resume.globalSettings?.fontFamily)
                  },
                  children: /* @__PURE__ */ jsx(ResumeTemplateComponent, { data: resume, template: activeTemplate })
                }
              ) }) }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 top-[60%] pointer-events-none bg-gradient-to-t from-white via-white/90 to-transparent dark:from-gray-950 dark:via-gray-950/90 z-0" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 pt-12 pb-3 px-4 flex justify-between items-end border-t border-transparent z-10 transition-colors group-hover:bg-white/50 dark:group-hover:bg-gray-950/50", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[15px] font-semibold truncate text-gray-900 dark:text-gray-100 drop-shadow-sm w-[90%]", children: resume.title || t("dashboard.resumes.untitled") }),
                /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-gray-600 dark:text-gray-300 mt-0.5 font-medium", children: [
                  t(`dashboard.templates.${templateNameKey}.name`),
                  " · ",
                  new Intl.DateTimeFormat(locale, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                  }).format(new Date(resume.createdAt))
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx(CardFooter, { className: "pt-2 pb-2 px-2 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 w-full", children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 17
                  },
                  children: /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "w-full text-sm hover:bg-gray-100 dark:border-primary/50 dark:hover:bg-primary/10",
                      size: "sm",
                      onClick: (e) => {
                        e.stopPropagation();
                        setActiveResume(id);
                        router.push(`/app/workbench/${id}`);
                      },
                      children: t("common.edit")
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 17
                  },
                  children: /* @__PURE__ */ jsxs(AlertDialog, { children: [
                    /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                      Button,
                      {
                        variant: "outline",
                        className: "w-full text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-500 dark:hover:bg-red-950/50 dark:hover:text-red-400",
                        size: "sm",
                        onClick: (e) => {
                          e.stopPropagation();
                        },
                        children: t("common.delete")
                      }
                    ) }),
                    /* @__PURE__ */ jsxs(AlertDialogContent, { onClick: (e) => e.stopPropagation(), children: [
                      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
                        /* @__PURE__ */ jsx(AlertDialogTitle, { children: t("dashboard.resumes.deleteConfirmTitle") }),
                        /* @__PURE__ */ jsx(AlertDialogDescription, { children: t("dashboard.resumes.deleteConfirmDescription") })
                      ] }),
                      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
                        /* @__PURE__ */ jsx(AlertDialogCancel, { onClick: (e) => e.stopPropagation(), children: t("common.cancel") }),
                        /* @__PURE__ */ jsx(
                          AlertDialogAction,
                          {
                            className: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 border-none",
                            onClick: (e) => {
                              e.stopPropagation();
                              deleteResume(resume);
                              toast.success(t("common.deleteSuccess"));
                            },
                            children: t("common.confirm")
                          }
                        )
                      ] })
                    ] })
                  ] })
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
};
const AnimatedImportButton = ({ onClick, t }) => {
  const [isHovered, setIsHovered] = React__default.useState(false);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      onHoverStart: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: "spring", stiffness: 400, damping: 17 },
      children: /* @__PURE__ */ jsx(
        Button,
        {
          onClick,
          variant: "outline",
          className: cn(
            "relative h-10 overflow-hidden px-4 font-medium transition-all duration-300",
            "border-border/60 bg-background hover:border-primary/50 hover:bg-accent/50 hover:shadow-sm",
            "dark:border-border/40 dark:hover:border-primary/40"
          ),
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "relative h-5 w-5 overflow-hidden", children: /* @__PURE__ */ jsxs(
              motion.div,
              {
                animate: {
                  y: isHovered ? -20 : 0
                },
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                },
                className: "flex flex-col",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-5 w-5 items-center justify-center", children: /* @__PURE__ */ jsx(Braces, { className: "h-4 w-4 text-blue-500" }) }),
                  /* @__PURE__ */ jsx("div", { className: "flex h-5 w-5 items-center justify-center", children: /* @__PURE__ */ jsx(PdfIcon, { className: "h-4 w-4 text-red-500" }) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: "relative z-10", children: t("dashboard.resumes.import") })
          ] })
        }
      )
    }
  );
};
const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const toString = (value) => typeof value === "string" ? value.trim() : "";
const toStringArray = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => toString(item)).filter(Boolean);
  }
  if (typeof value === "string") {
    return value.split(/\r?\n/).map((line) => line.replace(/^[-*•\d.)\s]+/, "").trim()).filter(Boolean);
  }
  return [];
};
const toListHtml = (value) => {
  const items = toStringArray(value);
  if (items.length === 0) return "";
  return `<ul class="custom-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
};
const extractJsonContent = (content) => {
  const direct = content.trim();
  try {
    return JSON.parse(direct);
  } catch (error) {
  }
  const fencedMatch = direct.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fencedMatch?.[1]) {
    try {
      return JSON.parse(fencedMatch[1].trim());
    } catch (error) {
    }
  }
  const objectMatch = direct.match(/\{[\s\S]*\}/);
  if (objectMatch?.[0]) {
    try {
      return JSON.parse(objectMatch[0]);
    } catch (error) {
    }
  }
  throw new Error("Invalid AI JSON content");
};
const createResumeFromAIResult = (result, fileName) => {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const id = generateUUID();
  const education = Array.isArray(result?.education) ? result.education : [];
  const experience = Array.isArray(result?.experience) ? result.experience : [];
  const projects = Array.isArray(result?.projects) ? result.projects : [];
  const skillSource = result?.skillContent ?? result?.skills;
  const skillContent = toListHtml(skillSource);
  return {
    ...initialResumeState,
    id,
    title: toString(result?.title) || fileName || `Imported Resume ${id.slice(0, 6)}`,
    createdAt: now,
    updatedAt: now,
    templateId: DEFAULT_TEMPLATES[0]?.id,
    basic: {
      ...initialResumeState.basic,
      name: toString(result?.basic?.name),
      title: toString(result?.basic?.title),
      email: toString(result?.basic?.email),
      phone: toString(result?.basic?.phone),
      location: toString(result?.basic?.location),
      employementStatus: toString(result?.basic?.employementStatus),
      birthDate: toString(result?.basic?.birthDate),
      customFields: [],
      photo: "",
      githubKey: "",
      githubUseName: "",
      githubContributionsVisible: false
    },
    education: education.map((item) => ({
      id: generateUUID(),
      school: toString(item?.school),
      major: toString(item?.major),
      degree: toString(item?.degree),
      startDate: toString(item?.startDate),
      endDate: toString(item?.endDate),
      gpa: toString(item?.gpa),
      description: toListHtml(item?.description),
      visible: true
    })).filter((item) => item.school || item.major || item.degree),
    experience: experience.map((item) => ({
      id: generateUUID(),
      company: toString(item?.company),
      position: toString(item?.position),
      date: toString(item?.date),
      details: toListHtml(item?.details || item?.description),
      visible: true
    })).filter((item) => item.company || item.position || item.date || item.details),
    projects: projects.map((item) => ({
      id: generateUUID(),
      name: toString(item?.name),
      role: toString(item?.role),
      date: toString(item?.date),
      description: toListHtml(item?.description || item?.details),
      link: toString(item?.link),
      visible: true
    })).filter((item) => item.name || item.role || item.date || item.description),
    skillContent,
    customData: {}
  };
};
const pdfWorkerUrl = "/assets/pdf.worker.min-Cr_QfRGn.mjs";
const MAX_PDF_IMPORT_PAGES = 3;
const PDF_IMAGE_QUALITY = 0.82;
const PDF_MAX_IMAGE_WIDTH = 1600;
const ResumeWorkbench = () => {
  const t = useTranslations();
  const locale = useLocale();
  const {
    resumes,
    setActiveResume,
    updateResumeFromFile,
    addResume,
    deleteResume,
    createResume
  } = useResumeStore();
  const {
    geminiApiKey,
    geminiModelId
  } = useAIConfigStore();
  const router = useRouter();
  const [hasConfiguredFolder, setHasConfiguredFolder] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const jsonFileInputRef = useRef(null);
  const pdfFileInputRef = useRef(null);
  useEffect(() => {
    const syncResumesFromFiles = async () => {
      try {
        const handle = await getFileHandle("syncDirectory");
        if (!handle) return;
        const hasPermission = await verifyPermission(handle);
        if (!hasPermission) return;
        const dirHandle = handle;
        for await (const entry of dirHandle.values()) {
          if (entry.kind === "file" && entry.name.endsWith(".json")) {
            try {
              const file = await entry.getFile();
              const content = await file.text();
              const resumeData = JSON.parse(content);
              updateResumeFromFile(resumeData);
            } catch (error) {
              console.error("Error reading resume file:", error);
            }
          }
        }
      } catch (error) {
        console.error("Error syncing resumes from files:", error);
      }
    };
    if (Object.keys(resumes).length === 0) {
      syncResumesFromFiles();
    }
  }, [resumes, updateResumeFromFile]);
  useEffect(() => {
    const loadSavedConfig = async () => {
      try {
        const handle = await getFileHandle("syncDirectory");
        const path = await getConfig("syncDirectoryPath");
        if (handle && path) {
          setHasConfiguredFolder(true);
        }
      } catch (error) {
        console.error("Error loading saved config:", error);
      }
    };
    loadSavedConfig();
  }, []);
  const handleCreateFromModal = (templateId) => {
    const isBlank = !templateId;
    const newId = createResume(templateId, isBlank);
    if (templateId) {
      const template = DEFAULT_TEMPLATES.find((t2) => t2.id === templateId);
      if (template) {
        const { resumes: resumes2, updateResume } = useResumeStore.getState();
        const resume = resumes2[newId];
        if (resume) {
          updateResume(newId, {
            globalSettings: {
              ...resume.globalSettings,
              themeColor: template.colorScheme.primary,
              sectionSpacing: template.spacing.sectionGap,
              paragraphSpacing: template.spacing.itemGap,
              pagePadding: template.spacing.contentPadding
            },
            basic: {
              ...resume.basic,
              layout: template.basic.layout
            }
          });
        }
      }
    }
    setIsCreateModalOpen(false);
    setActiveResume(newId);
    router.push(`/app/workbench/${newId}`);
  };
  const importResumeFromJson = async (file) => {
    const content = await file.text();
    const config = JSON.parse(content);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const { generateUUID: generateUUID2 } = await import("./index-BnsqTy7W.js").then((n) => n.l);
    const { initialResumeState: initialResumeState2 } = await import("./index-BnsqTy7W.js").then((n) => n.k);
    const newResume = {
      ...initialResumeState2,
      ...config,
      id: generateUUID2(),
      createdAt: now,
      updatedAt: now
    };
    const resumeId = addResume(newResume);
    setActiveResume(resumeId);
    setIsImportDialogOpen(false);
    toast.success(t("dashboard.resumes.importSuccess"));
    router.push(`/app/workbench/${resumeId}`);
  };
  const extractImagesFromPdf = async (file) => {
    const pdfjs = await import("./pdf-dIGdkkx3.js");
    const buffer = await file.arrayBuffer();
    const typedPdfjs = pdfjs;
    typedPdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
    const loadingTask = typedPdfjs.getDocument({
      data: new Uint8Array(buffer)
    });
    const pdf = await loadingTask.promise;
    const pageImages = [];
    const totalPages = Math.min(pdf.numPages, MAX_PDF_IMPORT_PAGES);
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 2 });
      const widthScale = Math.min(1, PDF_MAX_IMAGE_WIDTH / baseViewport.width);
      const viewport = page.getViewport({ scale: 2 * widthScale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) {
        throw new Error("Unable to create canvas context");
      }
      canvas.width = Math.max(1, Math.floor(viewport.width));
      canvas.height = Math.max(1, Math.floor(viewport.height));
      await page.render({
        canvasContext: context,
        viewport
      }).promise;
      const imageDataUrl = canvas.toDataURL("image/jpeg", PDF_IMAGE_QUALITY);
      pageImages.push(imageDataUrl);
      canvas.width = 0;
      canvas.height = 0;
    }
    return pageImages;
  };
  const importResumeFromPdf = async (file) => {
    if (!geminiApiKey || !geminiModelId) {
      toast.error(t("dashboard.resumes.importDialog.geminiConfigRequired"));
      router.push("/app/dashboard/ai");
      return;
    }
    const pdfImages = await extractImagesFromPdf(file);
    if (pdfImages.length === 0) {
      throw new Error("No extractable PDF pages");
    }
    const response = await fetch("/api/resume-import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        images: pdfImages,
        apiKey: geminiApiKey,
        model: geminiModelId,
        locale
      })
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data?.details ? `${data?.error || "Resume import failed"}
${data.details}` : data?.error || "Resume import failed";
      throw new Error(message);
    }
    const aiResume = data?.resume ? data.resume : data?.choices?.[0]?.message?.content ? extractJsonContent(data.choices[0].message.content) : null;
    if (!aiResume) {
      throw new Error("Invalid AI response");
    }
    const nameWithoutExt = file.name.replace(/\.[^.]+$/, "").trim();
    const resume = createResumeFromAIResult(aiResume, nameWithoutExt);
    const resumeId = addResume(resume);
    setActiveResume(resumeId);
    setIsImportDialogOpen(false);
    toast.success(t("dashboard.resumes.importDialog.pdfSuccess"));
    router.push(`/app/workbench/${resumeId}`);
  };
  const handleJsonFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || isImporting) return;
    try {
      setIsImporting(true);
      await importResumeFromJson(file);
    } catch (error) {
      console.error("Import JSON error:", error);
      toast.error(t("dashboard.resumes.importError"));
    } finally {
      setIsImporting(false);
    }
  };
  const handlePdfFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || isImporting) return;
    try {
      setIsImporting(true);
      await importResumeFromPdf(file);
    } catch (error) {
      console.error("Import PDF error:", error);
      const message = error instanceof Error && error.message ? error.message : t("dashboard.resumes.importDialog.pdfError");
      toast.error(message);
    } finally {
      setIsImporting(false);
    }
  };
  return /* @__PURE__ */ jsx(ScrollArea, { className: "h-[calc(100vh-2rem)] w-full", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
      className: "flex-1 space-y-6 py-8",
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "flex w-full items-center justify-center px-4",
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.3, delay: 0.1 },
            children: hasConfiguredFolder ? /* @__PURE__ */ jsx(Alert, { className: "mb-6 bg-green-50/50 dark:bg-green-950/30 border-green-200 dark:border-green-900", children: /* @__PURE__ */ jsxs(AlertDescription, { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-green-700 dark:text-green-400", children: t("dashboard.resumes.synced") }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "ml-4 hover:bg-green-100 dark:hover:bg-green-900",
                  onClick: () => {
                    router.push("/app/dashboard/settings");
                  },
                  children: [
                    /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4 mr-2" }),
                    t("dashboard.resumes.view")
                  ]
                }
              )
            ] }) }) : /* @__PURE__ */ jsxs(
              Alert,
              {
                variant: "destructive",
                className: "mb-6 bg-red-50/50 dark:bg-red-950/30 border-red-200 dark:border-red-900",
                children: [
                  /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx(AlertTitle, { children: t("dashboard.resumes.notice.title") }),
                  /* @__PURE__ */ jsxs(AlertDescription, { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-red-700 dark:text-red-400", children: t("dashboard.resumes.notice.description") }),
                    /* @__PURE__ */ jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        className: "ml-4 hover:bg-red-100 dark:hover:bg-red-900",
                        onClick: () => {
                          router.push("/app/dashboard/settings");
                        },
                        children: [
                          /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4 mr-2" }),
                          t("dashboard.resumes.notice.goToSettings")
                        ]
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "px-4 sm:px-6 flex items-center justify-between",
            initial: { y: -20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.3 },
            children: [
              /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100", children: t("dashboard.resumes.myResume") }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(AnimatedImportButton, { onClick: () => setIsImportDialogOpen(true), t }),
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                    children: /* @__PURE__ */ jsxs(
                      Button,
                      {
                        onClick: () => setIsCreateModalOpen(true),
                        variant: "default",
                        className: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90",
                        children: [
                          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
                          t("dashboard.resumes.create")
                        ]
                      }
                    )
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "flex-1 w-full p-3 sm:p-6",
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.3, delay: 0.2 },
            children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6", children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  whileHover: { scale: 1.02 },
                  whileTap: { scale: 0.98 },
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                  onClick: () => setIsCreateModalOpen(true),
                  children: /* @__PURE__ */ jsx(
                    Card,
                    {
                      className: cn(
                        "relative border border-dashed cursor-pointer transition-all duration-200 aspect-[210/297] flex flex-col",
                        "hover:border-gray-400 hover:bg-gray-50",
                        "dark:hover:border-primary dark:hover:bg-primary/10"
                      ),
                      children: /* @__PURE__ */ jsxs(CardContent, { className: "flex-1 p-0 text-center flex flex-col items-center justify-center", children: [
                        /* @__PURE__ */ jsx(
                          motion.div,
                          {
                            className: "mb-4 p-4 rounded-full bg-gray-100 dark:bg-primary/10",
                            whileHover: { rotate: 90 },
                            transition: { duration: 0.2 },
                            children: /* @__PURE__ */ jsx(Plus, { className: "h-8 w-8 text-gray-600 dark:text-primary" })
                          }
                        ),
                        /* @__PURE__ */ jsx(CardTitle, { className: "text-xl text-gray-900 dark:text-gray-100 px-4", children: t("dashboard.resumes.newResume") }),
                        /* @__PURE__ */ jsx(CardDescription, { className: "mt-2 text-gray-600 dark:text-gray-400 px-4", children: t("dashboard.resumes.newResumeDescription") })
                      ] })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(AnimatePresence, { children: Object.entries(resumes).sort(([, a], [, b]) => {
                const dateA = new Date(a.createdAt || 0).getTime();
                const dateB = new Date(b.createdAt || 0).getTime();
                return dateB - dateA;
              }).map(([id, resume], index) => /* @__PURE__ */ jsx(
                ResumeCardItem,
                {
                  id,
                  resume,
                  t,
                  locale,
                  setActiveResume,
                  router,
                  deleteResume,
                  index
                },
                id
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          CreateResumeModal,
          {
            open: isCreateModalOpen,
            onOpenChange: setIsCreateModalOpen,
            onCreate: handleCreateFromModal
          }
        ),
        /* @__PURE__ */ jsx(
          ImportResumeDialog,
          {
            open: isImportDialogOpen,
            isImporting,
            onOpenChange: setIsImportDialogOpen,
            jsonFileInputRef,
            pdfFileInputRef,
            onJsonFileChange: handleJsonFileChange,
            onPdfFileChange: handlePdfFileChange
          }
        )
      ]
    }
  ) });
};
function ResumesPage() {
  return /* @__PURE__ */ jsx(ResumeWorkbench, {});
}
const SplitComponent = ResumesPage;
export {
  SplitComponent as component
};
