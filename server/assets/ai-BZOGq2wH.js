import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Sparkles, Check, ExternalLink } from "lucide-react";
import { b as useTranslations } from "./router-DDFDFkQR.js";
import { I as Input } from "./input-CtOh6NaB.js";
import { L as Label } from "./label-wesNJXAd.js";
import { u as useAIConfigStore } from "./useAIConfigStore-CCqhVQ4X.js";
import { c as cn } from "./utils-Dmlx_rqM.js";
import "@tanstack/react-router";
import "next-themes";
import "@heroui/react";
import "sonner";
import "@google/generative-ai";
import "undici";
import "@radix-ui/react-label";
import "class-variance-authority";
import "zustand";
import "zustand/middleware";
import "clsx";
import "tailwind-merge";
const DeepSeekLogo = ({
  size = 24,
  className = "",
  ...props
}) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      "aria-label": "DeepSeek Logo",
      ...props,
      children: [
        /* @__PURE__ */ jsx("title", { children: "DeepSeek" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z",
            fill: "currentColor",
            className: "text-[#4D6BFE]"
          }
        )
      ]
    }
  );
};
const DoubaoLogo = ({
  size = 24,
  className = "",
  ...props
}) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      "aria-label": "Doubao Logo",
      ...props,
      children: [
        /* @__PURE__ */ jsx("title", { children: "Doubao" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M5.31 15.756c.172-3.75 1.883-5.999 2.549-6.739-3.26 2.058-5.425 5.658-6.358 8.308v1.12C1.501 21.513 4.226 24 7.59 24a6.59 6.59 0 002.2-.375c.353-.12.7-.248 1.039-.378.913-.899 1.65-1.91 2.243-2.992-4.877 2.431-7.974.072-7.763-4.5l.002.001z",
            fill: "#1E37FC"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M22.57 10.283c-1.212-.901-4.109-2.404-7.397-2.8.295 3.792.093 8.766-2.1 12.773a12.782 12.782 0 01-2.244 2.992c3.764-1.448 6.746-3.457 8.596-5.219 2.82-2.683 3.353-5.178 3.361-6.66a2.737 2.737 0 00-.216-1.084v-.002z",
            fill: "#37E1BE"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M14.303 1.867C12.955.7 11.248 0 9.39 0 7.532 0 5.883.677 4.545 1.807 2.791 3.29 1.627 5.557 1.5 8.125v9.201c.932-2.65 3.097-6.25 6.357-8.307.5-.318 1.025-.595 1.569-.829 1.883-.801 3.878-.932 5.746-.706-.222-2.83-.718-5.002-.87-5.617h.001z",
            fill: "#A569FF"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M17.305 4.961a199.47 199.47 0 01-1.08-1.094c-.202-.213-.398-.419-.586-.622l-1.333-1.378c.151.615.648 2.786.869 5.617 3.288.395 6.185 1.898 7.396 2.8-1.306-1.275-3.475-3.487-5.266-5.323z",
            fill: "#1E37FC"
          }
        )
      ]
    }
  );
};
const OpenAiLogo = ({
  size = 24,
  className = "",
  ...props
}) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      "aria-label": "OpenAi Logo",
      ...props,
      children: [
        /* @__PURE__ */ jsx("title", { children: "OpenAi" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M 11.134766 1.0175781 C 10.87173 1.0049844 10.606766 1.0088281 10.337891 1.0332031 C 8.1135321 1.2338971 6.3362243 2.7940749 5.609375 4.8203125 C 3.8970488 5.1768339 2.4372723 6.3048522 1.671875 7.9570312 C 0.73398779 9.9840533 1.1972842 12.30076 2.5878906 13.943359 C 2.0402591 15.605222 2.2856216 17.434472 3.3320312 18.921875 C 4.6182099 20.747762 6.8565685 21.504693 8.9746094 21.121094 C 10.139659 22.427613 11.84756 23.130452 13.662109 22.966797 C 15.886521 22.766098 17.663809 21.205995 18.390625 19.179688 C 20.102972 18.823145 21.563838 17.695991 22.330078 16.042969 C 23.268167 14.016272 22.805368 11.697142 21.414062 10.054688 C 21.960697 8.3934373 21.713894 6.5648387 20.667969 5.078125 C 19.38179 3.2522378 17.143432 2.4953068 15.025391 2.8789062 C 14.032975 1.7660011 12.646869 1.0899755 11.134766 1.0175781 z M 11.025391 2.5136719 C 11.921917 2.5488523 12.754993 2.8745885 13.431641 3.421875 C 13.318579 3.4779175 13.200103 3.5164101 13.089844 3.5800781 L 9.0761719 5.8964844 C 8.7701719 6.0724844 8.5801719 6.3989531 8.5761719 6.7519531 L 8.5175781 12.238281 L 6.75 11.189453 L 6.75 6.7851562 C 6.75 4.6491563 8.3075938 2.74225 10.433594 2.53125 C 10.632969 2.5115 10.83048 2.5060234 11.025391 2.5136719 z M 16.125 4.2558594 C 17.398584 4.263418 18.639844 4.8251563 19.417969 5.9101562 C 20.070858 6.819587 20.310242 7.9019929 20.146484 8.9472656 C 20.041416 8.8773528 19.948163 8.794144 19.837891 8.7304688 L 15.826172 6.4140625 C 15.520172 6.2380625 15.143937 6.2352031 14.835938 6.4082031 L 10.052734 9.1035156 L 10.076172 7.0488281 L 13.890625 4.8476562 C 14.584375 4.4471562 15.36085 4.2513242 16.125 4.2558594 z M 5.2832031 6.4726562 C 5.2752078 6.5985272 5.25 6.7203978 5.25 6.8476562 L 5.25 11.480469 C 5.25 11.833469 5.4362344 12.159844 5.7402344 12.339844 L 10.464844 15.136719 L 8.6738281 16.142578 L 4.859375 13.939453 C 3.009375 12.871453 2.1365781 10.567094 3.0175781 8.6210938 C 3.4795583 7.6006836 4.2963697 6.8535791 5.2832031 6.4726562 z M 15.326172 7.8574219 L 19.140625 10.060547 C 20.990625 11.128547 21.865375 13.432906 20.984375 15.378906 C 20.522287 16.399554 19.703941 17.146507 18.716797 17.527344 C 18.724764 17.401695 18.75 17.279375 18.75 17.152344 L 18.75 12.521484 C 18.75 12.167484 18.563766 11.840156 18.259766 11.660156 L 13.535156 8.8632812 L 15.326172 7.8574219 z M 12.025391 9.7109375 L 13.994141 10.878906 L 13.966797 13.167969 L 11.974609 14.287109 L 10.005859 13.121094 L 10.03125 10.832031 L 12.025391 9.7109375 z M 15.482422 11.761719 L 17.25 12.810547 L 17.25 17.214844 C 17.25 19.350844 15.692406 21.25775 13.566406 21.46875 C 12.449968 21.579344 11.392114 21.244395 10.568359 20.578125 C 10.681421 20.522082 10.799897 20.48359 10.910156 20.419922 L 14.923828 18.103516 C 15.229828 17.927516 15.419828 17.601047 15.423828 17.248047 L 15.482422 11.761719 z M 13.947266 14.896484 L 13.923828 16.951172 L 10.109375 19.152344 C 8.259375 20.220344 5.8270313 19.825844 4.5820312 18.089844 C 3.9291425 17.180413 3.6897576 16.098007 3.8535156 15.052734 C 3.9587303 15.122795 4.0516754 15.205719 4.1621094 15.269531 L 8.1738281 17.585938 C 8.4798281 17.761938 8.8560625 17.764797 9.1640625 17.591797 L 13.947266 14.896484 z"
          }
        )
      ]
    }
  );
};
const AISettingsPage = () => {
  const {
    doubaoApiKey,
    doubaoModelId,
    deepseekApiKey,
    openaiApiKey,
    openaiModelId,
    openaiApiEndpoint,
    geminiApiKey,
    geminiModelId,
    setDoubaoApiKey,
    setDoubaoModelId,
    setDeepseekApiKey,
    setOpenaiApiKey,
    setOpenaiModelId,
    setOpenaiApiEndpoint,
    setGeminiApiKey,
    setGeminiModelId,
    selectedModel,
    setSelectedModel
  } = useAIConfigStore();
  const [currentModel, setCurrentModel] = useState(selectedModel);
  const t = useTranslations();
  useEffect(() => {
    setCurrentModel(selectedModel);
  }, [selectedModel]);
  const handleApiKeyChange = async (e, type) => {
    const newApiKey = e.target.value;
    if (type === "doubao") {
      setDoubaoApiKey(newApiKey);
    } else if (type === "deepseek") {
      setDeepseekApiKey(newApiKey);
    } else if (type === "gemini") {
      setGeminiApiKey(newApiKey);
    } else {
      setOpenaiApiKey(newApiKey);
    }
  };
  const handleModelIdChange = async (e, type) => {
    const newModelId = e.target.value;
    if (type === "doubao") {
      setDoubaoModelId(newModelId);
    } else if (type === "openai") {
      setOpenaiModelId(newModelId);
    } else if (type === "gemini") {
      setGeminiModelId(newModelId);
    }
  };
  const handleApiEndpointChange = async (e, type) => {
    const newApiEndpoint = e.target.value;
    {
      setOpenaiApiEndpoint(newApiEndpoint);
    }
  };
  const models = [
    {
      id: "deepseek",
      name: t("dashboard.settings.ai.deepseek.title"),
      description: t("dashboard.settings.ai.deepseek.description"),
      icon: DeepSeekLogo,
      link: "https://platform.deepseek.com",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
      isConfigured: !!deepseekApiKey
    },
    {
      id: "doubao",
      name: t("dashboard.settings.ai.doubao.title"),
      description: t("dashboard.settings.ai.doubao.description"),
      icon: DoubaoLogo,
      link: "https://console.volcengine.com/ark",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
      isConfigured: !!(doubaoApiKey && doubaoModelId)
    },
    {
      id: "openai",
      name: t("dashboard.settings.ai.openai.title"),
      description: t("dashboard.settings.ai.openai.description"),
      icon: OpenAiLogo,
      link: "https://platform.openai.com/api-keys",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
      isConfigured: !!(openaiApiKey && openaiModelId && openaiApiEndpoint)
    },
    {
      id: "gemini",
      name: t("dashboard.settings.ai.gemini.title"),
      description: t("dashboard.settings.ai.gemini.description"),
      icon: Sparkles,
      link: "https://aistudio.google.com/app/apikey",
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/50",
      isConfigured: !!(geminiApiKey && geminiModelId)
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "mx-auto py-4 px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "w-64 space-y-6", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-1", children: models.map((model) => {
      const Icon = model.icon;
      const isChecked = selectedModel === model.id;
      const isViewing = currentModel === model.id;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => {
            setCurrentModel(model.id);
          },
          className: cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left border",
            "transition-all duration-200 cursor-pointer",
            "hover:bg-primary/10 hover:border-primary/30",
            isViewing ? "bg-primary/10 border-primary/40" : "border-transparent"
          ),
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "shrink-0",
                  isViewing ? "text-primary" : "text-muted-foreground"
                ),
                children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 flex flex-col items-start", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "font-medium text-sm",
                    isViewing && "text-primary"
                  ),
                  children: model.name
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground truncate w-full", children: model.isConfigured ? t("common.configured") : t("common.notConfigured") })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "aria-label": `Select ${model.name}`,
                onClick: () => {
                  setSelectedModel(
                    model.id
                  );
                  setCurrentModel(
                    model.id
                  );
                },
                className: cn(
                  "h-6 w-6 rounded-md flex items-center justify-center border transition-all",
                  "shrink-0",
                  isChecked ? "bg-primary border-primary text-primary-foreground" : "bg-transparent border-muted-foreground/40 text-transparent hover:border-primary/40"
                ),
                children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" })
              }
            )
          ]
        },
        model.id
      );
    }) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 max-w-2xl", children: models.map(
      (model) => model.id === currentModel && /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: cn("shrink-0", model.color), children: /* @__PURE__ */ jsx(model.icon, { className: "h-6 w-6" }) }),
            model.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: model.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(Label, { className: "text-base font-medium", children: t(`dashboard.settings.ai.${model.id}.apiKey`) }),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: model.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-xs text-muted-foreground hover:text-primary flex items-center gap-1",
                  children: [
                    t("dashboard.settings.ai.getApiKey"),
                    /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: model.id === "doubao" ? doubaoApiKey : model.id === "openai" ? openaiApiKey : model.id === "gemini" ? geminiApiKey : deepseekApiKey,
                onChange: (e) => handleApiKeyChange(
                  e,
                  model.id
                ),
                type: "password",
                placeholder: t(
                  `dashboard.settings.ai.${model.id}.apiKey`
                ),
                className: cn(
                  "h-11",
                  "bg-white dark:bg-gray-900",
                  "border-gray-200 dark:border-gray-800",
                  "focus:ring-2 focus:ring-primary/20"
                )
              }
            )
          ] }),
          model.id === "doubao" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-base font-medium", children: t("dashboard.settings.ai.doubao.modelId") }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: doubaoModelId,
                onChange: (e) => handleModelIdChange(e, "doubao"),
                placeholder: t(
                  "dashboard.settings.ai.doubao.modelId"
                ),
                className: cn(
                  "h-11",
                  "bg-white dark:bg-gray-900",
                  "border-gray-200 dark:border-gray-800",
                  "focus:ring-2 focus:ring-primary/20"
                )
              }
            )
          ] }),
          model.id === "openai" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-base font-medium", children: t("dashboard.settings.ai.openai.modelId") }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: openaiModelId,
                onChange: (e) => handleModelIdChange(e, "openai"),
                placeholder: t(
                  "dashboard.settings.ai.openai.modelId"
                ),
                className: cn(
                  "h-11",
                  "bg-white dark:bg-gray-900",
                  "border-gray-200 dark:border-gray-800",
                  "focus:ring-2 focus:ring-primary/20"
                )
              }
            )
          ] }),
          model.id === "gemini" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-base font-medium", children: t("dashboard.settings.ai.gemini.modelId") }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: geminiModelId,
                onChange: (e) => handleModelIdChange(e, "gemini"),
                placeholder: t("dashboard.settings.ai.gemini.modelId"),
                className: cn(
                  "h-11",
                  "bg-white dark:bg-gray-900",
                  "border-gray-200 dark:border-gray-800",
                  "focus:ring-2 focus:ring-primary/20"
                )
              }
            )
          ] }),
          model.id === "openai" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-base font-medium", children: t("dashboard.settings.ai.openai.apiEndpoint") }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: openaiApiEndpoint,
                onChange: (e) => handleApiEndpointChange(e),
                placeholder: t(
                  "dashboard.settings.ai.openai.apiEndpoint"
                ),
                className: cn(
                  "h-11",
                  "bg-white dark:bg-gray-900",
                  "border-gray-200 dark:border-gray-800",
                  "focus:ring-2 focus:ring-primary/20"
                )
              }
            )
          ] })
        ] })
      ] }, model.id)
    ) })
  ] }) });
};
const SplitComponent = AISettingsPage;
export {
  SplitComponent as component
};
