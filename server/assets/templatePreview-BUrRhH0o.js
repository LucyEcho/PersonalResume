import { D as DEFAULT_TEMPLATES, i as initialResumeStateEn, j as initialResumeState } from "./index-BnsqTy7W.js";
const TEMPLATE_PREVIEW_WIDTH_PX = 794;
const TEMPLATE_PREVIEW_HEIGHT_PX = 1123;
const TEMPLATE_SNAPSHOT_ROOT_ATTRIBUTE = "data-template-snapshot-root";
const isTemplatePreviewLocale = (value) => value === "zh" || value === "en";
const getTemplateById = (templateId) => DEFAULT_TEMPLATES.find((template) => template.id === templateId) ?? DEFAULT_TEMPLATES[0];
const getTemplatePreviewBaseData = (locale) => locale === "en" ? initialResumeStateEn : initialResumeState;
const createTemplatePreviewData = (template, locale) => {
  const baseData = getTemplatePreviewBaseData(locale);
  return {
    ...baseData,
    id: `preview-mock-${locale}-${template.id}`,
    templateId: template.id,
    createdAt: (/* @__PURE__ */ new Date(0)).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date(0)).toISOString(),
    globalSettings: {
      ...baseData.globalSettings,
      themeColor: template.colorScheme.primary,
      sectionSpacing: template.spacing.sectionGap,
      paragraphSpacing: template.spacing.itemGap,
      pagePadding: template.spacing.contentPadding
    },
    basic: {
      ...baseData.basic,
      layout: template.basic.layout
    }
  };
};
const getTemplateSnapshotSrc = (manifest, locale, templateId) => manifest.locales[locale][templateId] ?? null;
export {
  TEMPLATE_PREVIEW_HEIGHT_PX as T,
  TEMPLATE_PREVIEW_WIDTH_PX as a,
  TEMPLATE_SNAPSHOT_ROOT_ATTRIBUTE as b,
  createTemplatePreviewData as c,
  getTemplateSnapshotSrc as d,
  getTemplateById as g,
  isTemplatePreviewLocale as i
};
