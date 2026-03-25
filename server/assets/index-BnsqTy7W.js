import { jsx, jsxs } from "react/jsx-runtime";
import React__default, { useState, useEffect, createContext, useContext, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { c as cn, f as formatDateString } from "./utils-Dmlx_rqM.js";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { g as getFileHandle, v as verifyPermission } from "./fileSystem-BUemSlsv.js";
import { v4 } from "uuid";
import { b as useTranslations, u as useLocale } from "./router-DDFDFkQR.js";
const classicConfig = {
  id: "classic",
  name: "经典模板",
  description: "传统简约的简历布局，适合大多数求职场景",
  thumbnail: "classic",
  layout: "classic",
  colorScheme: {
    primary: "#000000",
    secondary: "#4b5563",
    background: "#ffffff",
    text: "#212529"
  },
  spacing: {
    sectionGap: 16,
    itemGap: 12,
    contentPadding: 32
  },
  basic: {
    layout: "left"
  },
  availableSections: ["skills", "experience", "projects", "education", "selfEvaluation", "certificates"]
};
const modernConfig = {
  id: "modern",
  name: "两栏布局",
  description: "经典两栏，突出个人特色",
  thumbnail: "modern",
  layout: "modern",
  colorScheme: {
    primary: "#000000",
    secondary: "#6b7280",
    background: "#ffffff",
    text: "#212529"
  },
  spacing: {
    sectionGap: 8,
    itemGap: 4,
    contentPadding: 1
  },
  basic: {
    layout: "center"
  },
  availableSections: ["skills", "experience", "projects", "education", "selfEvaluation", "certificates"]
};
const leftRightConfig = {
  id: "left-right",
  name: "模块标题背景色",
  description: "模块标题背景鲜明，突出美观特色",
  thumbnail: "leftRight",
  layout: "left-right",
  colorScheme: {
    primary: "#000000",
    secondary: "#9ca3af",
    background: "#ffffff",
    text: "#212529"
  },
  spacing: {
    sectionGap: 24,
    itemGap: 16,
    contentPadding: 32
  },
  basic: {
    layout: "left"
  },
  availableSections: ["skills", "experience", "projects", "education", "selfEvaluation", "certificates"]
};
const timelineConfig = {
  id: "timeline",
  name: "时间线风格",
  description: "时间线布局，突出经历的时间顺序",
  thumbnail: "timeline",
  layout: "timeline",
  colorScheme: {
    primary: "#18181b",
    secondary: "#64748b",
    background: "#ffffff",
    text: "#212529"
  },
  spacing: {
    sectionGap: 1,
    itemGap: 12,
    contentPadding: 24
  },
  basic: {
    layout: "left"
  },
  availableSections: ["skills", "experience", "projects", "education", "selfEvaluation", "certificates"]
};
const minimalistConfig = {
  id: "minimalist",
  name: "极简模板",
  description: "大面积留白，干净纯粹的排版风格",
  thumbnail: "minimalist",
  layout: "minimalist",
  colorScheme: {
    primary: "#171717",
    secondary: "#737373",
    background: "#ffffff",
    text: "#171717"
  },
  spacing: {
    sectionGap: 32,
    itemGap: 24,
    contentPadding: 40
  },
  basic: {
    layout: "center"
  },
  availableSections: ["skills", "experience", "projects", "education", "selfEvaluation", "certificates"]
};
const elegantConfig = {
  id: "elegant",
  name: "优雅模板",
  description: "居中标题单列设计，具有高级感的分隔线",
  thumbnail: "elegant",
  layout: "elegant",
  colorScheme: {
    primary: "#18181b",
    secondary: "#71717a",
    background: "#ffffff",
    text: "#27272a"
  },
  spacing: {
    sectionGap: 28,
    itemGap: 18,
    contentPadding: 32
  },
  basic: {
    layout: "center"
  },
  availableSections: ["skills", "experience", "projects", "education", "selfEvaluation", "certificates"]
};
const creativeConfig = {
  id: "creative",
  name: "创意模板",
  description: "视觉错落设计，灵动活泼展现个性",
  thumbnail: "creative",
  layout: "creative",
  colorScheme: {
    primary: "#18181b",
    secondary: "#64748b",
    background: "#ffffff",
    text: "#1e293b"
  },
  spacing: {
    sectionGap: 16,
    itemGap: 16,
    contentPadding: 14
  },
  basic: {
    layout: "left"
  },
  availableSections: ["skills", "experience", "projects", "education", "selfEvaluation", "certificates"]
};
const DEFAULT_CONFIG = {
  width: 90,
  height: 120,
  aspectRatio: "1:1",
  borderRadius: "none",
  customBorderRadius: 0,
  visible: true
};
const getRatioMultiplier = (ratio) => {
  switch (ratio) {
    case "4:3":
      return 3 / 4;
    case "3:4":
      return 4 / 3;
    case "16:9":
      return 9 / 16;
    default:
      return 1;
  }
};
const getBorderRadiusValue = (config) => {
  if (!config) return "0";
  switch (config.borderRadius) {
    case "medium":
      return "0.5rem";
    case "full":
      return "9999px";
    case "custom":
      return `${config.customBorderRadius}px`;
    default:
      return "0";
  }
};
const THEME_COLORS = [
  "#000000",
  "#1A1A1A",
  "#333333",
  "#4D4D4D",
  "#666666",
  "#808080",
  "#999999",
  "#0047AB",
  "#8B0000",
  "#FF4500",
  "#4B0082",
  "#2E8B57"
];
const SectionWrapper = ({
  sectionId,
  children,
  className = "",
  style
}) => {
  const { setActiveSection } = useResumeStore();
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      "data-resume-section-id": sectionId,
      className: cn(
        "hover:cursor-pointer rounded-md transition-all duration-300 ease-in-out hover:shadow-md",
        "hover:bg-[#f9f8f3]",
        className
      ),
      style,
      onClick: () => setActiveSection(sectionId),
      children
    }
  );
};
const colorLevels = [
  "bg-[#ebedf0]",
  // 0 contributions
  "bg-[#9be9a8]",
  // 1-3 contributions
  "bg-[#40c463]",
  // 4-7 contributions
  "bg-[#30a14e]",
  // 8-12 contributions
  "bg-[#216e39]"
  // 13+ contributions
];
const getColorLevel = (count) => {
  if (count === 0) return colorLevels[0];
  if (count <= 3) return colorLevels[1];
  if (count <= 7) return colorLevels[2];
  if (count <= 12) return colorLevels[3];
  return colorLevels[4];
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  });
};
async function fetchGithubContributions(username, githubKey) {
  const token = githubKey;
  if (!token) {
    throw new Error("GitHub token is required");
  }
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("GitHub API Error:", errorData);
      throw new Error(errorData.message || "Failed to fetch GitHub data");
    }
    const data = await response.json();
    if (data.errors) {
      console.error("GitHub API Error:", data.errors);
      throw new Error(data.errors[0]?.message || "GitHub API Error");
    }
    const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      throw new Error("No contribution data found");
    }
    const contributions = [];
    calendar.weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        contributions.push({
          date: day.date,
          count: day.contributionCount
        });
      });
    });
    return contributions;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    throw error;
  }
}
const GithubContributions = ({
  username,
  githubKey,
  className,
  year = (/* @__PURE__ */ new Date()).getFullYear()
}) => {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function loadContributions() {
      try {
        setLoading(true);
        const contributions = await fetchGithubContributions(
          username,
          githubKey
        );
        const yearContributions = contributions.filter((day) => {
          const date = new Date(day.date);
          return date.getFullYear() === year;
        });
        const groupedWeeks = [];
        let currentWeek = [];
        yearContributions.forEach((day, index) => {
          currentWeek.push(day);
          if (currentWeek.length === 7 || index === yearContributions.length - 1) {
            if (currentWeek.length < 7) {
              const emptyDays = 7 - currentWeek.length;
              for (let i = 0; i < emptyDays; i++) {
                currentWeek.push({
                  date: "",
                  count: 0
                });
              }
            }
            groupedWeeks.push([...currentWeek]);
            currentWeek = [];
          }
        });
        setWeeks(groupedWeeks);
        setError(null);
      } catch (err) {
        setError("Failed to load GitHub contributions");
      } finally {
        setLoading(false);
      }
    }
    if (username) {
      loadContributions();
    }
  }, [githubKey, username, year]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "animate-pulse bg-gray-200 h-32 rounded-md" });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "text-red-500", children: error });
  }
  const goGithub = () => {
    window.open(`https://github.com/${username}`, "_blank");
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full flex  flex-col gap-2", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "w-full flex justify-start gap-[1px]  overflow-hidden",
        className
      ),
      children: weeks.map((week, weekIndex) => /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-[3px]", children: week.map((day, dayIndex) => /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "w-[13px] h-[13px] rounded-[3px] relative group cursor-pointer",
            getColorLevel(day.count),
            "transition-colors duration-200"
          ),
          title: String(day.date),
          onClick: goGithub,
          children: day.date && /* @__PURE__ */ jsxs(
            "div",
            {
              className: "pointer-events-none absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-10",
              style: {
                visibility: "hidden",
                transitionProperty: "opacity, visibility",
                transitionDuration: "150ms"
              },
              children: [
                formatDate(day.date),
                ": ",
                day.count,
                " contributions",
                /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" })
              ]
            }
          )
        },
        `${weekIndex}-${dayIndex}`
      )) }, weekIndex))
    }
  ) });
};
const BaseInfo$6 = ({ basic = {}, globalSettings, template }) => {
  const t = useTranslations("workbench");
  const locale = useLocale();
  const useIconMode = globalSettings?.useIconMode ?? false;
  const layout = basic?.layout || "left";
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "w-4 h-4" }) : null;
  };
  const getOrderedFields = React__default.useMemo(() => {
    if (!basic.fieldOrder) {
      return [{ key: "email", value: basic.email, icon: basic.icons?.email || "Mail", label: "电子邮箱", visible: true, custom: false }].filter((item) => Boolean(item.value && item.visible));
    }
    return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
      key: field.key,
      value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
      icon: basic.icons?.[field.key] || "User",
      label: field.label,
      visible: field.visible,
      custom: field.custom
    })).filter((item) => Boolean(item.value));
  }, [basic]);
  const allFields = [
    ...getOrderedFields,
    ...basic.customFields?.filter((field) => field.visible !== false).map((field) => ({
      key: field.id,
      value: field.value,
      icon: field.icon,
      label: field.label,
      visible: true,
      custom: true
    })) || []
  ];
  const nameField = basic.fieldOrder?.find((f) => f.key === "name") || { key: "name", visible: true };
  const titleField = basic.fieldOrder?.find((f) => f.key === "title") || { key: "title", visible: true };
  const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx("div", { style: { width: `${basic.photoConfig?.width || 100}px`, height: `${basic.photoConfig?.height || 100}px`, borderRadius: getBorderRadiusValue(basic.photoConfig || { borderRadius: "none", customBorderRadius: 0 }), overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: basic.photo, alt: `${basic.name}'s photo`, className: "w-full h-full object-cover" }) }) });
  const layoutStyles = {
    left: { container: "flex items-center justify-between gap-6", leftContent: "flex items-center gap-6 flex-1 min-w-0", fields: "grid grid-cols-2 gap-x-8 gap-y-2 justify-start shrink-0", nameTitle: "text-left min-w-0" },
    right: { container: "flex items-center justify-between gap-6 flex-row-reverse", leftContent: "flex justify-end items-center gap-6 flex-1 min-w-0", fields: "grid grid-cols-2 gap-x-8 gap-y-2 justify-start shrink-0", nameTitle: "text-right min-w-0" },
    center: { container: "flex flex-col items-center gap-3", leftContent: "flex flex-col items-center gap-4", fields: "w-full flex justify-start items-center flex-wrap gap-3", nameTitle: "text-center min-w-0" }
  };
  const styles = layoutStyles[layout] || layoutStyles.left;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "basic", children: [
    /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
      /* @__PURE__ */ jsxs("div", { className: styles.leftContent, children: [
        PhotoComponent,
        /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col", styles.nameTitle), children: [
          nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, { layout: "position", className: "font-bold whitespace-pre-wrap break-words", style: { fontSize: "30px" }, children: basic[nameField.key] }),
          titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, { layout: "position", className: "whitespace-pre-wrap break-words", style: { fontSize: "18px" }, children: basic[titleField.key] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { layout: "position", className: styles.fields, style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, color: "rgb(75, 85, 99)", maxWidth: layout === "center" ? "none" : "600px" }, children: allFields.map((item) => /* @__PURE__ */ jsx(motion.div, { className: "flex items-center whitespace-nowrap overflow-hidden text-baseFont", children: useIconMode ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        getIcon(item.icon),
        item.key === "email" ? /* @__PURE__ */ jsx("a", { href: `mailto:${item.value}`, className: "underline", children: item.value }) : /* @__PURE__ */ jsx("span", { children: item.value })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-hidden", children: [
        !item.custom && /* @__PURE__ */ jsxs("span", { children: [
          t(`basicPanel.basicFields.${item.key}`),
          ":"
        ] }),
        item.custom && /* @__PURE__ */ jsxs("span", { children: [
          item.label,
          ":"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "truncate", suppressHydrationWarning: true, children: item.value })
      ] }) }, item.key)) })
    ] }),
    basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, { className: "mt-2", githubKey: basic.githubKey, username: basic.githubUseName })
  ] });
};
const TemplateContext = createContext(void 0);
const TemplateProvider = ({ templateId, menuSections, children }) => {
  return /* @__PURE__ */ jsx(TemplateContext.Provider, { value: { templateId, menuSections }, children });
};
const useTemplateContext = () => {
  return useContext(TemplateContext);
};
const SectionTitle$6 = ({ type, title, globalSettings, showTitle = true }) => {
  const { activeResume } = useResumeStore();
  const templateContext = useTemplateContext();
  const menuSections = templateContext?.menuSections ?? activeResume?.menuSections ?? [];
  const renderTitle = useMemo(() => {
    if (type === "custom") return title;
    return menuSections.find((s) => s.id === type)?.title;
  }, [menuSections, type, title]);
  const themeColor = globalSettings?.themeColor;
  if (!showTitle) return null;
  return /* @__PURE__ */ jsx(
    "h3",
    {
      className: "pb-2 border-b font-bold",
      style: {
        fontSize: `${globalSettings?.headerSize || 18}px`,
        color: themeColor,
        borderColor: themeColor,
        marginBottom: `${globalSettings?.paragraphSpacing}px`
      },
      children: renderTitle
    }
  );
};
const HTML_TAG_REGEX = /<\/?[a-z][\s\S]*>/i;
const EMPTY_PARAGRAPH_REGEX = /<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi;
const HTML_BREAK_REGEX = /<br\s*\/?>/gi;
const HTML_ANY_TAG_REGEX = /<\/?[^>]+>/g;
const INVISIBLE_WHITESPACE_REGEX = /[\s\u200B-\u200D\uFEFF]/g;
const RICH_TEXT_ANCHOR_REGEX = /<a\b([^>]*)>/gi;
const CLASS_ATTRIBUTE_REGEX = /\bclass\s*=\s*("([^"]*)"|'([^']*)')/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMAIN_REGEX = /^(?:www\.)?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+(?:[/?#][^\s]*)?$/i;
const SAFE_LINK_PROTOCOL_REGEX = /^(https?:|mailto:|tel:)/i;
const ANY_PROTOCOL_REGEX = /^[a-z][a-z\d+\-.]*:/i;
const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const decorateRichTextAnchors = (content) => content.replace(RICH_TEXT_ANCHOR_REGEX, (match, attrs) => {
  if (CLASS_ATTRIBUTE_REGEX.test(attrs)) {
    return match.replace(CLASS_ATTRIBUTE_REGEX, (_classMatch, quotedValue, doubleQuoted, singleQuoted) => {
      const currentValue = doubleQuoted ?? singleQuoted ?? quotedValue ?? "";
      const classes = currentValue.split(/\s+/).filter(Boolean);
      if (!classes.includes("rich-text-link")) {
        classes.push("rich-text-link");
      }
      return `class="${classes.join(" ")}"`;
    });
  }
  return `<a class="rich-text-link"${attrs}>`;
});
const normalizeLinkHref = (href) => {
  if (!href) return null;
  const value = href.trim();
  if (!value) return null;
  if (SAFE_LINK_PROTOCOL_REGEX.test(value)) {
    return value;
  }
  if (value.startsWith("//")) {
    return `https:${value}`;
  }
  if (EMAIL_REGEX.test(value)) {
    return `mailto:${value}`;
  }
  if (DOMAIN_REGEX.test(value)) {
    return `https://${value}`;
  }
  if (ANY_PROTOCOL_REGEX.test(value)) {
    return null;
  }
  return null;
};
const normalizeRichTextContent = (content) => {
  if (!content) return "";
  let normalized = content;
  if (!HTML_TAG_REGEX.test(content)) {
    normalized = escapeHtml(content).replace(/\r\n|\r|\n/g, "<br />");
  }
  return decorateRichTextAnchors(normalized).replace(
    EMPTY_PARAGRAPH_REGEX,
    "<p><br /></p>"
  );
};
const hasMeaningfulRichTextContent = (content) => {
  if (!content) return false;
  if (!HTML_TAG_REGEX.test(content)) {
    return content.replace(INVISIBLE_WHITESPACE_REGEX, "").length > 0;
  }
  const plainText = content.replace(EMPTY_PARAGRAPH_REGEX, "").replace(HTML_BREAK_REGEX, "").replace(/&nbsp;/gi, " ").replace(HTML_ANY_TAG_REGEX, "").replace(INVISIBLE_WHITESPACE_REGEX, "");
  return plainText.length > 0;
};
const ExperienceSection$6 = ({ experiences, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleExperiences = experiences?.filter((exp) => exp.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "experience", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$6, { type: "experience", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.company }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
        /* @__PURE__ */ jsx("div", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(exp.date, locale) })
      ] }),
      exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
      exp.details && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "mt-1 text-baseFont",
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 }
        }
      )
    ] }, exp.id)) })
  ] });
};
const EducationSection$6 = ({ education, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleEducation = education?.filter((edu) => edu.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "education", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$6, { type: "education", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: edu.school }),
        centerSubtitle && /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: [
          [edu.major, edu.degree].filter(Boolean).join(" · "),
          edu.gpa && ` · GPA ${edu.gpa}`
        ] }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
            suppressHydrationWarning: true,
            style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
            children: `${formatDateString(edu.startDate, locale)} - ${formatDateString(edu.endDate, locale)}`
          }
        )
      ] }),
      !centerSubtitle && /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: [
        [edu.major, edu.degree].filter(Boolean).join(" · "),
        edu.gpa && ` · GPA ${edu.gpa}`
      ] }),
      hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
        }
      )
    ] }, edu.id)) })
  ] });
};
const ProjectSection$6 = ({ projects, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleProjects = projects?.filter((p) => p.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "projects", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$6, { type: "projects", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleProjects.map((project) => /* @__PURE__ */ jsxs(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`, children: /* @__PURE__ */ jsx("h3", { className: "font-bold", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.name }) }),
        project.link && !centerSubtitle && /* @__PURE__ */ jsx(
          "a",
          {
            href: project.link.startsWith("http") ? project.link : `https://${project.link}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: `underline ${flexLayout ? "" : "flex-1"}`,
            title: project.link,
            children: (() => {
              try {
                return new URL(project.link.startsWith("http") ? project.link : `https://${project.link}`).hostname.replace(/^www\./, "");
              } catch {
                return project.link;
              }
            })()
          }
        ),
        !project.link && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
        /* @__PURE__ */ jsx("div", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(project.date, locale) })
      ] }),
      project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
      project.link && centerSubtitle && /* @__PURE__ */ jsx("a", { href: project.link.startsWith("http") ? project.link : `https://${project.link}`, target: "_blank", rel: "noopener noreferrer", className: "underline", title: project.link, children: project.link }),
      project.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
        }
      )
    ] }, project.id)) }) })
  ] });
};
const SkillSection$6 = ({ skill, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "skills", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$6, { type: "skills", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
      }
    ) })
  ] });
};
const SelfEvaluationSection$6 = ({ content, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "selfEvaluation", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$6, { type: "selfEvaluation", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
      }
    ) })
  ] });
};
const CustomSection$6 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId, style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$6, { title, type: "custom", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`, children: /* @__PURE__ */ jsx("h4", { className: "font-bold", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.title }) }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
        /* @__PURE__ */ jsx("span", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(item.dateRange, locale) })
      ] }),
      !centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
      item.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
        }
      )
    ] }, item.id)) })
  ] });
};
const CertificatesSection = ({ certificates }) => {
  if (!certificates || certificates.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 w-full mt-2", children: certificates.map((cert) => /* @__PURE__ */ jsx(
    "div",
    {
      style: { width: `calc(${cert.width}% - 8px)` },
      className: "flex justify-center max-w-full",
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: cert.url,
          alt: "Certificate",
          className: "w-full h-auto object-contain"
        }
      )
    },
    cert.id
  )) });
};
const ClassicTemplate = ({ data, template }) => {
  const { colorScheme } = template;
  const enabledSections = data.menuSections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case "basic":
        return /* @__PURE__ */ jsx(BaseInfo$6, { basic: data.basic, globalSettings: data.globalSettings, template });
      case "experience":
        return /* @__PURE__ */ jsx(ExperienceSection$6, { experiences: data.experience, globalSettings: data.globalSettings });
      case "education":
        return /* @__PURE__ */ jsx(EducationSection$6, { education: data.education, globalSettings: data.globalSettings });
      case "skills":
        return /* @__PURE__ */ jsx(SkillSection$6, { skill: data.skillContent, globalSettings: data.globalSettings });
      case "projects":
        return /* @__PURE__ */ jsx(ProjectSection$6, { projects: data.projects, globalSettings: data.globalSettings });
      case "certificates":
        return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "certificates", style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` }, children: [
          /* @__PURE__ */ jsx(SectionTitle$6, { type: "certificates", globalSettings: data.globalSettings }),
          /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })
        ] });
      case "selfEvaluation":
        return /* @__PURE__ */ jsx(SelfEvaluationSection$6, { content: data.selfEvaluationContent, globalSettings: data.globalSettings });
      default:
        if (sectionId in data.customData) {
          const sectionTitle = data.menuSections.find((s) => s.id === sectionId)?.title || sectionId;
          return /* @__PURE__ */ jsx(CustomSection$6, { title: sectionTitle, sectionId, items: data.customData[sectionId], globalSettings: data.globalSettings });
        }
        return null;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full min-h-screen", style: { backgroundColor: colorScheme.background, color: colorScheme.text }, children: enabledSections.map((section) => /* @__PURE__ */ jsx("div", { children: renderSection(section.id) }, section.id)) });
};
const BaseInfo$5 = ({ basic = {}, globalSettings, template }) => {
  const t = useTranslations("workbench");
  const locale = useLocale();
  const useIconMode = globalSettings?.useIconMode ?? false;
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "w-4 h-4" }) : null;
  };
  const getOrderedFields = React__default.useMemo(() => {
    if (!basic.fieldOrder) {
      return [{ key: "email", value: basic.email, icon: basic.icons?.email || "Mail", label: "电子邮箱", visible: true, custom: false }].filter((item) => Boolean(item.value && item.visible));
    }
    return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
      key: field.key,
      value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
      icon: basic.icons?.[field.key] || "User",
      label: field.label,
      visible: field.visible,
      custom: field.custom
    })).filter((item) => Boolean(item.value));
  }, [basic]);
  const allFields = [
    ...getOrderedFields,
    ...basic.customFields?.filter((field) => field.visible !== false).map((field) => ({
      key: field.id,
      value: field.value,
      icon: field.icon,
      label: field.label,
      visible: true,
      custom: true
    })) || []
  ];
  const nameField = basic.fieldOrder?.find((f) => f.key === "name") || { key: "name", visible: true };
  const titleField = basic.fieldOrder?.find((f) => f.key === "title") || { key: "title", visible: true };
  const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx("div", { style: { width: `${basic.photoConfig?.width || 100}px`, height: `${basic.photoConfig?.height || 100}px`, borderRadius: getBorderRadiusValue(basic.photoConfig || { borderRadius: "none", customBorderRadius: 0 }), overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: basic.photo, alt: `${basic.name}'s photo`, className: "w-full h-full object-cover" }) }) });
  return /* @__PURE__ */ jsx(SectionWrapper, { sectionId: "basic", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      PhotoComponent,
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col text-center min-w-0", style: { color: "#fff" }, children: [
        nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, { layout: "position", className: "font-bold whitespace-pre-wrap break-words", style: { fontSize: "30px", color: "#fff" }, children: basic[nameField.key] }),
        titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, { layout: "position", className: "whitespace-pre-wrap break-words", style: { fontSize: "18px", color: "#fff" }, children: basic[titleField.key] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        layout: "position",
        className: "w-full flex flex-col gap-2",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, color: "#fff" },
        children: allFields.map((item) => /* @__PURE__ */ jsx(motion.div, { className: "flex items-center whitespace-nowrap overflow-hidden text-baseFont", style: { width: "100%", color: "#fff" }, children: useIconMode ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", style: { color: "#fff" }, children: [
          getIcon(item.icon),
          item.key === "email" ? /* @__PURE__ */ jsx("a", { href: `mailto:${item.value}`, className: "underline", style: { color: "#fff" }, children: item.value }) : /* @__PURE__ */ jsx("span", { style: { color: "#fff" }, children: item.value })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-hidden", style: { color: "#fff" }, children: [
          !item.custom && /* @__PURE__ */ jsxs("span", { style: { color: "#fff" }, children: [
            t(`basicPanel.basicFields.${item.key}`),
            ":"
          ] }),
          item.custom && /* @__PURE__ */ jsxs("span", { style: { color: "#fff" }, children: [
            item.label,
            ":"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "truncate", suppressHydrationWarning: true, style: { color: "#fff" }, children: item.value })
        ] }) }, item.key))
      }
    )
  ] }) });
};
const SectionTitle$5 = ({ type, title, globalSettings, showTitle = true, variant = "default" }) => {
  const { activeResume } = useResumeStore();
  const templateContext = useTemplateContext();
  const menuSections = templateContext?.menuSections ?? activeResume?.menuSections ?? [];
  const renderTitle = useMemo(() => {
    if (type === "custom") return title;
    return menuSections.find((s) => s.id === type)?.title;
  }, [menuSections, type, title]);
  const themeColor = globalSettings?.themeColor;
  if (!showTitle) return null;
  const isSidebar = variant === "sidebar";
  return /* @__PURE__ */ jsx(
    "h3",
    {
      className: cn(
        "pb-1 font-semibold mb-2 uppercase tracking-wider",
        isSidebar ? "border-b border-white/20" : "border-b"
      ),
      style: {
        fontSize: `${isSidebar ? (globalSettings?.headerSize || 18) - 2 : globalSettings?.headerSize || 18}px`,
        fontWeight: "bold",
        color: isSidebar ? "#ffffff" : themeColor,
        borderColor: isSidebar ? "rgba(255,255,255,0.2)" : themeColor,
        marginBottom: isSidebar ? "12px" : `${globalSettings?.paragraphSpacing}px`
      },
      children: renderTitle
    }
  );
};
const ExperienceSection$5 = ({ experiences, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleExperiences = experiences?.filter((exp) => exp.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "experience", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$5, { type: "experience", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: cn("font-bold truncate", flexLayout ? "" : "flex-1"), style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.company }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: cn("text-subtitleFont truncate", flexLayout ? "ml-[16px]" : "flex-1"), style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
        /* @__PURE__ */ jsx("div", { className: cn("text-subtitleFont shrink-0 whitespace-nowrap", flexLayout ? "ml-auto" : "text-right"), style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(exp.date, locale) })
      ] }),
      exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
      exp.details && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "mt-1 text-baseFont",
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 }
        }
      )
    ] }, exp.id)) })
  ] });
};
const EducationSection$5 = ({ education, globalSettings, showTitle = true, variant = "default" }) => {
  const locale = useLocale();
  const visibleEducation = education?.filter((edu) => edu.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  const isSidebar = variant === "sidebar";
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "education", style: { marginTop: isSidebar ? 0 : `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(
      SectionTitle$5,
      {
        type: "education",
        globalSettings,
        showTitle,
        variant
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: isSidebar ? "12px" : `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs("div", { className: cn("flex gap-4 items-center justify-between", isSidebar && "flex-col items-start gap-1"), children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn("font-bold truncate", !flexLayout && !isSidebar && "flex-1"),
            style: { fontSize: `${isSidebar ? (globalSettings?.baseFontSize || 14) + 2 : globalSettings?.subheaderSize || 16}px`, color: isSidebar ? "#fff" : "inherit" },
            children: edu.school
          }
        ),
        centerSubtitle && !isSidebar && /* @__PURE__ */ jsxs(
          motion.div,
          {
            layout: "position",
            className: cn("text-subtitleFont truncate", flexLayout ? "ml-[16px]" : "flex-1"),
            style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
            children: [
              [edu.major, edu.degree].filter(Boolean).join(" · "),
              edu.gpa && ` · GPA ${edu.gpa}`
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn("text-subtitleFont shrink-0 whitespace-nowrap", !flexLayout && !isSidebar && "text-right", isSidebar && "opacity-80"),
            suppressHydrationWarning: true,
            style: { fontSize: isSidebar ? "12px" : `${globalSettings?.subheaderSize || 16}px`, color: isSidebar ? "#fff" : "inherit" },
            children: `${formatDateString(edu.startDate, locale)} - ${formatDateString(edu.endDate, locale)}`
          }
        )
      ] }),
      (!centerSubtitle || isSidebar) && /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn("text-subtitleFont mt-0.5", isSidebar ? "text-xs opacity-90" : "mt-1"),
          style: { fontSize: isSidebar ? "12px" : `${globalSettings?.subheaderSize || 16}px`, color: isSidebar ? "#fff" : "inherit" },
          children: [
            [edu.major, edu.degree].filter(Boolean).join(" · "),
            edu.gpa && ` · GPA ${edu.gpa}`
          ]
        }
      ),
      hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: cn("mt-1 text-baseFont", isSidebar && " opacity-80"),
          style: {
            fontSize: `${isSidebar ? (globalSettings?.baseFontSize || 14) - 2 : globalSettings?.baseFontSize || 14}px`,
            lineHeight: globalSettings?.lineHeight || 1.6,
            color: isSidebar ? "#fff" : "inherit"
          },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
        }
      )
    ] }, edu.id)) })
  ] });
};
const ProjectSection$5 = ({ projects, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleProjects = projects?.filter((p) => p.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "projects", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$5, { type: "projects", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleProjects.map((project) => /* @__PURE__ */ jsxs(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: cn("flex items-center gap-2 truncate", flexLayout ? "" : "flex-1"), children: /* @__PURE__ */ jsx("h3", { className: "font-bold truncate", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.name }) }),
        project.link && !centerSubtitle && /* @__PURE__ */ jsx(
          "a",
          {
            href: project.link.startsWith("http") ? project.link : `https://${project.link}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: cn("underline truncate shrink", flexLayout ? "" : "flex-1"),
            title: project.link,
            children: (() => {
              try {
                return new URL(project.link.startsWith("http") ? project.link : `https://${project.link}`).hostname.replace(/^www\./, "");
              } catch {
                return project.link;
              }
            })()
          }
        ),
        !project.link && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: cn("text-subtitleFont truncate", flexLayout ? "ml-[16px]" : "flex-1"), style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
        /* @__PURE__ */ jsx("div", { className: cn("text-subtitleFont shrink-0 whitespace-nowrap", flexLayout ? "ml-auto" : "text-right"), style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(project.date, locale) })
      ] }),
      project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
      project.link && centerSubtitle && /* @__PURE__ */ jsx("a", { href: project.link.startsWith("http") ? project.link : `https://${project.link}`, target: "_blank", rel: "noopener noreferrer", className: "underline", title: project.link, children: project.link }),
      project.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
        }
      )
    ] }, project.id)) }) })
  ] });
};
const SkillSection$5 = ({ skill, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "skills", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$5, { type: "skills", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
      }
    ) })
  ] });
};
const SelfEvaluationSection$5 = ({ content, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "selfEvaluation", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$5, { type: "selfEvaluation", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
      }
    ) })
  ] });
};
const CustomSection$5 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId, style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$5, { title, type: "custom", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: cn("flex items-center gap-2 truncate", flexLayout ? "" : "flex-1"), children: /* @__PURE__ */ jsx("h4", { className: "font-bold truncate", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.title }) }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: cn("text-subtitleFont truncate", flexLayout ? "ml-[16px]" : "flex-1"), style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
        /* @__PURE__ */ jsx("span", { className: cn("text-subtitleFont shrink-0 whitespace-nowrap", flexLayout ? "ml-auto" : "text-right"), style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(item.dateRange, locale) })
      ] }),
      !centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
      item.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
        }
      )
    ] }, item.id)) })
  ] });
};
const ModernTemplate = ({ data, template }) => {
  const { colorScheme } = template;
  const enabledSections = data.menuSections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case "basic":
        return /* @__PURE__ */ jsx(BaseInfo$5, { basic: data.basic, globalSettings: data.globalSettings, template });
      case "experience":
        return /* @__PURE__ */ jsx(ExperienceSection$5, { experiences: data.experience, globalSettings: data.globalSettings });
      case "education":
        return /* @__PURE__ */ jsx(EducationSection$5, { education: data.education, globalSettings: data.globalSettings });
      case "skills":
        return /* @__PURE__ */ jsx(SkillSection$5, { skill: data.skillContent, globalSettings: data.globalSettings });
      case "projects":
        return /* @__PURE__ */ jsx(ProjectSection$5, { projects: data.projects, globalSettings: data.globalSettings });
      case "certificates":
        return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "certificates", style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` }, children: [
          /* @__PURE__ */ jsx(SectionTitle$5, { type: "certificates", globalSettings: data.globalSettings }),
          /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })
        ] });
      case "selfEvaluation":
        return /* @__PURE__ */ jsx(SelfEvaluationSection$5, { content: data.selfEvaluationContent, globalSettings: data.globalSettings });
      default:
        if (sectionId in data.customData) {
          const title = data.menuSections.find((s) => s.id === sectionId)?.title || sectionId;
          return /* @__PURE__ */ jsx(CustomSection$5, { title, sectionId, items: data.customData[sectionId], globalSettings: data.globalSettings });
        }
        return null;
    }
  };
  const basicSection = enabledSections.find((s) => s.id === "basic");
  const educationSection = enabledSections.find((s) => s.id === "education");
  const otherSections = enabledSections.filter((s) => s.id !== "basic" && s.id !== "education");
  return /* @__PURE__ */ jsx(
    "table",
    {
      className: "w-full border-collapse",
      style: {
        height: `calc(297mm - ${(data.globalSettings?.pagePadding || 32) * 2}px)`,
        tableLayout: "fixed"
      },
      children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsxs(
          "td",
          {
            className: "p-4 align-top relative",
            style: {
              width: "33.333333%",
              backgroundColor: data.globalSettings.themeColor,
              color: "#ffffff",
              paddingTop: data.globalSettings.sectionSpacing
            },
            children: [
              basicSection && renderSection(basicSection.id),
              educationSection && /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(EducationSection$5, { education: data.education, globalSettings: data.globalSettings, variant: "sidebar" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "td",
          {
            className: "p-4 pt-0 align-top relative",
            style: {
              width: "66.666667%",
              backgroundColor: colorScheme.background,
              color: colorScheme.text
            },
            children: otherSections.map((section) => /* @__PURE__ */ jsx("div", { children: renderSection(section.id) }, section.id))
          }
        )
      ] }) })
    }
  );
};
const BaseInfo$4 = ({ basic = {}, globalSettings, template }) => {
  const t = useTranslations("workbench");
  const locale = useLocale();
  const useIconMode = globalSettings?.useIconMode ?? false;
  const layout = basic?.layout || "left";
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "w-4 h-4" }) : null;
  };
  const getOrderedFields = React__default.useMemo(() => {
    if (!basic.fieldOrder) {
      return [{ key: "email", value: basic.email, icon: basic.icons?.email || "Mail", label: "电子邮箱", visible: true, custom: false }].filter((item) => Boolean(item.value && item.visible));
    }
    return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
      key: field.key,
      value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
      icon: basic.icons?.[field.key] || "User",
      label: field.label,
      visible: field.visible,
      custom: field.custom
    })).filter((item) => Boolean(item.value));
  }, [basic]);
  const allFields = [
    ...getOrderedFields,
    ...basic.customFields?.filter((field) => field.visible !== false).map((field) => ({
      key: field.id,
      value: field.value,
      icon: field.icon,
      label: field.label,
      visible: true,
      custom: true
    })) || []
  ];
  const nameField = basic.fieldOrder?.find((f) => f.key === "name") || { key: "name", visible: true };
  const titleField = basic.fieldOrder?.find((f) => f.key === "title") || { key: "title", visible: true };
  const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx("div", { style: { width: `${basic.photoConfig?.width || 100}px`, height: `${basic.photoConfig?.height || 100}px`, borderRadius: getBorderRadiusValue(basic.photoConfig || { borderRadius: "none", customBorderRadius: 0 }), overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: basic.photo, alt: `${basic.name}'s photo`, className: "w-full h-full object-cover" }) }) });
  const layoutStyles = {
    left: { container: "flex items-center justify-between gap-6", leftContent: "flex items-center gap-6 flex-1 min-w-0", fields: "grid grid-cols-2 gap-x-8 gap-y-2 justify-start shrink-0", nameTitle: "text-left min-w-0" },
    right: { container: "flex items-center justify-between gap-6 flex-row-reverse", leftContent: "flex justify-end items-center gap-6 flex-1 min-w-0", fields: "grid grid-cols-2 gap-x-8 gap-y-2 justify-start shrink-0", nameTitle: "text-right min-w-0" },
    center: { container: "flex flex-col items-center gap-3", leftContent: "flex flex-col items-center gap-4", fields: "w-full flex justify-start items-center flex-wrap gap-3", nameTitle: "text-center min-w-0" }
  };
  const styles = layoutStyles[layout] || layoutStyles.left;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "basic", children: [
    /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
      /* @__PURE__ */ jsxs("div", { className: styles.leftContent, children: [
        PhotoComponent,
        /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col", styles.nameTitle), children: [
          nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, { layout: "position", className: "font-bold whitespace-pre-wrap break-words", style: { fontSize: "30px" }, children: basic[nameField.key] }),
          titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, { layout: "position", className: "whitespace-pre-wrap break-words", style: { fontSize: "18px" }, children: basic[titleField.key] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { layout: "position", className: styles.fields, style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, color: "rgb(75, 85, 99)", maxWidth: layout === "center" ? "none" : "600px" }, children: allFields.map((item) => /* @__PURE__ */ jsx(motion.div, { className: "flex items-center whitespace-nowrap overflow-hidden text-baseFont", children: useIconMode ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        getIcon(item.icon),
        item.key === "email" ? /* @__PURE__ */ jsx("a", { href: `mailto:${item.value}`, className: "underline", children: item.value }) : /* @__PURE__ */ jsx("span", { children: item.value })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-hidden", children: [
        !item.custom && /* @__PURE__ */ jsxs("span", { children: [
          t(`basicPanel.basicFields.${item.key}`),
          ":"
        ] }),
        item.custom && /* @__PURE__ */ jsxs("span", { children: [
          item.label,
          ":"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "truncate", suppressHydrationWarning: true, children: item.value })
      ] }) }, item.key)) })
    ] }),
    basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, { className: "mt-2", githubKey: basic.githubKey, username: basic.githubUseName })
  ] });
};
const SectionTitle$4 = ({ type, title, globalSettings, showTitle = true }) => {
  const { activeResume } = useResumeStore();
  const templateContext = useTemplateContext();
  const menuSections = templateContext?.menuSections ?? activeResume?.menuSections ?? [];
  const renderTitle = useMemo(() => {
    if (type === "custom") return title;
    return menuSections.find((s) => s.id === type)?.title;
  }, [menuSections, type, title]);
  const themeColor = globalSettings?.themeColor;
  if (!showTitle) return null;
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { backgroundColor: themeColor, opacity: 0.1 } }),
    /* @__PURE__ */ jsx(
      "h3",
      {
        className: "pl-4 py-1 flex items-center relative font-bold",
        style: {
          fontSize: `${globalSettings?.headerSize || 18}px`,
          color: themeColor,
          borderLeft: `3px solid ${themeColor}`,
          marginBottom: `${globalSettings?.paragraphSpacing}px`
        },
        children: renderTitle
      }
    )
  ] });
};
const ExperienceSection$4 = ({ experiences, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleExperiences = experiences?.filter((exp) => exp.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "experience", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$4, { type: "experience", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.company }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
        /* @__PURE__ */ jsx("div", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(exp.date, locale) })
      ] }),
      exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
      exp.details && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "mt-1 text-baseFont",
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 }
        }
      )
    ] }, exp.id)) })
  ] });
};
const EducationSection$4 = ({ education, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleEducation = education?.filter((edu) => edu.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "education", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$4, { type: "education", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: edu.school }),
        centerSubtitle && /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: [
          [edu.major, edu.degree].filter(Boolean).join(" · "),
          edu.gpa && ` · GPA ${edu.gpa}`
        ] }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
            suppressHydrationWarning: true,
            style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
            children: `${formatDateString(edu.startDate, locale)} - ${formatDateString(edu.endDate, locale)}`
          }
        )
      ] }),
      !centerSubtitle && /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: [
        [edu.major, edu.degree].filter(Boolean).join(" · "),
        edu.gpa && ` · GPA ${edu.gpa}`
      ] }),
      hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
        }
      )
    ] }, edu.id)) })
  ] });
};
const ProjectSection$4 = ({ projects, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleProjects = projects?.filter((p) => p.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "projects", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$4, { type: "projects", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleProjects.map((project) => /* @__PURE__ */ jsxs(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`, children: /* @__PURE__ */ jsx("h3", { className: "font-bold", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.name }) }),
        project.link && !centerSubtitle && /* @__PURE__ */ jsx(
          "a",
          {
            href: project.link.startsWith("http") ? project.link : `https://${project.link}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: `underline ${flexLayout ? "" : "flex-1"}`,
            title: project.link,
            children: (() => {
              try {
                return new URL(project.link.startsWith("http") ? project.link : `https://${project.link}`).hostname.replace(/^www\./, "");
              } catch {
                return project.link;
              }
            })()
          }
        ),
        !project.link && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
        /* @__PURE__ */ jsx("div", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(project.date, locale) })
      ] }),
      project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
      project.link && centerSubtitle && /* @__PURE__ */ jsx("a", { href: project.link.startsWith("http") ? project.link : `https://${project.link}`, target: "_blank", rel: "noopener noreferrer", className: "underline", title: project.link, children: project.link }),
      project.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
        }
      )
    ] }, project.id)) }) })
  ] });
};
const SkillSection$4 = ({ skill, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "skills", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$4, { type: "skills", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
      }
    ) })
  ] });
};
const SelfEvaluationSection$4 = ({ content, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "selfEvaluation", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$4, { type: "selfEvaluation", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
      }
    ) })
  ] });
};
const CustomSection$4 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId, style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$4, { title, type: "custom", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`, children: /* @__PURE__ */ jsx("h4", { className: "font-bold", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.title }) }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
        /* @__PURE__ */ jsx("span", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(item.dateRange, locale) })
      ] }),
      !centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
      item.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
        }
      )
    ] }, item.id)) })
  ] });
};
const LeftRightTemplate = ({ data, template }) => {
  const { colorScheme } = template;
  const enabledSections = data.menuSections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case "basic":
        return /* @__PURE__ */ jsx(BaseInfo$4, { basic: data.basic, globalSettings: data.globalSettings, template });
      case "experience":
        return /* @__PURE__ */ jsx(ExperienceSection$4, { experiences: data.experience, globalSettings: data.globalSettings });
      case "education":
        return /* @__PURE__ */ jsx(EducationSection$4, { education: data.education, globalSettings: data.globalSettings });
      case "skills":
        return /* @__PURE__ */ jsx(SkillSection$4, { skill: data.skillContent, globalSettings: data.globalSettings });
      case "projects":
        return /* @__PURE__ */ jsx(ProjectSection$4, { projects: data.projects, globalSettings: data.globalSettings });
      case "certificates":
        return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "certificates", style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` }, children: [
          /* @__PURE__ */ jsx(SectionTitle$4, { type: "certificates", globalSettings: data.globalSettings }),
          /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })
        ] });
      case "selfEvaluation":
        return /* @__PURE__ */ jsx(SelfEvaluationSection$4, { content: data.selfEvaluationContent, globalSettings: data.globalSettings });
      default:
        if (sectionId in data.customData) {
          const title = data.menuSections.find((s) => s.id === sectionId)?.title || sectionId;
          return /* @__PURE__ */ jsx(CustomSection$4, { title, sectionId, items: data.customData[sectionId], globalSettings: data.globalSettings });
        }
        return null;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full", style: { backgroundColor: colorScheme.background, color: colorScheme.text }, children: enabledSections.map((section) => /* @__PURE__ */ jsx("div", { children: renderSection(section.id) }, section.id)) });
};
const BaseInfo$3 = ({ basic = {}, globalSettings, template }) => {
  const t = useTranslations("workbench");
  const locale = useLocale();
  const useIconMode = globalSettings?.useIconMode ?? false;
  const layout = basic?.layout || "left";
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "w-4 h-4" }) : null;
  };
  const getOrderedFields = React__default.useMemo(() => {
    if (!basic.fieldOrder) {
      return [{ key: "email", value: basic.email, icon: basic.icons?.email || "Mail", label: "电子邮箱", visible: true, custom: false }].filter((item) => Boolean(item.value && item.visible));
    }
    return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
      key: field.key,
      value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
      icon: basic.icons?.[field.key] || "User",
      label: field.label,
      visible: field.visible,
      custom: field.custom
    })).filter((item) => Boolean(item.value));
  }, [basic]);
  const allFields = [
    ...getOrderedFields,
    ...basic.customFields?.filter((field) => field.visible !== false).map((field) => ({
      key: field.id,
      value: field.value,
      icon: field.icon,
      label: field.label,
      visible: true,
      custom: true
    })) || []
  ];
  const nameField = basic.fieldOrder?.find((f) => f.key === "name") || { key: "name", visible: true };
  const titleField = basic.fieldOrder?.find((f) => f.key === "title") || { key: "title", visible: true };
  const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx("div", { style: { width: `${basic.photoConfig?.width || 100}px`, height: `${basic.photoConfig?.height || 100}px`, borderRadius: getBorderRadiusValue(basic.photoConfig || { borderRadius: "none", customBorderRadius: 0 }), overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: basic.photo, alt: `${basic.name}'s photo`, className: "w-full h-full object-cover" }) }) });
  const layoutStyles = {
    left: { container: "flex items-center justify-between gap-6", leftContent: "flex items-center gap-6 flex-1 min-w-0", fields: "grid grid-cols-2 gap-x-8 gap-y-2 justify-start shrink-0", nameTitle: "text-left min-w-0" },
    right: { container: "flex items-center justify-between gap-6 flex-row-reverse", leftContent: "flex justify-end items-center gap-6 flex-1 min-w-0", fields: "grid grid-cols-2 gap-x-8 gap-y-2 justify-start shrink-0", nameTitle: "text-right min-w-0" },
    center: { container: "flex flex-col items-center gap-3", leftContent: "flex flex-col items-center gap-4", fields: "w-full flex justify-start items-center flex-wrap gap-3", nameTitle: "text-center min-w-0" }
  };
  const styles = layoutStyles[layout] || layoutStyles.left;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "basic", children: [
    /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
      /* @__PURE__ */ jsxs("div", { className: styles.leftContent, children: [
        PhotoComponent,
        /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col", styles.nameTitle), children: [
          nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, { layout: "position", className: "font-bold whitespace-pre-wrap break-words", style: { fontSize: "30px" }, children: basic[nameField.key] }),
          titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, { layout: "position", className: "whitespace-pre-wrap break-words", style: { fontSize: "18px" }, children: basic[titleField.key] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { layout: "position", className: styles.fields, style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, color: "rgb(75, 85, 99)", maxWidth: layout === "center" ? "none" : "600px" }, children: allFields.map((item) => /* @__PURE__ */ jsx(motion.div, { className: "flex items-center whitespace-nowrap overflow-hidden text-baseFont", children: useIconMode ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        getIcon(item.icon),
        item.key === "email" ? /* @__PURE__ */ jsx("a", { href: `mailto:${item.value}`, className: "underline", children: item.value }) : /* @__PURE__ */ jsx("span", { children: item.value })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-hidden", children: [
        !item.custom && /* @__PURE__ */ jsxs("span", { children: [
          t(`basicPanel.basicFields.${item.key}`),
          ":"
        ] }),
        item.custom && /* @__PURE__ */ jsxs("span", { children: [
          item.label,
          ":"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "truncate", suppressHydrationWarning: true, children: item.value })
      ] }) }, item.key)) })
    ] }),
    basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, { className: "mt-2", githubKey: basic.githubKey, username: basic.githubUseName })
  ] });
};
const SectionTitle$3 = ({ type, title, globalSettings, showTitle = true }) => {
  const { activeResume } = useResumeStore();
  const templateContext = useTemplateContext();
  const menuSections = templateContext?.menuSections ?? activeResume?.menuSections ?? [];
  const renderTitle = useMemo(() => {
    if (type === "custom") return title;
    return menuSections.find((s) => s.id === type)?.title;
  }, [menuSections, type, title]);
  const themeColor = globalSettings?.themeColor;
  if (!showTitle) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "text-xl font-bold mb-4",
      style: {
        color: themeColor,
        fontSize: `${globalSettings?.headerSize || 20}px`
      },
      children: renderTitle
    }
  );
};
const ExperienceSection$3 = ({ experiences, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleExperiences = experiences?.filter((exp) => exp.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "experience", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$3, { type: "experience", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.company }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
        /* @__PURE__ */ jsx("div", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(exp.date, locale) })
      ] }),
      exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
      exp.details && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "mt-1 text-baseFont",
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 }
        }
      )
    ] }, exp.id)) })
  ] });
};
const EducationSection$3 = ({ education, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleEducation = education?.filter((edu) => edu.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "education", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$3, { type: "education", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: edu.school }),
        centerSubtitle && /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: [
          [edu.major, edu.degree].filter(Boolean).join(" · "),
          edu.gpa && ` · GPA ${edu.gpa}`
        ] }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
            suppressHydrationWarning: true,
            style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
            children: `${formatDateString(edu.startDate, locale)} - ${formatDateString(edu.endDate, locale)}`
          }
        )
      ] }),
      !centerSubtitle && /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: [
        [edu.major, edu.degree].filter(Boolean).join(" · "),
        edu.gpa && ` · GPA ${edu.gpa}`
      ] }),
      hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
        }
      )
    ] }, edu.id)) })
  ] });
};
const ProjectSection$3 = ({ projects, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleProjects = projects?.filter((p) => p.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "projects", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$3, { type: "projects", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleProjects.map((project) => /* @__PURE__ */ jsxs(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`, children: /* @__PURE__ */ jsx("h3", { className: "font-bold", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.name }) }),
        project.link && !centerSubtitle && /* @__PURE__ */ jsx(
          "a",
          {
            href: project.link.startsWith("http") ? project.link : `https://${project.link}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: `underline ${flexLayout ? "" : "flex-1"}`,
            title: project.link,
            children: (() => {
              try {
                return new URL(project.link.startsWith("http") ? project.link : `https://${project.link}`).hostname.replace(/^www\./, "");
              } catch {
                return project.link;
              }
            })()
          }
        ),
        !project.link && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
        /* @__PURE__ */ jsx("div", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(project.date, locale) })
      ] }),
      project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
      project.link && centerSubtitle && /* @__PURE__ */ jsx("a", { href: project.link.startsWith("http") ? project.link : `https://${project.link}`, target: "_blank", rel: "noopener noreferrer", className: "underline", title: project.link, children: project.link }),
      project.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
        }
      )
    ] }, project.id)) }) })
  ] });
};
const SkillSection$3 = ({ skill, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "skills", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$3, { type: "skills", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
      }
    ) })
  ] });
};
const SelfEvaluationSection$3 = ({ content, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "selfEvaluation", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$3, { type: "selfEvaluation", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
      }
    ) })
  ] });
};
const CustomSection$3 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId, style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$3, { title, type: "custom", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`, children: /* @__PURE__ */ jsx("h4", { className: "font-bold", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.title }) }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
        /* @__PURE__ */ jsx("span", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(item.dateRange, locale) })
      ] }),
      !centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
      item.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
        }
      )
    ] }, item.id)) })
  ] });
};
const TimelineTemplate = ({ data, template }) => {
  const { colorScheme } = template;
  const enabledSections = data.menuSections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  const renderTimelineItem = (content, title) => /* @__PURE__ */ jsxs("div", { className: "relative pl-6", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-2 h-full w-0.5", style: { backgroundColor: "#e5e7eb" } }),
    /* @__PURE__ */ jsx("div", { className: "absolute left-[-6px] top-2 w-3 h-3 rounded-full", style: { backgroundColor: colorScheme.primary } }),
    /* @__PURE__ */ jsx("div", { className: "text-xl font-bold mb-4", style: { color: data.globalSettings.themeColor, fontSize: `${data.globalSettings.headerSize || 20}px` }, children: title }),
    /* @__PURE__ */ jsx("div", { children: content })
  ] });
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case "basic":
        return /* @__PURE__ */ jsx(BaseInfo$3, { basic: data.basic, globalSettings: data.globalSettings, template });
      case "experience":
        return /* @__PURE__ */ jsx(ExperienceSection$3, { experiences: data.experience, globalSettings: data.globalSettings, showTitle: false });
      case "education":
        return /* @__PURE__ */ jsx(EducationSection$3, { education: data.education, globalSettings: data.globalSettings, showTitle: false });
      case "skills":
        return /* @__PURE__ */ jsx(SkillSection$3, { skill: data.skillContent, globalSettings: data.globalSettings, showTitle: false });
      case "projects":
        return /* @__PURE__ */ jsx(ProjectSection$3, { projects: data.projects, globalSettings: data.globalSettings, showTitle: false });
      case "certificates":
        return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "certificates", style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` }, children: [
          /* @__PURE__ */ jsx(SectionTitle$3, { type: "certificates", globalSettings: data.globalSettings }),
          /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })
        ] });
      case "selfEvaluation":
        return /* @__PURE__ */ jsx(SelfEvaluationSection$3, { content: data.selfEvaluationContent, globalSettings: data.globalSettings, showTitle: false });
      default:
        if (sectionId in data.customData) {
          const title = data.menuSections.find((s) => s.id === sectionId)?.title || sectionId;
          return /* @__PURE__ */ jsx(CustomSection$3, { title, sectionId, items: data.customData[sectionId], globalSettings: data.globalSettings, showTitle: false });
        }
        return null;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full min-h-screen pl-[6px]", style: { backgroundColor: colorScheme.background, color: colorScheme.text }, children: enabledSections.map((section) => {
    if (section.id === "basic") {
      return /* @__PURE__ */ jsx("div", { className: "mb-4", children: renderSection(section.id) }, section.id);
    }
    const sectionTitle = data.menuSections.find((s) => s.id === section.id)?.title || section.id;
    return /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("div", { className: "timeline-section", children: renderTimelineItem(renderSection(section.id), sectionTitle) }) }, section.id);
  }) });
};
const BaseInfo$2 = ({ basic = {}, globalSettings, template }) => {
  const t = useTranslations("workbench");
  const locale = useLocale();
  const useIconMode = globalSettings?.useIconMode ?? false;
  const layout = basic?.layout || "left";
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "w-4 h-4" }) : null;
  };
  const getOrderedFields = React__default.useMemo(() => {
    if (!basic.fieldOrder) {
      return [{ key: "email", value: basic.email, icon: basic.icons?.email || "Mail", label: "电子邮箱", visible: true, custom: false }].filter((item) => Boolean(item.value && item.visible));
    }
    return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
      key: field.key,
      value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
      icon: basic.icons?.[field.key] || "User",
      label: field.label,
      visible: field.visible,
      custom: field.custom
    })).filter((item) => Boolean(item.value));
  }, [basic]);
  const allFields = [
    ...getOrderedFields,
    ...basic.customFields?.filter((field) => field.visible !== false).map((field) => ({
      key: field.id,
      value: field.value,
      icon: field.icon,
      label: field.label,
      visible: true,
      custom: true
    })) || []
  ];
  const nameField = basic.fieldOrder?.find((f) => f.key === "name") || { key: "name", visible: true };
  const titleField = basic.fieldOrder?.find((f) => f.key === "title") || { key: "title", visible: true };
  const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx("div", { style: { width: `${basic.photoConfig?.width || 100}px`, height: `${basic.photoConfig?.height || 100}px`, borderRadius: getBorderRadiusValue(basic.photoConfig || { borderRadius: "none", customBorderRadius: 0 }), overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: basic.photo, alt: `${basic.name}'s photo`, className: "w-full h-full object-cover" }) }) });
  const layoutStyles = {
    left: { container: "flex items-center justify-between gap-6", leftContent: "flex items-center gap-6 flex-1 min-w-0", fields: "grid grid-cols-2 gap-x-8 gap-y-2 justify-start shrink-0", nameTitle: "text-left min-w-0" },
    right: { container: "flex items-center justify-between gap-6 flex-row-reverse", leftContent: "flex justify-end items-center gap-6 flex-1 min-w-0", fields: "grid grid-cols-2 gap-x-8 gap-y-2 justify-start shrink-0", nameTitle: "text-right min-w-0" },
    center: { container: "flex flex-col items-center gap-3", leftContent: "flex flex-col items-center gap-4", fields: "w-full flex justify-start items-center flex-wrap gap-3", nameTitle: "text-center min-w-0" }
  };
  const styles = layoutStyles[layout] || layoutStyles.left;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "basic", children: [
    /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
      /* @__PURE__ */ jsxs("div", { className: styles.leftContent, children: [
        PhotoComponent,
        /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col", styles.nameTitle), children: [
          nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, { layout: "position", className: "font-bold whitespace-pre-wrap break-words", style: { fontSize: "30px" }, children: basic[nameField.key] }),
          titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, { layout: "position", className: "whitespace-pre-wrap break-words", style: { fontSize: "18px" }, children: basic[titleField.key] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { layout: "position", className: styles.fields, style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, color: "rgb(75, 85, 99)", maxWidth: layout === "center" ? "none" : "600px" }, children: allFields.map((item) => /* @__PURE__ */ jsx(motion.div, { className: "flex items-center whitespace-nowrap overflow-hidden text-baseFont", children: useIconMode ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        getIcon(item.icon),
        item.key === "email" ? /* @__PURE__ */ jsx("a", { href: `mailto:${item.value}`, className: "underline", children: item.value }) : /* @__PURE__ */ jsx("span", { children: item.value })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-hidden", children: [
        !item.custom && /* @__PURE__ */ jsxs("span", { children: [
          t(`basicPanel.basicFields.${item.key}`),
          ":"
        ] }),
        item.custom && /* @__PURE__ */ jsxs("span", { children: [
          item.label,
          ":"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "truncate", suppressHydrationWarning: true, children: item.value })
      ] }) }, item.key)) })
    ] }),
    basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, { className: "mt-2", githubKey: basic.githubKey, username: basic.githubUseName })
  ] });
};
const SectionTitle$2 = ({ type, title, globalSettings, showTitle = true }) => {
  const { activeResume } = useResumeStore();
  const templateContext = useTemplateContext();
  const menuSections = templateContext?.menuSections ?? activeResume?.menuSections ?? [];
  const renderTitle = useMemo(() => {
    if (type === "custom") return title;
    return menuSections.find((s) => s.id === type)?.title;
  }, [menuSections, type, title]);
  const themeColor = globalSettings?.themeColor;
  if (!showTitle) return null;
  return /* @__PURE__ */ jsx(
    "h3",
    {
      className: "pb-1 mb-2 tracking-widest uppercase font-bold",
      style: {
        fontSize: `${globalSettings?.headerSize || 16}px`,
        color: themeColor,
        marginBottom: `${globalSettings?.paragraphSpacing}px`
      },
      children: renderTitle
    }
  );
};
const ExperienceSection$2 = ({ experiences, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleExperiences = experiences?.filter((exp) => exp.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "experience", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$2, { type: "experience", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.company }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
        /* @__PURE__ */ jsx("div", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(exp.date, locale) })
      ] }),
      exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
      exp.details && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "mt-1 text-baseFont",
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 }
        }
      )
    ] }, exp.id)) })
  ] });
};
const EducationSection$2 = ({ education, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleEducation = education?.filter((edu) => edu.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "education", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$2, { type: "education", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: edu.school }),
        centerSubtitle && /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: [
          [edu.major, edu.degree].filter(Boolean).join(" · "),
          edu.gpa && ` · GPA ${edu.gpa}`
        ] }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
            suppressHydrationWarning: true,
            style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
            children: `${formatDateString(edu.startDate, locale)} - ${formatDateString(edu.endDate, locale)}`
          }
        )
      ] }),
      !centerSubtitle && /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: [
        [edu.major, edu.degree].filter(Boolean).join(" · "),
        edu.gpa && ` · GPA ${edu.gpa}`
      ] }),
      hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
        }
      )
    ] }, edu.id)) })
  ] });
};
const ProjectSection$2 = ({ projects, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleProjects = projects?.filter((p) => p.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "projects", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$2, { type: "projects", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleProjects.map((project) => /* @__PURE__ */ jsxs(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`, children: /* @__PURE__ */ jsx("h3", { className: "font-bold", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.name }) }),
        project.link && !centerSubtitle && /* @__PURE__ */ jsx(
          "a",
          {
            href: project.link.startsWith("http") ? project.link : `https://${project.link}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: `underline ${flexLayout ? "" : "flex-1"}`,
            title: project.link,
            children: (() => {
              try {
                return new URL(project.link.startsWith("http") ? project.link : `https://${project.link}`).hostname.replace(/^www\./, "");
              } catch {
                return project.link;
              }
            })()
          }
        ),
        !project.link && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
        /* @__PURE__ */ jsx("div", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(project.date, locale) })
      ] }),
      project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
      project.link && centerSubtitle && /* @__PURE__ */ jsx("a", { href: project.link.startsWith("http") ? project.link : `https://${project.link}`, target: "_blank", rel: "noopener noreferrer", className: "underline", title: project.link, children: project.link }),
      project.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
        }
      )
    ] }, project.id)) }) })
  ] });
};
const SkillSection$2 = ({ skill, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "skills", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$2, { type: "skills", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
      }
    ) })
  ] });
};
const SelfEvaluationSection$2 = ({ content, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "selfEvaluation", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$2, { type: "selfEvaluation", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
      }
    ) })
  ] });
};
const CustomSection$2 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId, style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$2, { title, type: "custom", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`, children: /* @__PURE__ */ jsx("h4", { className: "font-bold", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.title }) }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
        /* @__PURE__ */ jsx("span", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(item.dateRange, locale) })
      ] }),
      !centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
      item.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
        }
      )
    ] }, item.id)) })
  ] });
};
const MinimalistTemplate = ({ data, template }) => {
  const { colorScheme } = template;
  const enabledSections = data.menuSections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case "basic":
        return /* @__PURE__ */ jsx(BaseInfo$2, { basic: data.basic, globalSettings: data.globalSettings, template });
      case "experience":
        return /* @__PURE__ */ jsx(ExperienceSection$2, { experiences: data.experience, globalSettings: data.globalSettings });
      case "education":
        return /* @__PURE__ */ jsx(EducationSection$2, { education: data.education, globalSettings: data.globalSettings });
      case "skills":
        return /* @__PURE__ */ jsx(SkillSection$2, { skill: data.skillContent, globalSettings: data.globalSettings });
      case "projects":
        return /* @__PURE__ */ jsx(ProjectSection$2, { projects: data.projects, globalSettings: data.globalSettings });
      case "certificates":
        return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "certificates", style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` }, children: [
          /* @__PURE__ */ jsx(SectionTitle$2, { type: "certificates", globalSettings: data.globalSettings }),
          /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })
        ] });
      case "selfEvaluation":
        return /* @__PURE__ */ jsx(SelfEvaluationSection$2, { content: data.selfEvaluationContent, globalSettings: data.globalSettings });
      default:
        if (sectionId in data.customData) {
          const title = data.menuSections.find((s) => s.id === sectionId)?.title || sectionId;
          return /* @__PURE__ */ jsx(CustomSection$2, { title, sectionId, items: data.customData[sectionId], globalSettings: data.globalSettings });
        }
        return null;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full min-h-screen", style: { backgroundColor: colorScheme.background, color: colorScheme.text }, children: enabledSections.map((section) => /* @__PURE__ */ jsx("div", { className: "w-full", children: renderSection(section.id) }, section.id)) });
};
const BaseInfo$1 = ({ basic = {}, globalSettings, template }) => {
  const t = useTranslations("workbench");
  const locale = useLocale();
  const useIconMode = globalSettings?.useIconMode ?? false;
  const layout = basic?.layout || "left";
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "w-4 h-4" }) : null;
  };
  const getOrderedFields = React__default.useMemo(() => {
    if (!basic.fieldOrder) {
      return [{ key: "email", value: basic.email, icon: basic.icons?.email || "Mail", label: "电子邮箱", visible: true, custom: false }].filter((item) => Boolean(item.value && item.visible));
    }
    return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
      key: field.key,
      value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
      icon: basic.icons?.[field.key] || "User",
      label: field.label,
      visible: field.visible,
      custom: field.custom
    })).filter((item) => Boolean(item.value));
  }, [basic]);
  const allFields = [
    ...getOrderedFields,
    ...basic.customFields?.filter((field) => field.visible !== false).map((field) => ({
      key: field.id,
      value: field.value,
      icon: field.icon,
      label: field.label,
      visible: true,
      custom: true
    })) || []
  ];
  const nameField = basic.fieldOrder?.find((f) => f.key === "name") || { key: "name", visible: true };
  const titleField = basic.fieldOrder?.find((f) => f.key === "title") || { key: "title", visible: true };
  const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx("div", { style: { width: `${basic.photoConfig?.width || 100}px`, height: `${basic.photoConfig?.height || 100}px`, borderRadius: getBorderRadiusValue(basic.photoConfig || { borderRadius: "none", customBorderRadius: 0 }), overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: basic.photo, alt: `${basic.name}'s photo`, className: "w-full h-full object-cover" }) }) });
  const layoutStyles = {
    left: { container: "flex items-center justify-between gap-6", leftContent: "flex items-center gap-6 flex-1 min-w-0", fields: "grid grid-cols-2 gap-x-8 gap-y-2 justify-start shrink-0", nameTitle: "text-left min-w-0" },
    right: { container: "flex items-center justify-between gap-6 flex-row-reverse", leftContent: "flex justify-end items-center gap-6 flex-1 min-w-0", fields: "grid grid-cols-2 gap-x-8 gap-y-2 justify-start shrink-0", nameTitle: "text-right min-w-0" },
    center: { container: "flex flex-col items-center gap-3", leftContent: "flex flex-col items-center gap-4", fields: "w-full flex justify-start items-center flex-wrap gap-3", nameTitle: "text-center min-w-0" }
  };
  const styles = layoutStyles[layout] || layoutStyles.left;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "basic", children: [
    /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
      /* @__PURE__ */ jsxs("div", { className: styles.leftContent, children: [
        PhotoComponent,
        /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col", styles.nameTitle), children: [
          nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, { layout: "position", className: "font-bold whitespace-pre-wrap break-words", style: { fontSize: "30px" }, children: basic[nameField.key] }),
          titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, { layout: "position", className: "whitespace-pre-wrap break-words", style: { fontSize: "18px" }, children: basic[titleField.key] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { layout: "position", className: styles.fields, style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, color: "rgb(75, 85, 99)", maxWidth: layout === "center" ? "none" : "600px" }, children: allFields.map((item) => /* @__PURE__ */ jsx(motion.div, { className: "flex items-center whitespace-nowrap overflow-hidden text-baseFont", children: useIconMode ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        getIcon(item.icon),
        item.key === "email" ? /* @__PURE__ */ jsx("a", { href: `mailto:${item.value}`, className: "underline", children: item.value }) : /* @__PURE__ */ jsx("span", { children: item.value })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-hidden", children: [
        !item.custom && /* @__PURE__ */ jsxs("span", { children: [
          t(`basicPanel.basicFields.${item.key}`),
          ":"
        ] }),
        item.custom && /* @__PURE__ */ jsxs("span", { children: [
          item.label,
          ":"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "truncate", suppressHydrationWarning: true, children: item.value })
      ] }) }, item.key)) })
    ] }),
    basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, { className: "mt-2", githubKey: basic.githubKey, username: basic.githubUseName })
  ] });
};
const SectionTitle$1 = ({ type, title, globalSettings, showTitle = true }) => {
  const { activeResume } = useResumeStore();
  const templateContext = useTemplateContext();
  const menuSections = templateContext?.menuSections ?? activeResume?.menuSections ?? [];
  const renderTitle = useMemo(() => {
    if (type === "custom") return title;
    return menuSections.find((s) => s.id === type)?.title;
  }, [menuSections, type, title]);
  const themeColor = globalSettings?.themeColor;
  if (!showTitle) return null;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center w-full mb-4 relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "w-full border-t", style: { borderColor: themeColor, opacity: 0.3 } }) }),
    /* @__PURE__ */ jsx(
      "h3",
      {
        className: "relative bg-white px-4 text-center font-bold",
        style: {
          fontSize: `${globalSettings?.headerSize || 20}px`,
          color: themeColor
        },
        children: renderTitle
      }
    )
  ] });
};
const ExperienceSection$1 = ({ experiences, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleExperiences = experiences?.filter((exp) => exp.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "experience", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$1, { type: "experience", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.company }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
        /* @__PURE__ */ jsx("div", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(exp.date, locale) })
      ] }),
      exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
      exp.details && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "mt-1 text-baseFont",
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 }
        }
      )
    ] }, exp.id)) })
  ] });
};
const EducationSection$1 = ({ education, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleEducation = education?.filter((edu) => edu.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "education", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$1, { type: "education", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: edu.school }),
        centerSubtitle && /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: [
          [edu.major, edu.degree].filter(Boolean).join(" · "),
          edu.gpa && ` · GPA ${edu.gpa}`
        ] }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
            suppressHydrationWarning: true,
            style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
            children: `${formatDateString(edu.startDate, locale)} - ${formatDateString(edu.endDate, locale)}`
          }
        )
      ] }),
      !centerSubtitle && /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: [
        [edu.major, edu.degree].filter(Boolean).join(" · "),
        edu.gpa && ` · GPA ${edu.gpa}`
      ] }),
      hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
        }
      )
    ] }, edu.id)) })
  ] });
};
const ProjectSection$1 = ({ projects, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleProjects = projects?.filter((p) => p.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "projects", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$1, { type: "projects", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleProjects.map((project) => /* @__PURE__ */ jsxs(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`, children: /* @__PURE__ */ jsx("h3", { className: "font-bold", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.name }) }),
        project.link && !centerSubtitle && /* @__PURE__ */ jsx(
          "a",
          {
            href: project.link.startsWith("http") ? project.link : `https://${project.link}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: `underline ${flexLayout ? "" : "flex-1"}`,
            title: project.link,
            children: (() => {
              try {
                return new URL(project.link.startsWith("http") ? project.link : `https://${project.link}`).hostname.replace(/^www\./, "");
              } catch {
                return project.link;
              }
            })()
          }
        ),
        !project.link && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
        /* @__PURE__ */ jsx("div", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(project.date, locale) })
      ] }),
      project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
      project.link && centerSubtitle && /* @__PURE__ */ jsx("a", { href: project.link.startsWith("http") ? project.link : `https://${project.link}`, target: "_blank", rel: "noopener noreferrer", className: "underline", title: project.link, children: project.link }),
      project.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
        }
      )
    ] }, project.id)) }) })
  ] });
};
const SkillSection$1 = ({ skill, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "skills", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$1, { type: "skills", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
      }
    ) })
  ] });
};
const SelfEvaluationSection$1 = ({ content, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "selfEvaluation", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$1, { type: "selfEvaluation", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
      }
    ) })
  ] });
};
const CustomSection$1 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId, style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle$1, { title, type: "custom", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`, children: /* @__PURE__ */ jsx("h4", { className: "font-bold", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.title }) }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
        /* @__PURE__ */ jsx("span", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(item.dateRange, locale) })
      ] }),
      !centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
      item.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
        }
      )
    ] }, item.id)) })
  ] });
};
const ElegantTemplate = ({ data, template }) => {
  const { colorScheme } = template;
  const enabledSections = data.menuSections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case "basic":
        return /* @__PURE__ */ jsx(BaseInfo$1, { basic: data.basic, globalSettings: data.globalSettings, template });
      case "experience":
        return /* @__PURE__ */ jsx(ExperienceSection$1, { experiences: data.experience, globalSettings: data.globalSettings });
      case "education":
        return /* @__PURE__ */ jsx(EducationSection$1, { education: data.education, globalSettings: data.globalSettings });
      case "skills":
        return /* @__PURE__ */ jsx(SkillSection$1, { skill: data.skillContent, globalSettings: data.globalSettings });
      case "projects":
        return /* @__PURE__ */ jsx(ProjectSection$1, { projects: data.projects, globalSettings: data.globalSettings });
      case "certificates":
        return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "certificates", style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` }, children: [
          /* @__PURE__ */ jsx(SectionTitle$1, { type: "certificates", globalSettings: data.globalSettings }),
          /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })
        ] });
      case "selfEvaluation":
        return /* @__PURE__ */ jsx(SelfEvaluationSection$1, { content: data.selfEvaluationContent, globalSettings: data.globalSettings });
      default:
        if (sectionId in data.customData) {
          const title = data.menuSections.find((s) => s.id === sectionId)?.title || sectionId;
          return /* @__PURE__ */ jsx(CustomSection$1, { title, sectionId, items: data.customData[sectionId], globalSettings: data.globalSettings });
        }
        return null;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full min-h-screen items-center", style: { backgroundColor: colorScheme.background, color: colorScheme.text }, children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-4xl px-8", children: enabledSections.map((section) => /* @__PURE__ */ jsx("div", { className: "w-full", children: renderSection(section.id) }, section.id)) }) });
};
const BaseInfo = ({ basic = {}, globalSettings, template }) => {
  const t = useTranslations("workbench");
  const locale = useLocale();
  const useIconMode = globalSettings?.useIconMode ?? false;
  const layout = basic?.layout || "left";
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "w-4 h-4" }) : null;
  };
  const getOrderedFields = React__default.useMemo(() => {
    if (!basic.fieldOrder) {
      return [{ key: "email", value: basic.email, icon: basic.icons?.email || "Mail", label: "电子邮箱", visible: true, custom: false }].filter((item) => Boolean(item.value && item.visible));
    }
    return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
      key: field.key,
      value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
      icon: basic.icons?.[field.key] || "User",
      label: field.label,
      visible: field.visible,
      custom: field.custom
    })).filter((item) => Boolean(item.value));
  }, [basic]);
  const allFields = [
    ...getOrderedFields,
    ...basic.customFields?.filter((field) => field.visible !== false).map((field) => ({
      key: field.id,
      value: field.value,
      icon: field.icon,
      label: field.label,
      visible: true,
      custom: true
    })) || []
  ];
  const nameField = basic.fieldOrder?.find((f) => f.key === "name") || { key: "name", visible: true };
  const titleField = basic.fieldOrder?.find((f) => f.key === "title") || { key: "title", visible: true };
  const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx("div", { style: { width: `${basic.photoConfig?.width || 100}px`, height: `${basic.photoConfig?.height || 100}px`, borderRadius: getBorderRadiusValue(basic.photoConfig || { borderRadius: "none", customBorderRadius: 0 }), overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: basic.photo, alt: `${basic.name}'s photo`, className: "w-full h-full object-cover" }) }) });
  const layoutStyles = {
    left: { container: "flex items-center justify-between gap-6", leftContent: "flex items-center gap-6 flex-1 min-w-0", fields: "grid grid-cols-2 gap-x-8 gap-y-2 justify-start shrink-0", nameTitle: "text-left min-w-0" },
    right: { container: "flex items-center justify-between gap-6 flex-row-reverse", leftContent: "flex justify-end items-center gap-6 flex-1 min-w-0", fields: "grid grid-cols-2 gap-x-8 gap-y-2 justify-start shrink-0", nameTitle: "text-right min-w-0" },
    center: { container: "flex flex-col items-center gap-3", leftContent: "flex flex-col items-center gap-4", fields: "w-full flex justify-start items-center flex-wrap gap-3", nameTitle: "text-center min-w-0" }
  };
  const styles = layoutStyles[layout] || layoutStyles.left;
  return /* @__PURE__ */ jsx(SectionWrapper, { sectionId: "basic", children: /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles.leftContent, children: [
      PhotoComponent,
      /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col", styles.nameTitle), style: { color: "#fff" }, children: [
        nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, { layout: "position", className: "font-bold whitespace-pre-wrap break-words", style: { fontSize: "30px", color: "#fff" }, children: basic[nameField.key] }),
        titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, { layout: "position", className: "whitespace-pre-wrap break-words", style: { fontSize: "18px", color: "#fff" }, children: basic[titleField.key] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        layout: "position",
        className: styles.fields,
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, color: "#fff", maxWidth: layout === "center" ? "none" : "600px" },
        children: allFields.map((item) => /* @__PURE__ */ jsx(motion.div, { className: "flex items-center whitespace-nowrap overflow-hidden text-baseFont", style: { color: "#fff" }, children: useIconMode ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", style: { color: "#fff" }, children: [
          getIcon(item.icon),
          item.key === "email" ? /* @__PURE__ */ jsx("a", { href: `mailto:${item.value}`, className: "underline", style: { color: "#fff" }, children: item.value }) : /* @__PURE__ */ jsx("span", { style: { color: "#fff" }, children: item.value })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-hidden", style: { color: "#fff" }, children: [
          !item.custom && /* @__PURE__ */ jsxs("span", { style: { color: "#fff" }, children: [
            t(`basicPanel.basicFields.${item.key}`),
            ":"
          ] }),
          item.custom && /* @__PURE__ */ jsxs("span", { style: { color: "#fff" }, children: [
            item.label,
            ":"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "truncate", suppressHydrationWarning: true, style: { color: "#fff" }, children: item.value })
        ] }) }, item.key))
      }
    )
  ] }) });
};
const SectionTitle = ({ type, title, globalSettings, showTitle = true }) => {
  const { activeResume } = useResumeStore();
  const templateContext = useTemplateContext();
  const menuSections = templateContext?.menuSections ?? activeResume?.menuSections ?? [];
  const renderTitle = useMemo(() => {
    if (type === "custom") return title;
    return menuSections.find((s) => s.id === type)?.title;
  }, [menuSections, type, title]);
  const themeColor = globalSettings?.themeColor;
  if (!showTitle) return null;
  return /* @__PURE__ */ jsx(
    "h3",
    {
      className: "inline-block px-3 py-1 rounded text-white shadow-sm mb-3 font-bold",
      style: {
        fontSize: `${globalSettings?.headerSize || 16}px`,
        backgroundColor: themeColor,
        color: "#ffffff",
        marginBottom: `${globalSettings?.paragraphSpacing}px`
      },
      children: renderTitle
    }
  );
};
const ExperienceSection = ({ experiences, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleExperiences = experiences?.filter((exp) => exp.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "experience", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle, { type: "experience", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.company }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
        /* @__PURE__ */ jsx("div", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(exp.date, locale) })
      ] }),
      exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: exp.position }),
      exp.details && /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "mt-1 text-baseFont",
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 }
        }
      )
    ] }, exp.id)) })
  ] });
};
const EducationSection = ({ education, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleEducation = education?.filter((edu) => edu.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "education", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle, { type: "education", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: edu.school }),
        centerSubtitle && /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: [
          [edu.major, edu.degree].filter(Boolean).join(" · "),
          edu.gpa && ` · GPA ${edu.gpa}`
        ] }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
            suppressHydrationWarning: true,
            style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
            children: `${formatDateString(edu.startDate, locale)} - ${formatDateString(edu.endDate, locale)}`
          }
        )
      ] }),
      !centerSubtitle && /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: [
        [edu.major, edu.degree].filter(Boolean).join(" · "),
        edu.gpa && ` · GPA ${edu.gpa}`
      ] }),
      hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
        }
      )
    ] }, edu.id)) })
  ] });
};
const ProjectSection = ({ projects, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleProjects = projects?.filter((p) => p.visible);
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "projects", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle, { type: "projects", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { layout: "position", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleProjects.map((project) => /* @__PURE__ */ jsxs(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`, children: /* @__PURE__ */ jsx("h3", { className: "font-bold", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.name }) }),
        project.link && !centerSubtitle && /* @__PURE__ */ jsx(
          "a",
          {
            href: project.link.startsWith("http") ? project.link : `https://${project.link}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: `underline ${flexLayout ? "" : "flex-1"}`,
            title: project.link,
            children: (() => {
              try {
                return new URL(project.link.startsWith("http") ? project.link : `https://${project.link}`).hostname.replace(/^www\./, "");
              } catch {
                return project.link;
              }
            })()
          }
        ),
        !project.link && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
        /* @__PURE__ */ jsx("div", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(project.date, locale) })
      ] }),
      project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: project.role }),
      project.link && centerSubtitle && /* @__PURE__ */ jsx("a", { href: project.link.startsWith("http") ? project.link : `https://${project.link}`, target: "_blank", rel: "noopener noreferrer", className: "underline", title: project.link, children: project.link }),
      project.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
        }
      )
    ] }, project.id)) }) })
  ] });
};
const SkillSection = ({ skill, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "skills", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle, { type: "skills", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
      }
    ) })
  ] });
};
const SelfEvaluationSection = ({ content, globalSettings, showTitle = true }) => {
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "selfEvaluation", style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle, { type: "selfEvaluation", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(motion.div, { style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-baseFont",
        layout: "position",
        style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
        dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
      }
    ) })
  ] });
};
const CustomSection = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
  const locale = useLocale();
  const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
  const centerSubtitle = globalSettings?.centerSubtitle;
  const flexLayout = globalSettings?.flexibleHeaderLayout;
  return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId, style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` }, children: [
    /* @__PURE__ */ jsx(SectionTitle, { title, type: "custom", globalSettings, showTitle }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, { layout: "position", style: { marginTop: `${globalSettings?.paragraphSpacing}px` }, children: [
      /* @__PURE__ */ jsxs(motion.div, { layout: "position", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`, children: /* @__PURE__ */ jsx("h4", { className: "font-bold", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.title }) }),
        centerSubtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
        /* @__PURE__ */ jsx("span", { className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`, style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: formatDateString(item.dateRange, locale) })
      ] }),
      !centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, { layout: "position", className: "text-subtitleFont mt-1", style: { fontSize: `${globalSettings?.subheaderSize || 16}px` }, children: item.subtitle }),
      item.description && /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: "position",
          className: "mt-1 text-baseFont",
          style: { fontSize: `${globalSettings?.baseFontSize || 14}px`, lineHeight: globalSettings?.lineHeight || 1.6 },
          dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
        }
      )
    ] }, item.id)) })
  ] });
};
const CreativeTemplate = ({ data, template }) => {
  const { colorScheme } = template;
  const enabledSections = data.menuSections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  const basicSection = enabledSections.find((s) => s.id === "basic");
  const otherSections = enabledSections.filter((s) => s.id !== "basic");
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case "experience":
        return /* @__PURE__ */ jsx(ExperienceSection, { experiences: data.experience, globalSettings: data.globalSettings });
      case "education":
        return /* @__PURE__ */ jsx(EducationSection, { education: data.education, globalSettings: data.globalSettings });
      case "skills":
        return /* @__PURE__ */ jsx(SkillSection, { skill: data.skillContent, globalSettings: data.globalSettings });
      case "projects":
        return /* @__PURE__ */ jsx(ProjectSection, { projects: data.projects, globalSettings: data.globalSettings });
      case "certificates":
        return /* @__PURE__ */ jsxs(SectionWrapper, { sectionId: "certificates", style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` }, children: [
          /* @__PURE__ */ jsx(SectionTitle, { type: "certificates", globalSettings: data.globalSettings }),
          /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })
        ] });
      case "selfEvaluation":
        return /* @__PURE__ */ jsx(SelfEvaluationSection, { content: data.selfEvaluationContent, globalSettings: data.globalSettings });
      default:
        if (sectionId in data.customData) {
          const title = data.menuSections.find((s) => s.id === sectionId)?.title || sectionId;
          return /* @__PURE__ */ jsx(CustomSection, { title, sectionId, items: data.customData[sectionId], globalSettings: data.globalSettings });
        }
        return null;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full min-h-screen", style: { backgroundColor: colorScheme.background, color: colorScheme.text }, children: [
    basicSection && /* @__PURE__ */ jsx("div", { className: "w-full relative py-8 px-4 rounded-b-3xl pr-0", style: { backgroundColor: data.globalSettings.themeColor, color: "#ffffff" }, children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full", children: [
      /* @__PURE__ */ jsx(BaseInfo, { basic: data.basic, globalSettings: data.globalSettings, template }),
      data.basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, { className: "mt-2 text-white", githubKey: data.basic.githubKey, username: data.basic.githubUseName })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: " w-full w-max-4xl mx-auto", children: otherSections.map((section) => /* @__PURE__ */ jsx("div", { children: renderSection(section.id) }, section.id)) })
  ] });
};
const TEMPLATE_REGISTRY = [
  { config: classicConfig, Component: ClassicTemplate },
  { config: modernConfig, Component: ModernTemplate },
  { config: leftRightConfig, Component: LeftRightTemplate },
  { config: timelineConfig, Component: TimelineTemplate },
  { config: minimalistConfig, Component: MinimalistTemplate },
  { config: elegantConfig, Component: ElegantTemplate },
  { config: creativeConfig, Component: CreativeTemplate }
];
const DEFAULT_TEMPLATES = TEMPLATE_REGISTRY.map(
  (entry) => entry.config
);
function getTemplateComponent(layout) {
  return TEMPLATE_REGISTRY.find((entry) => entry.config.layout === layout)?.Component ?? ClassicTemplate;
}
const DEFAULT_FIELD_ORDER = [
  { id: "1", key: "name", label: "姓名", type: "text", visible: true },
  { id: "2", key: "title", label: "职位", type: "text", visible: true },
  {
    id: "3",
    key: "employementStatus",
    label: "状态",
    type: "text",
    visible: true
  },
  { id: "4", key: "birthDate", label: "生日", type: "date", visible: true },
  { id: "5", key: "email", label: "邮箱", type: "text", visible: true },
  { id: "6", key: "phone", label: "电话", type: "text", visible: true },
  { id: "7", key: "location", label: "所在地", type: "text", visible: true }
];
const GITHUB_REPO_URL = "https://github.com/JOYCEQL/magic-resume";
const PDF_EXPORT_CONFIG = {
  SERVER_URL: "https://api.magicv.art/generate-pdf",
  TIMEOUT: 45e3,
  MAX_RETRY: 2,
  MAX_CONTENT_SIZE: 5 * 1024 * 1024
};
const initialGlobalSettings = {
  baseFontSize: 16,
  pagePadding: 32,
  paragraphSpacing: 12,
  lineHeight: 1.5,
  sectionSpacing: 10,
  headerSize: 18,
  subheaderSize: 16,
  useIconMode: true,
  themeColor: "#000000",
  centerSubtitle: true
};
const initialResumeState = {
  title: "新建简历",
  basic: {
    name: "宋哈娜",
    title: "高级前端工程师",
    employementStatus: "离职",
    email: "zhangsan@example.com",
    phone: "13800138000",
    location: "北京市朝阳区",
    birthDate: "2025-01",
    fieldOrder: DEFAULT_FIELD_ORDER,
    icons: {
      email: "Mail",
      phone: "Phone",
      birthDate: "CalendarRange",
      employementStatus: "Briefcase",
      location: "MapPin"
    },
    photoConfig: DEFAULT_CONFIG,
    customFields: [
      {
        id: "personal",
        label: "个人网站",
        value: "https://zhangsan.dev",
        icon: "Globe"
      }
    ],
    photo: "/avatar.png",
    githubKey: "",
    githubUseName: "",
    githubContributionsVisible: false
  },
  education: [
    {
      id: "1",
      school: "北京大学",
      major: "计算机科学与技术",
      degree: "",
      startDate: "2013-09",
      endDate: "2017-06",
      visible: true,
      gpa: "",
      description: `<ul class="custom-list">
        <li>主修课程：数据结构、算法设计、操作系统、计算机网络、Web开发技术</li>
        <li>专业排名前 5%，连续三年获得一等奖学金</li>
        <li>担任计算机协会技术部部长，组织多次技术分享会</li>
        <li>参与开源项目贡献，获得 GitHub Campus Expert 认证</li>
      </ul>`
    }
  ],
  skillContent: `<div class="skill-content">
  <ul class="custom-list">
    <li>前端框架：熟悉 React、Vue.js，熟悉 Next.js、Nuxt.js 等 SSR 框架</li>
    <li>开发语言：TypeScript、JavaScript(ES6+)、HTML5、CSS3</li>
    <li>UI/样式：熟悉 TailwindCSS、Sass/Less、CSS Module、Styled-components</li>
    <li>状态管理：Redux、Vuex、Zustand、Jotai、React Query</li>
    <li>工程化工具：Webpack、Vite、Rollup、Babel、ESLint</li>
    <li>测试工具：Jest、React Testing Library、Cypress</li>
    <li>性能优化：熟悉浏览器渲染原理、性能指标监控、代码分割、懒加载等优化技术</li>
    <li>版本控制：Git、SVN</li>
    <li>技术管理：具备团队管理经验，主导过多个大型项目的技术选型和架构设计</li>
  </ul>
</div>`,
  selfEvaluationContent: "",
  experience: [
    {
      id: "1",
      company: "字节跳动",
      position: "高级前端工程师",
      date: "2021.07 - 2024.12",
      visible: true,
      details: `<ul class="custom-list">
      <li>负责抖音创作者平台的开发与维护，主导多个核心功能的技术方案设计</li>
      <li>优化项目工程化配置，将构建时间从 8 分钟优化至 2 分钟，提升团队开发效率</li>
      <li>设计并实现组件库，提升代码复用率达 70%，显著减少开发时间</li>
      <li>主导性能优化项目，使平台首屏加载时间减少 50%，接入 APM 监控系统</li>
      <li>指导初级工程师，组织技术分享会，提升团队整体技术水平</li>
    </ul>`
    }
  ],
  draggingProjectId: null,
  projects: [
    {
      id: "p1",
      name: "抖音创作者中台",
      role: "前端负责人",
      date: "2022.06 - 2023.12",
      description: `<ul class="custom-list">
        <li>基于 React 开发的创作者数据分析和内容管理平台，服务百万级创作者群体</li>
        <li>包含数据分析、内容管理、收益管理等多个子系统</li>
        <li>使用 Redux 进行状态管理，实现复杂数据流的高效处理</li>
        <li>采用 Ant Design 组件库，确保界面设计的一致性和用户体验</li>
        <li>实施代码分割和懒加载策略，优化大规模应用的加载性能</li>
      </ul>`,
      visible: true
    },
    {
      id: "p2",
      name: "微信小程序开发者工具",
      role: "核心开发者",
      date: "2020.03 - 2021.06",
      description: `<ul class="custom-list">
        <li>为开发者提供小程序开发、调试和发布的一站式解决方案</li>
        <li>基于 Electron 构建的跨平台桌面应用</li>
        <li>支持多平台开发，包括 Windows、macOS 和 Linux</li>
        <li>提供实时的错误日志和性能分析工具</li>
        <li>集成第三方插件和 SDK，支持开发者自定义功能</li>
      </ul>`,
      visible: true
    },
    {
      id: "p3",
      name: "前端监控平台",
      role: "技术负责人",
      date: "2021.09 - 2022.03",
      description: `<ul class="custom-list">
        <li>一个完整的前端监控解决方案，包含错误监控、性能监控、用户行为分析等功能。</li>
        <li>基于 Vue 和 Element UI 构建，提供实时的监控数据和可视化分析工具。</li>
        <li>支持多种监控指标，包括错误日志、性能指标、用户行为分析等。</li>
        <li>提供详细的错误日志和性能分析工具，帮助开发者定位和优化问题。</li>
        <li>集成第三方插件和 SDK，支持开发者自定义功能。</li>
      </ul>`,
      visible: true
    }
  ],
  menuSections: [
    { id: "basic", title: "基本信息", icon: "👤", enabled: true, order: 0 },
    { id: "skills", title: "专业技能", icon: "⚡", enabled: true, order: 1 },
    {
      id: "experience",
      title: "工作经验",
      icon: "💼",
      enabled: true,
      order: 2
    },
    {
      id: "projects",
      title: "项目经历",
      icon: "🚀",
      enabled: true,
      order: 3
    },
    {
      id: "education",
      title: "教育经历",
      icon: "🎓",
      enabled: true,
      order: 4
    }
  ],
  certificates: [],
  customData: {},
  activeSection: "basic",
  globalSettings: initialGlobalSettings
};
const initialResumeStateEn = {
  title: "New Resume",
  basic: {
    name: "Dva",
    title: "Senior Frontend Engineer",
    employementStatus: "Available",
    email: "john.smith@123.com",
    phone: "555-123-4567",
    location: "San Francisco, CA",
    birthDate: "",
    fieldOrder: DEFAULT_FIELD_ORDER,
    icons: {
      email: "Mail",
      phone: "Phone",
      birthDate: "CalendarRange",
      employementStatus: "Briefcase",
      location: "MapPin"
    },
    photoConfig: DEFAULT_CONFIG,
    customFields: [],
    photo: "/avatar.png",
    githubKey: "",
    githubUseName: "",
    githubContributionsVisible: false
  },
  education: [
    {
      id: "1",
      school: "Stanford University",
      major: "Computer Science",
      degree: "",
      startDate: "2013-09",
      endDate: "2017-06",
      visible: true,
      gpa: "",
      description: `<ul class="custom-list">
        <li>Core courses: Data Structures, Algorithms, Operating Systems, Computer Networks, Web Development</li>
        <li>Top 5% of class, received Dean's List honors for three consecutive years</li>
        <li>Served as Technical Director of the Computer Science Association, organized multiple tech workshops</li>
        <li>Contributed to open-source projects, earned GitHub Campus Expert certification</li>
      </ul>`
    }
  ],
  skillContent: `<div class="skill-content">
  <ul class="custom-list">
    <li>Frontend Frameworks: React, Vue.js, Next.js, Nuxt.js and other SSR frameworks</li>
    <li>Languages: TypeScript, JavaScript(ES6+), HTML5, CSS3</li>
    <li>UI/Styling: TailwindCSS, Sass/Less, CSS Modules, Styled-components</li>
    <li>State Management: Redux, Vuex, Zustand, Jotai, React Query</li>
    <li>Build Tools: Webpack, Vite, Rollup, Babel, ESLint</li>
    <li>Testing: Jest, React Testing Library, Cypress</li>
    <li>Performance: Browser rendering principles, performance metrics monitoring, code splitting, lazy loading</li>
    <li>Version Control: Git, SVN</li>
    <li>Technical Leadership: Team management experience, led technology selection and architecture design for large projects</li>
  </ul>
</div>`,
  selfEvaluationContent: "",
  experience: [
    {
      id: "1",
      company: "ByteDance",
      position: "Senior Frontend Engineer",
      date: "2021.07 - 2024.12",
      visible: true,
      details: `<ul class="custom-list">
      <li>Responsible for development and maintenance of TikTok Creator Platform, leading technical solution design for core features</li>
      <li>Optimized build configuration, reducing build time from 8 minutes to 2 minutes, improving team development efficiency</li>
      <li>Designed and implemented component library, increasing code reuse by 70%, significantly reducing development time</li>
      <li>Led performance optimization project, reducing platform first-screen loading time by 50%, integrated APM monitoring system</li>
      <li>Mentored junior engineers, organized technical sharing sessions to improve overall team technical capabilities</li>
    </ul>`
    }
  ],
  draggingProjectId: null,
  projects: [
    {
      id: "p1",
      name: "TikTok Creator Platform",
      role: "Frontend Lead",
      date: "2022.06 - 2023.12",
      description: `<ul class="custom-list">
        <li>React-based analytics and content management platform serving millions of creators</li>
        <li>Includes data analytics, content management, and revenue management subsystems</li>
        <li>Implemented Redux for state management, enabling efficient handling of complex data flows</li>
        <li>Used Ant Design component library to ensure UI consistency and user experience</li>
        <li>Implemented code splitting and lazy loading strategies to optimize loading performance</li>
      </ul>`,
      visible: true
    },
    {
      id: "p2",
      name: "WeChat Mini Program Developer Tools",
      role: "Core Developer",
      date: "2020.03 - 2021.06",
      description: `<ul class="custom-list">
        <li>All-in-one solution for mini program development, debugging, and publishing</li>
        <li>Cross-platform desktop application built with Electron</li>
        <li>Supports multiple platforms including Windows, macOS, and Linux</li>
        <li>Provides real-time error logging and performance analysis tools</li>
        <li>Integrates third-party plugins and SDKs for custom functionality</li>
      </ul>`,
      visible: true
    },
    {
      id: "p3",
      name: "Frontend Monitoring Platform",
      role: "Technical Lead",
      date: "2021.09 - 2022.05",
      description: `<ul class="custom-list">
        <li>Complete frontend monitoring solution including error tracking, performance monitoring, and user behavior analysis</li>
        <li>Built with Vue and Element UI, providing real-time monitoring data and visualization tools</li>
        <li>Supports various monitoring metrics including error logs, performance indicators, and user behavior analysis</li>
        <li>Provides detailed error logs and performance analysis tools to help developers identify and optimize issues</li>
        <li>Integrates third-party plugins and SDKs for custom functionality</li>
      </ul>`,
      visible: true
    }
  ],
  menuSections: [
    {
      id: "basic",
      title: "Profile",
      icon: "👤",
      enabled: true,
      order: 0
    },
    {
      id: "skills",
      title: "Skills",
      icon: "⚡",
      enabled: true,
      order: 1
    },
    {
      id: "experience",
      title: "Experience",
      icon: "💼",
      enabled: true,
      order: 2
    },
    {
      id: "projects",
      title: "Projects",
      icon: "🚀",
      enabled: true,
      order: 3
    },
    {
      id: "education",
      title: "Education",
      icon: "🎓",
      enabled: true,
      order: 4
    }
  ],
  certificates: [],
  customData: {},
  activeSection: "basic",
  globalSettings: initialGlobalSettings
};
const blankResumeState = {
  ...initialResumeState,
  title: "新建简历",
  basic: {
    ...initialResumeState.basic,
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    birthDate: "",
    employementStatus: "",
    photo: "",
    customFields: []
  },
  education: [],
  skillContent: "",
  selfEvaluationContent: "",
  experience: [],
  projects: [],
  certificates: [],
  menuSections: [initialResumeState.menuSections[0]]
};
const blankResumeStateEn = {
  ...initialResumeStateEn,
  title: "New Resume",
  basic: {
    ...initialResumeStateEn.basic,
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    birthDate: "",
    employementStatus: "",
    photo: "",
    customFields: []
  },
  education: [],
  skillContent: "",
  selfEvaluationContent: "",
  experience: [],
  projects: [],
  certificates: [],
  menuSections: [initialResumeStateEn.menuSections[0]]
};
const initialResumeData = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  blankResumeState,
  blankResumeStateEn,
  initialResumeState,
  initialResumeStateEn
}, Symbol.toStringTag, { value: "Module" }));
const generateUUID = () => {
  return v4();
};
const uuid = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generateUUID
}, Symbol.toStringTag, { value: "Module" }));
const syncResumeToFile = async (resumeData, prevResume) => {
  try {
    const handle = await getFileHandle("syncDirectory");
    if (!handle) {
      console.warn("No directory handle found");
      return;
    }
    const hasPermission = await verifyPermission(handle);
    if (!hasPermission) {
      console.warn("No permission to write to directory");
      return;
    }
    const dirHandle = handle;
    if (prevResume && prevResume.id === resumeData.id && prevResume.title !== resumeData.title) {
      try {
        await dirHandle.removeEntry(`${prevResume.title}.json`);
      } catch (error) {
        console.warn("Error deleting old file:", error);
      }
    }
    const fileName = `${resumeData.title}.json`;
    const fileHandle = await dirHandle.getFileHandle(fileName, {
      create: true
    });
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(resumeData, null, 2));
    await writable.close();
  } catch (error) {
    console.error("Error syncing resume to file:", error);
  }
};
const useResumeStore = create(
  persist(
    (set, get) => ({
      resumes: {},
      activeResumeId: null,
      activeResume: null,
      createResume: (templateId = null, isBlank = false) => {
        const locale = typeof document !== "undefined" ? document.cookie.split("; ").find((row) => row.startsWith("NEXT_LOCALE="))?.split("=")[1] || "zh" : "zh";
        let initialResumeData2;
        if (isBlank) {
          initialResumeData2 = locale === "en" ? blankResumeStateEn : blankResumeState;
        } else {
          initialResumeData2 = locale === "en" ? initialResumeStateEn : initialResumeState;
        }
        const id = generateUUID();
        const template = templateId ? DEFAULT_TEMPLATES.find((t) => t.id === templateId) : DEFAULT_TEMPLATES[0];
        const newResume = {
          ...initialResumeData2,
          id,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          templateId: template?.id,
          title: `${locale === "en" ? "New Resume" : "新建简历"} ${id.slice(
            0,
            6
          )}`
        };
        set((state) => ({
          resumes: {
            ...state.resumes,
            [id]: newResume
          },
          activeResumeId: id,
          activeResume: newResume
        }));
        syncResumeToFile(newResume);
        return id;
      },
      updateResume: (resumeId, data) => {
        set((state) => {
          const resume = state.resumes[resumeId];
          if (!resume) return state;
          const updatedResume = {
            ...resume,
            ...data
          };
          syncResumeToFile(updatedResume, resume);
          return {
            resumes: {
              ...state.resumes,
              [resumeId]: updatedResume
            },
            activeResume: state.activeResumeId === resumeId ? updatedResume : state.activeResume
          };
        });
      },
      // 从文件更新，直接更新resumes
      updateResumeFromFile: (resume) => {
        set((state) => ({
          resumes: {
            ...state.resumes,
            [resume.id]: resume
          },
          activeResume: state.activeResumeId === resume.id ? resume : state.activeResume
        }));
      },
      updateResumeTitle: (title) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          get().updateResume(activeResumeId, { title });
        }
      },
      deleteResume: (resume) => {
        const resumeId = resume.id;
        set((state) => {
          const { [resumeId]: _, activeResume, ...rest } = state.resumes;
          return {
            resumes: rest,
            activeResumeId: null,
            activeResume: null
          };
        });
        (async () => {
          try {
            const handle = await getFileHandle("syncDirectory");
            if (!handle) return;
            const hasPermission = await verifyPermission(handle);
            if (!hasPermission) return;
            const dirHandle = handle;
            try {
              await dirHandle.removeEntry(`${resume.title}.json`);
            } catch (error) {
            }
          } catch (error) {
            console.error("Error deleting resume file:", error);
          }
        })();
      },
      duplicateResume: (resumeId) => {
        const newId = generateUUID();
        const originalResume = get().resumes[resumeId];
        const locale = typeof document !== "undefined" ? document.cookie.split("; ").find((row) => row.startsWith("NEXT_LOCALE="))?.split("=")[1] || "zh" : "zh";
        const duplicatedResume = {
          ...originalResume,
          id: newId,
          title: `${originalResume.title} (${locale === "en" ? "Copy" : "复制"})`,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        set((state) => ({
          resumes: {
            ...state.resumes,
            [newId]: duplicatedResume
          },
          activeResumeId: newId,
          activeResume: duplicatedResume
        }));
        return newId;
      },
      setActiveResume: (resumeId) => {
        const resume = get().resumes[resumeId];
        if (resume) {
          set({ activeResume: resume, activeResumeId: resumeId });
        }
      },
      updateBasicInfo: (data) => {
        set((state) => {
          if (!state.activeResume) return state;
          const updatedResume = {
            ...state.activeResume,
            basic: {
              ...state.activeResume.basic,
              ...data
            }
          };
          const newState = {
            resumes: {
              ...state.resumes,
              [state.activeResume.id]: updatedResume
            },
            activeResume: updatedResume
          };
          syncResumeToFile(updatedResume, state.activeResume);
          return newState;
        });
      },
      updateEducation: (education) => {
        const { activeResumeId, resumes } = get();
        if (!activeResumeId) return;
        const currentResume = resumes[activeResumeId];
        const newEducation = currentResume.education.some(
          (e) => e.id === education.id
        ) ? currentResume.education.map(
          (e) => e.id === education.id ? education : e
        ) : [...currentResume.education, education];
        get().updateResume(activeResumeId, { education: newEducation });
      },
      updateEducationBatch: (educations) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          get().updateResume(activeResumeId, { education: educations });
        }
      },
      deleteEducation: (id) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          const resume = get().resumes[activeResumeId];
          const updatedEducation = resume.education.filter((e) => e.id !== id);
          get().updateResume(activeResumeId, { education: updatedEducation });
        }
      },
      updateExperience: (experience) => {
        const { activeResumeId, resumes } = get();
        if (!activeResumeId) return;
        const currentResume = resumes[activeResumeId];
        const newExperience = currentResume.experience.find(
          (e) => e.id === experience.id
        ) ? currentResume.experience.map(
          (e) => e.id === experience.id ? experience : e
        ) : [...currentResume.experience, experience];
        get().updateResume(activeResumeId, { experience: newExperience });
      },
      updateExperienceBatch: (experiences) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          const updateData = { experience: experiences };
          get().updateResume(activeResumeId, updateData);
        }
      },
      deleteExperience: (id) => {
        const { activeResumeId, resumes } = get();
        if (!activeResumeId) return;
        const currentResume = resumes[activeResumeId];
        const updatedExperience = currentResume.experience.filter(
          (e) => e.id !== id
        );
        get().updateResume(activeResumeId, { experience: updatedExperience });
      },
      updateProjects: (project) => {
        const { activeResumeId, resumes } = get();
        if (!activeResumeId) return;
        const currentResume = resumes[activeResumeId];
        const newProjects = currentResume.projects.some(
          (p) => p.id === project.id
        ) ? currentResume.projects.map(
          (p) => p.id === project.id ? project : p
        ) : [...currentResume.projects, project];
        get().updateResume(activeResumeId, { projects: newProjects });
      },
      updateProjectsBatch: (projects) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          const updateData = { projects };
          get().updateResume(activeResumeId, updateData);
        }
      },
      deleteProject: (id) => {
        const { activeResumeId } = get();
        if (!activeResumeId) return;
        const currentResume = get().resumes[activeResumeId];
        const updatedProjects = currentResume.projects.filter(
          (p) => p.id !== id
        );
        get().updateResume(activeResumeId, { projects: updatedProjects });
      },
      setDraggingProjectId: (id) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          get().updateResume(activeResumeId, { draggingProjectId: id });
        }
      },
      updateSkillContent: (skillContent) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          get().updateResume(activeResumeId, { skillContent });
        }
      },
      updateSelfEvaluationContent: (selfEvaluationContent) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          get().updateResume(activeResumeId, { selfEvaluationContent });
        }
      },
      reorderSections: (newOrder) => {
        const { activeResumeId, resumes } = get();
        if (activeResumeId) {
          const currentResume = resumes[activeResumeId];
          const basicInfoSection = currentResume.menuSections.find(
            (section) => section.id === "basic"
          );
          const reorderedSections = [
            basicInfoSection,
            ...newOrder.filter((section) => section.id !== "basic")
          ].map((section, index) => ({
            ...section,
            order: index
          }));
          get().updateResume(activeResumeId, {
            menuSections: reorderedSections
          });
        }
      },
      toggleSectionVisibility: (sectionId) => {
        const { activeResumeId, resumes } = get();
        if (activeResumeId) {
          const currentResume = resumes[activeResumeId];
          const updatedSections = currentResume.menuSections.map(
            (section) => section.id === sectionId ? { ...section, enabled: !section.enabled } : section
          );
          get().updateResume(activeResumeId, { menuSections: updatedSections });
        }
      },
      setActiveSection: (sectionId) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          get().updateResume(activeResumeId, { activeSection: sectionId });
        }
      },
      updateMenuSections: (sections) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          get().updateResume(activeResumeId, { menuSections: sections });
        }
      },
      addCustomData: (sectionId) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          const currentResume = get().resumes[activeResumeId];
          const updatedCustomData = {
            ...currentResume.customData,
            [sectionId]: [
              {
                id: generateUUID(),
                title: "未命名模块",
                subtitle: "",
                dateRange: "",
                description: "",
                visible: true
              }
            ]
          };
          get().updateResume(activeResumeId, { customData: updatedCustomData });
        }
      },
      updateCustomData: (sectionId, items) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          const currentResume = get().resumes[activeResumeId];
          const updatedCustomData = {
            ...currentResume.customData,
            [sectionId]: items
          };
          get().updateResume(activeResumeId, { customData: updatedCustomData });
        }
      },
      removeCustomData: (sectionId) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          const currentResume = get().resumes[activeResumeId];
          const { [sectionId]: _, ...rest } = currentResume.customData;
          get().updateResume(activeResumeId, { customData: rest });
        }
      },
      addCustomItem: (sectionId) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          const currentResume = get().resumes[activeResumeId];
          const updatedCustomData = {
            ...currentResume.customData,
            [sectionId]: [
              ...currentResume.customData[sectionId] || [],
              {
                id: generateUUID(),
                title: "未命名模块",
                subtitle: "",
                dateRange: "",
                description: "",
                visible: true
              }
            ]
          };
          get().updateResume(activeResumeId, { customData: updatedCustomData });
        }
      },
      updateCustomItem: (sectionId, itemId, updates) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          const currentResume = get().resumes[activeResumeId];
          const updatedCustomData = {
            ...currentResume.customData,
            [sectionId]: currentResume.customData[sectionId].map(
              (item) => item.id === itemId ? { ...item, ...updates } : item
            )
          };
          get().updateResume(activeResumeId, { customData: updatedCustomData });
        }
      },
      removeCustomItem: (sectionId, itemId) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          const currentResume = get().resumes[activeResumeId];
          const updatedCustomData = {
            ...currentResume.customData,
            [sectionId]: currentResume.customData[sectionId].filter(
              (item) => item.id !== itemId
            )
          };
          get().updateResume(activeResumeId, { customData: updatedCustomData });
        }
      },
      addCertificate: (certificate) => {
        const { activeResumeId, resumes } = get();
        if (!activeResumeId) return;
        const currentResume = resumes[activeResumeId];
        const newCertificates = currentResume.certificates.some(
          (c) => c.id === certificate.id
        ) ? currentResume.certificates.map(
          (c) => c.id === certificate.id ? certificate : c
        ) : [...currentResume.certificates, certificate];
        get().updateResume(activeResumeId, { certificates: newCertificates });
      },
      updateCertificate: (id, updates) => {
        const { activeResumeId, resumes } = get();
        if (!activeResumeId) return;
        const currentResume = resumes[activeResumeId];
        const newCertificates = currentResume.certificates.map(
          (c) => c.id === id ? { ...c, ...updates } : c
        );
        get().updateResume(activeResumeId, { certificates: newCertificates });
      },
      updateCertificatesBatch: (certificates) => {
        const { activeResumeId } = get();
        if (activeResumeId) {
          get().updateResume(activeResumeId, { certificates });
        }
      },
      removeCertificate: (id) => {
        const { activeResumeId, resumes } = get();
        if (!activeResumeId) return;
        const currentResume = resumes[activeResumeId];
        const updatedCertificates = currentResume.certificates.filter(
          (c) => c.id !== id
        );
        get().updateResume(activeResumeId, { certificates: updatedCertificates });
      },
      updateGlobalSettings: (settings) => {
        const { activeResumeId, updateResume, activeResume } = get();
        if (activeResumeId) {
          updateResume(activeResumeId, {
            globalSettings: {
              ...activeResume?.globalSettings,
              ...settings
            }
          });
        }
      },
      setThemeColor: (color) => {
        const { activeResumeId, updateResume } = get();
        if (activeResumeId) {
          updateResume(activeResumeId, {
            globalSettings: {
              ...get().activeResume?.globalSettings,
              themeColor: color
            }
          });
        }
      },
      setTemplate: (templateId) => {
        const { activeResumeId, resumes } = get();
        if (!activeResumeId) return;
        const template = DEFAULT_TEMPLATES.find((t) => t.id === templateId);
        if (!template) return;
        const updatedResume = {
          ...resumes[activeResumeId],
          templateId,
          globalSettings: {
            ...resumes[activeResumeId].globalSettings,
            themeColor: template.colorScheme.primary,
            sectionSpacing: template.spacing.sectionGap,
            paragraphSpacing: template.spacing.itemGap,
            pagePadding: template.spacing.contentPadding
          },
          basic: {
            ...resumes[activeResumeId].basic,
            layout: template.basic.layout
          }
        };
        set({
          resumes: {
            ...resumes,
            [activeResumeId]: updatedResume
          },
          activeResume: updatedResume
        });
      },
      addResume: (resume) => {
        set((state) => ({
          resumes: {
            ...state.resumes,
            [resume.id]: resume
          },
          activeResumeId: resume.id,
          activeResume: resume
        }));
        syncResumeToFile(resume);
        return resume.id;
      }
    }),
    {
      name: "resume-storage",
      partialize: (state) => ({
        resumes: state.resumes,
        activeResumeId: state.activeResumeId
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState;
        const resumes = persisted.resumes ?? currentState.resumes;
        const activeResumeId = persisted.activeResumeId ?? currentState.activeResumeId;
        return {
          ...currentState,
          ...persisted,
          resumes,
          activeResumeId,
          activeResume: activeResumeId ? resumes[activeResumeId] ?? null : null
        };
      }
    }
  )
);
const DEFAULT_FONT_FAMILY = '"Alibaba PuHuiTi", sans-serif';
const FONT_DEFINITIONS = [
  {
    labelKey: "alibaba",
    value: DEFAULT_FONT_FAMILY,
    aliases: [
      "Alibaba PuHuiTi, sans-serif",
      '"Alibaba PuHuiTi", sans-serif'
    ],
    sources: [
      {
        family: "Alibaba PuHuiTi",
        url: "/fonts/AlibabaPuHuiTi-3-55-Regular.ttf",
        format: "truetype",
        weight: "400",
        style: "normal"
      },
      {
        family: "Alibaba PuHuiTi",
        url: "/fonts/AlibabaPuHuiTi-3-85-Bold.ttf",
        format: "truetype",
        weight: "700",
        style: "normal"
      }
    ]
  },
  {
    labelKey: "misans",
    value: '"MiSans", sans-serif',
    aliases: [
      '"MiSans", "Microsoft YaHei", "微软雅黑", sans-serif',
      '"Microsoft YaHei", "微软雅黑", sans-serif',
      '"Microsoft YaHei Local", "Microsoft YaHei", "微软雅黑", sans-serif',
      '"MiSans", sans-serif',
      "MiSans, sans-serif",
      "Microsoft YaHei, sans-serif"
    ],
    sources: [
      {
        family: "MiSans",
        url: "/fonts/MiSans-Normal.ttf",
        format: "truetype",
        weight: "400",
        style: "normal"
      },
      {
        family: "MiSans",
        url: "/fonts/MiSans-Bold.ttf",
        format: "truetype",
        weight: "700",
        style: "normal"
      }
    ]
  },
  {
    labelKey: "notosanssc",
    value: '"Noto Sans SC", "Noto Sans CJK SC", sans-serif',
    aliases: [
      '"Noto Sans SC", "Noto Sans CJK SC", sans-serif',
      "Noto Sans SC, sans-serif"
    ],
    sources: [
      {
        family: "Noto Sans SC",
        url: "/fonts/NotoSansSC-Regular.otf",
        format: "opentype",
        weight: "400",
        style: "normal"
      },
      {
        family: "Noto Sans SC",
        url: "/fonts/NotoSansSC-Medium.otf",
        format: "opentype",
        weight: "500",
        style: "normal"
      },
      {
        family: "Noto Sans SC",
        url: "/fonts/NotoSansSC-Bold.otf",
        format: "opentype",
        weight: "700",
        style: "normal"
      }
    ]
  },
  {
    labelKey: "sourcehanserifsc",
    value: '"Source Han Serif SC", "Noto Serif SC", serif',
    aliases: [
      '"Source Han Serif SC", "Noto Serif SC", serif',
      '"Noto Serif SC", "Source Han Serif SC", serif',
      "Source Han Serif SC, serif",
      "Noto Serif SC, serif"
    ],
    sources: [
      {
        family: "Source Han Serif SC",
        url: "/fonts/SourceHanSerifSC-Regular.otf",
        format: "opentype",
        weight: "400",
        style: "normal"
      },
      {
        family: "Source Han Serif SC",
        url: "/fonts/SourceHanSerifSC-Medium.otf",
        format: "opentype",
        weight: "500",
        style: "normal"
      },
      {
        family: "Source Han Serif SC",
        url: "/fonts/SourceHanSerifSC-Bold.otf",
        format: "opentype",
        weight: "700",
        style: "normal"
      }
    ]
  }
];
const fontDataUrlCache = /* @__PURE__ */ new Map();
const toDataUrl = async (url) => {
  if (!fontDataUrlCache.has(url)) {
    fontDataUrlCache.set(
      url,
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load font: ${url}`);
        }
        return response.blob();
      }).then(
        (blob) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject(new Error(`Failed to read font: ${url}`));
          reader.readAsDataURL(blob);
        })
      )
    );
  }
  return fontDataUrlCache.get(url);
};
const findFontDefinition = (fontFamily) => {
  const normalizedValue = fontFamily?.trim();
  if (!normalizedValue) {
    return FONT_DEFINITIONS[0];
  }
  return FONT_DEFINITIONS.find(
    (definition) => definition.value === normalizedValue || definition.aliases.includes(normalizedValue) || definition.aliases.some(
      (alias) => normalizedValue.includes(alias.replace(/"/g, ""))
    )
  ) || FONT_DEFINITIONS[0];
};
const buildFontFaceRule = (source, resolvedUrl) => `@font-face {
  font-family: "${source.family}";
  src: url("${resolvedUrl}") format("${source.format}");
  font-weight: ${source.weight};
  font-style: ${source.style};
  font-display: swap;
}`;
const normalizeFontFamily = (fontFamily) => findFontDefinition(fontFamily).value;
const getFontOptions = (t) => FONT_DEFINITIONS.map((definition) => ({
  value: definition.value,
  label: t(definition.labelKey)
}));
const getFontFaceCss = async (fontFamily, inline = false) => {
  const definition = findFontDefinition(fontFamily);
  const rules = await Promise.all(
    definition.sources.map(async (source) => {
      const resolvedUrl = inline ? await toDataUrl(source.url) : source.url;
      return buildFontFaceRule(source, resolvedUrl);
    })
  );
  return rules.join("\n");
};
const ResumeTemplateComponent = ({
  data,
  template
}) => {
  const TemplateComponent = getTemplateComponent(template.layout);
  return /* @__PURE__ */ jsx(TemplateProvider, { templateId: template.id, menuSections: data.menuSections, children: /* @__PURE__ */ jsx(TemplateComponent, { data, template }) });
};
export {
  DEFAULT_TEMPLATES as D,
  GITHUB_REPO_URL as G,
  PDF_EXPORT_CONFIG as P,
  ResumeTemplateComponent as R,
  THEME_COLORS as T,
  getFontOptions as a,
  DEFAULT_CONFIG as b,
  getBorderRadiusValue as c,
  getRatioMultiplier as d,
  normalizeLinkHref as e,
  DEFAULT_FIELD_ORDER as f,
  getFontFaceCss as g,
  generateUUID as h,
  initialResumeStateEn as i,
  initialResumeState as j,
  initialResumeData as k,
  uuid as l,
  normalizeFontFamily as n,
  useResumeStore as u
};
