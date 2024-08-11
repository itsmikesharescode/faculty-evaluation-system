import type { UserMetadata } from '@supabase/supabase-js';

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
