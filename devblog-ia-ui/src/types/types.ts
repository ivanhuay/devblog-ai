export type Note = {
    _id?: string;
    title: string;
    content: string;
    blogPost: string;
    socialPost: string;
    createdAt: Date;
};

export type APINote = {
    _id?: string;
    title: string;
    content: string;
    blogPost: string;
    socialPost: string;
    createdAt: string;
};

export type APIAIResp = {
    aiOutput: string;
};
