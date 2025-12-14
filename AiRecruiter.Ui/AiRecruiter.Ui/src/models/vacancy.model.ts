export type Level = 'Intern' | 'Trainee'| 'Junior' | 'Mid' | 'Senior' | 'Lead';

export const reverseLevelMap: Record<Level, number> = {
  Intern: 0,
  Trainee: 1,
  Junior: 2,
  Mid: 3,
  Senior: 4,
  Lead: 5,
};

export const stack = [
  {
    value: 'dotnet',
    title: '.NET',
    children: [
      {
        value: 'dotnet-framework',
        title: '.NET Framework',
      },
      {
        value: 'dotnet-core',
        title: '.NET Core',
      },
      {
        value: 'aspnet',
        title: 'ASP.NET',
      },
      {
        value: 'entity-framework',
        title: 'Entity Framework',
      },
    ],
  },
  {
    value: 'java',
    title: 'Java',
    children: [
      {
        value: 'spring',
        title: 'Spring',
      },
      {
        value: 'hibernate',
        title: 'Hibernate',
      },
      {
        value: 'java-ee',
        title: 'Java EE',
      },
      {
        value: 'maven',
        title: 'Maven',
      },
    ],
  },
  {
    value: 'javascript',
    title: 'JavaScript',
    children: [
      {
        value: 'react',
        title: 'React',
      },
      {
        value: 'angular',
        title: 'Angular',
      },
      {
        value: 'vue',
        title: 'Vue.js',
      },
      {
        value: 'nodejs',
        title: 'Node.js',
      },
      {
        value: 'express',
        title: 'Express',
      },
    ],
  },
  {
    value: 'python',
    title: 'Python',
    children: [
      {
        value: 'django',
        title: 'Django',
      },
      {
        value: 'flask',
        title: 'Flask',
      },
      {
        value: 'fastapi',
        title: 'FastAPI',
      },
    ],
  },
  {
    value: 'php',
    title: 'PHP',
    children: [
      {
        value: 'laravel',
        title: 'Laravel',
      },
      {
        value: 'symfony',
        title: 'Symfony',
      },
      {
        value: 'yii',
        title: 'Yii',
      },
    ],
  },
  {
    value: 'c++',
    title: 'C++',
    children: [
      {
        value: 'qt',
        title: 'Qt',
      },
      {
        value: 'boost',
        title: 'Boost',
      },
    ],
  },
  {
    value: 'mobile',
    title: 'Mobile',
    children: [
      {
        value: 'android',
        title: 'Android',
      },
      {
        value: 'ios',
        title: 'iOS',
      },
      {
        value: 'react-native',
        title: 'React Native',
      },
      {
        value: 'flutter',
        title: 'Flutter',
      },
    ],
  },
];

export interface Vacancy {
    id: number;
    title: string;
    stack: string[];
    level: Level;
    location: string;
    salary: number;
    description?: string;
    minMatchPercent: number;
    maxCandidates: number;
    companyId: number;
}

export interface VacancyCreate {
    title: string;
    stack: string[];
    level: number;
    location: string;
    salary: number;
    description?: string;
    minMatchPercent: number;
    maxCandidates: number;
    companyId: number;
}