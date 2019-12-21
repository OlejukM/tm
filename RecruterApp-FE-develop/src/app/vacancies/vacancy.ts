import { Question } from '../questions/question';

export interface Vacancy {
  author: string;
  created_at?: Date;
  description: string;
  link: string;
  questions: Question[];
  status?: string;
  title: string;
  type: string;
  updatedAt?: Date;
  id?: string;
  __v?: number;
  sorted?: boolean;
}

export interface VacancyUpdate {
  author: string;
  created_at?: Date;
  description: string;
  link: string;
  questions: string[];
  status?: string;
  title: string;
  type: string;
  updatedAt?: Date;
  id?: string;
  __v?: number;
  sorted?: boolean;
}
