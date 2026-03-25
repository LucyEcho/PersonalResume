import { jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import { n as normalizeFontFamily, R as ResumeTemplateComponent } from "./index-BnsqTy7W.js";
import { c as cn } from "./utils-Dmlx_rqM.js";
import { g as getTemplateById, c as createTemplatePreviewData, T as TEMPLATE_PREVIEW_HEIGHT_PX, a as TEMPLATE_PREVIEW_WIDTH_PX, b as TEMPLATE_SNAPSHOT_ROOT_ATTRIBUTE, i as isTemplatePreviewLocale } from "./templatePreview-BUrRhH0o.js";
import "framer-motion";
import "lucide-react";
import "zustand";
import "zustand/middleware";
import "./fileSystem-BUemSlsv.js";
import "uuid";
import "./router-DDFDFkQR.js";
import "next-themes";
import "@heroui/react";
import "sonner";
import "@google/generative-ai";
import "undici";
import "clsx";
import "tailwind-merge";
const IframeTemplateViewer = () => {
  const { id } = useParams({ from: "/app/preview-template/$id" });
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const localeParam = searchParams?.get("locale");
  const cookieLocale = typeof document !== "undefined" ? document.cookie.split("; ").find((row) => row.startsWith("NEXT_LOCALE="))?.split("=")[1] : null;
  const locale = isTemplatePreviewLocale(localeParam) ? localeParam : isTemplatePreviewLocale(cookieLocale) ? cookieLocale : "zh";
  const isSnapshotMode = searchParams?.get("snapshot") === "1";
  const template = useMemo(() => {
    return getTemplateById(id);
  }, [id]);
  const mockData = useMemo(() => {
    return createTemplatePreviewData(template, locale);
  }, [locale, template]);
  const selectedFontFamily = normalizeFontFamily(
    mockData.globalSettings?.fontFamily
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "w-full min-h-screen overflow-hidden bg-white",
        isSnapshotMode ? "flex items-start justify-start p-0" : "flex items-start justify-center"
      ),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ...{ [TEMPLATE_SNAPSHOT_ROOT_ATTRIBUTE]: "" },
          className: cn(
            "bg-white relative origin-top-left",
            isSnapshotMode ? "" : "mx-auto"
          ),
          style: {
            width: `${TEMPLATE_PREVIEW_WIDTH_PX}px`,
            minWidth: `${TEMPLATE_PREVIEW_WIDTH_PX}px`,
            height: isSnapshotMode ? `${TEMPLATE_PREVIEW_HEIGHT_PX}px` : void 0,
            minHeight: `${TEMPLATE_PREVIEW_HEIGHT_PX}px`,
            overflow: "hidden",
            fontFamily: selectedFontFamily,
            padding: `${template.spacing.contentPadding}px`
          },
          children: /* @__PURE__ */ jsx(ResumeTemplateComponent, { data: mockData, template })
        }
      )
    }
  );
};
const SplitComponent = IframeTemplateViewer;
export {
  SplitComponent as component
};
