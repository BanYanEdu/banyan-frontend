export declare enum SocialTag {
    OpenGraph = "open-graph",
    LocalNews = "localnews"
}
export declare enum Policy {
    Friend = "FRIEND",
    Company = "COMPANY",
    Individual = "INDIVIDUAL"
}
export declare const PolicyValueAll = "EVERYONE";
export declare enum PolicyDisplay {
    Friend = "B\u1EA1n b\u00E8",
    Company = "C\u00F4ng ty",
    Publish = "C\u00F4ng khai",
    CompanyFriend = "C\u00F4ng ty v\u00E0 b\u1EA1n b\u00E8",
    OnlyMe = "M\u00ECnh t\u00F4i"
}
export declare enum PolicyIcon {
    Friend = "fa-user",
    Company = "fa-cube",
    Publish = "fa-globe",
    category = "fa-users",
    OnlyMe = "fa-lock"
}
export interface PolicyItem {
    policy: Policy;
    display: string;
    member: string;
}
export declare const POLICY_COMPANY: PolicyItem;
export declare const POLICY_FRIEND: {
    policy: Policy;
    display: PolicyDisplay;
    member: string;
};
export declare const POLICY_ME: {
    policy: Policy;
    display: PolicyDisplay;
    member: any;
};
export declare const SHARE_PUBLISH: {
    category: boolean;
    id: number;
    icon: PolicyIcon;
    display: PolicyDisplay;
    value: any[];
};
export declare const SHARE_COMPANY_FRIEND: {
    category: boolean;
    id: number;
    icon: PolicyIcon;
    display: PolicyDisplay;
    value: PolicyItem[];
};
export declare const SHARE_COMPANY: {
    category: boolean;
    id: number;
    icon: PolicyIcon;
    display: PolicyDisplay;
    value: PolicyItem[];
};
export declare const SHARE_FRIEND: {
    category: boolean;
    id: number;
    icon: PolicyIcon;
    display: PolicyDisplay;
    value: {
        policy: Policy;
        display: PolicyDisplay;
        member: string;
    }[];
};
export declare const SHARE_ME: {
    category: boolean;
    id: number;
    icon: PolicyIcon;
    display: PolicyDisplay;
    value: {
        policy: Policy;
        display: PolicyDisplay;
        member: any;
    }[];
};
export interface SocialMember {
    id: any;
    display: string;
    value: PolicyItem[];
    icon: string;
    username?: boolean;
    category?: boolean;
    group?: boolean;
    selected?: boolean;
    active?: boolean;
    _index?: string;
}
export declare const LOCALNEWS = "LOCALNEWS";
export declare const TASKNOTIFY = "TASKNOTIFY";
export declare const PINNEWS = "PINNEWS";
export declare const APP_ACTIVITY = "iSocial-Activity";
export declare const APP_COMMENT = "iSocial-Comment";
