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

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
      detailsCV: typeof detailsCV;
      language: typeof language;
      login: typeof login;
      previewCV: typeof previewCV;
      projectsCV: typeof projectsCV;
      signUp: typeof signUp;
      skills: typeof skills;
      userProfile: typeof userProfile;
      users: typeof users;
      usersCVs: typeof usersCVs;
    };
  }
}
