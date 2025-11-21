import i18n from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

type Language = "en" | "ru";

type Namespace =
  | "common"
  | "detailsCV"
  | "language"
  | "login"
  | "previewCV"
  | "projectsCV"
  | "signUp"
  | "skills"
  | "userProfile"
  | "users"
  | "usersCVs"
  | "auth"
  | "errors";

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend((lang: Language, ns: Namespace) =>
      fetch(`/locales/${lang}/${ns}.json`).then((res) => res.json())
    )
  )
  .init({
    lng: "en",
    fallbackLng: "en",
    ns: [],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
      bindI18n: "languageChanged loaded",
      bindI18nStore: "added removed",
    },
  });

export default i18n;
