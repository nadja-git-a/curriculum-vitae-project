type UserRole = "Employee" | "Admin";

type Mastery = "Novice" | "Advanced" | "Competent" | "Proficient" | "Expert";

type Proficiency = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";

export interface BaseEntity {
  id: string;
  created_at: string;
}

export interface Named {
  name: string;
}

export interface TimePeriod {
  start_date: string;
  end_date: string | null;
}

export interface User extends BaseEntity {
  email: string;
  is_verified: boolean;
  profile: Profile;
  cvs: Cv[];
  department: Department;
  department_name: string | null;
  position: Position;
  position_name: string | null;
  role: UserRole;
}

export interface Profile extends BaseEntity {
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  avatar: string | null;
  skills: SkillMastery[];
  languages: LanguageProficiency[];
}

export interface SkillMastery extends Named {
  categoryId: string | null;
  mastery: Mastery;
}

export interface LanguageProficiency extends Named {
  proficiency: Proficiency;
}

export interface Cv extends BaseEntity, Named {
  education: string | null;
  description: string;
  user: User | null;
  projects: CvProject[];
  skills: SkillMastery[];
  languages: LanguageProficiency[];
}

export interface CvProject extends Named, TimePeriod {
  id: string;
  project: Project;
  internal_name: string;
  description: string;
  domain: string;
  environment: string[];
  roles: string[];
  responsibilities: string[];
}

export interface Project extends BaseEntity, Named, TimePeriod {
  internal_name: string;
  domain: string;
  description: string;
  environment: string[];
}

export type Department = BaseEntity & Named;

export type Position = BaseEntity & Named;
