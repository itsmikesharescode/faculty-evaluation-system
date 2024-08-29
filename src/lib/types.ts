import type { UserMetadata } from '@supabase/supabase-js';
import type { SurveyCreationSchema } from '../routes/(admin)/(logged-in)/admin-questionnaire/create/create-questions-schema';

export type ResultModel<T> = {
	status: number;
	type: string;
	data: T;
};

//supabase workaround
export type SupabaseJwt = {
	aal: string;
	aud: string;
	email: string;
	exp: number;
	iat: number;
	phone: string;
	role: string;
	session_id: string;
	sub: string;
	amr?: { method: string; timestamp: number }[];
	app_metadata?: {
		provider?: string;
		providers?: string[];
		[key: string]: any;
	};
	is_anonymous?: boolean;
	iss?: string;
	jti?: string;
	nbf?: string;
	user_metadata: UserMetadata;
};

// db types

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

export type EvaluatedType = {
	id: number;
	fullname: string;
	sections: string;
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
};

export type StudentType = {
	student_id: string;
	created_at: string;
	user_meta_data: UserMetaData;
};

export interface Departments {
	bsisDep: ProfessorType[] | [];
	bseDep: ProfessorType[] | [];
	btvtedDep: ProfessorType[] | [];
	domtDep: ProfessorType[] | [];
	dictDep: ProfessorType[] | [];
}

export interface AdminLayoutQueryType {
	professors: Departments | null;
	evaluation_forms: EvaluationType[] | [];
	students: StudentType[] | [];
}

export interface StudentLayoutQueryType {
	evaluation_forms: EvaluationType[] | [];
	evluated_forms: EvaluatedType[] | [];
	professors: ProfessorType[] | [];
}
