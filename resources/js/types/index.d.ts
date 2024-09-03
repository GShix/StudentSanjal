export interface User {
    id: number;
    profile_image: File | string;
    banner_image: File | string;
    first_name: string;
    middle_name: string;
    last_name: string;
    username: string;
    headline: string;
    dob: string;
    gender: string;
    email: string;
    email_verified_at?: string;
    user_role: string;
    active_status: boolean;
    account_status: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
