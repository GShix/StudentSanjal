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
    skill_id:number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        latest_chat:any;
        latest_note:any;
        recommendingUsers:any;
        usersYouFollowed:any;
    };
    event:any;
    host:any;
    following:any;
    followers:any;
    his_posts:any;
    skills:number[];
    otherUsers:any;
    latest_posts:any;
    flash: any;
    allUsers:any;
    user:any;
    chats:any;
    firstTwoFollowers:any;
    remainingCount:number;
    events:any;
};
