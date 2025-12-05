import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import TranslateIcon from "@mui/icons-material/Translate";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import type { ReactNode } from "react";

interface Navigators {
  id: string;
  icon: ReactNode;
  link: string;
  translation:
    | "navigation.employees"
    | "navigation.skills"
    | "navigation.languages"
    | "navigation.cvs";
}

export const navigators: Navigators[] = [
  {
    id: "users",
    icon: <PeopleIcon />,
    link: "/users",
    translation: "navigation.employees",
  },
  {
    id: "skills",
    icon: <TrendingUpIcon />,
    link: "/skills",
    translation: "navigation.skills",
  },
  {
    id: "languages",
    icon: <TranslateIcon />,
    link: "/languages",
    translation: "navigation.languages",
  },
  {
    id: "cvs",
    icon: <DescriptionIcon />,
    link: "/cvs",
    translation: "navigation.cvs",
  },
];
