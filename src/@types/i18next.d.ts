import common from "../../public/locales/en/common.json";
import detailsCV from "../../public/locales/en/detailsCV.json";
import language from "../../public/locales/en/language.json";
import login from "../../public/locales/en/login.json";
import previewCV from "../../public/locales/en/previewCV.json";
import projectsCV from "../../public/locales/en/projectsCV.json";
import signUp from "../../public/locales/en/signUp.json";
import skills from "../../public/locales/en/skills.json";
import userProfile from "../../public/locales/en/userProfile.json";
import users from "../../public/locales/en/users.json";
import usersCVs from "../../public/locales/en/usersCVs.json";

import "i18next";

const resources = {
  common,
  detailsCV,
  language,
  login,
  previewCV,
  projectsCV,
  signUp,
  skills,
  userProfile,
  users,
  usersCVs,
};

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: typeof resources;
  }
}
