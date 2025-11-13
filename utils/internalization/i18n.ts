import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

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
  | "usersCVs";

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
    ns: [
      "common",
      "detailsCV",
      "language",
      "login",
      "previewCV",
      "projectsCV",
      "signUp",
      "skills",
      "userProfile",
      "users",
      "usersCVs",
    ],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });
