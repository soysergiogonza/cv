export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  link: string;
  badge?: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Profile {
  id: string;
  title: string;
  company: string;
  date: string;
  content: string[];
}

export interface HeaderProps {
  header: {
    (key: string): string;
    raw: (key: string) => any;
  };
  t: {
    (key: string): string;
    raw: (key: string) => any;
  };
}

export interface ProfileProps {
  profile: any;
  currentProfile: Profile;
  currentProfileIndex: number;
  totalProfiles: number;
  setCurrentProfileIndex: (index: number) => void;
  t: any;
}

export interface ExperienceProps {
  experience: any;
}

export interface EducationProps {
  education: any;
}

export interface LanguagesProps {
  languages: any;
} 