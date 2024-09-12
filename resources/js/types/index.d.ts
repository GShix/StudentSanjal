export interface User {
    id: number;
    profile_image: File | null;
    banner_image: File | null;
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
        latest_note:any;
    };
    otherUsers:any;
    latest_posts:any;
    flash: any;
    allUsers:any;
    user:any;
    chats:any
};
