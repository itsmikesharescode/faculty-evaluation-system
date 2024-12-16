import type { SurveyCreationSchema } from '../routes/(admin)/(logged-in)/admin-questionnaire/create/create-questions-schema';

export type ResultModel<T> = {
  status: number;
  type: string;
  data: T;
};

export type UserMetaData = {
  role: string;
  email: string;
  course: string;
  gender: string;
  suffix: string;
  section: string;
  fullname: string;
  id_number: string;
  year_level: string;
  mobile_number: string;
};

export type EvaluationType = {
  id: number;
  created_at: string;
  admin_id: string;
  is_used: boolean;
  evaluation_data: SurveyCreationSchema;
};

export type AnswerCopyType = {
  sum: number;
  length: number;
  percentage: number;
  headerTitle: string;
};

export type EvaluatedOrigType = {
  id: number;
  created_at: string;
  student_id: string;
  professor_id: string;
  answers_copy: AnswerCopyType[];
};

export type Program = {
  id: number;
  created_at: string;
  name: string;
  code: string;
};

export type EvaluatedType = {
  id: number;
  fullname: string;
  sections: string;
  subjects: string;
  created_at: string;
  department: string;
  student_id: string;
  answers_copy: AnswerCopyType[];
  professor_id: number;
};

export type ProfessorType = {
  id: number;
  created_at: string;
  department: string;
  fullname: string;
  sections: string;
  subjects: string;
  final_grade: string | null;
};

export type StudentType = {
  student_id: string;
  created_at: string;
  user_meta_data: UserMetaData;
};

export interface AdminLayoutQueryType {
  dashboard: { total_evaluated: number; total_professor: number; total_students: number };
  professors: ProfessorType[] | [];
  evaluation_forms: EvaluationType[] | [];
  students: StudentType[] | [];
  programs: Program[] | [];
}

export interface StudentLayoutQueryType {
  evaluation_forms: EvaluationType[] | [];
  evluated_forms: EvaluatedType[] | [];
  professors: ProfessorType[] | [];
}
