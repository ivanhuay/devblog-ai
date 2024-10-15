/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Note, APINote } from '@/types/types';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getNotes = () => {
    console.log('API_URL: ', API_URL);
    return axios
        .get<APINote[]>(`${API_URL}/api/notes?sort=-createdAt`)
        .then((resp) => resp.data.map((elm) => ({ ...elm, createdAt: new Date(elm.createdAt) })));
};

export const createNote = (noteData: Note) => {
    console.log('API_URL: ', API_URL);
    return axios
        .post(`${API_URL}/api/notes`, noteData)
        .then((resp) => ({ ...resp.data, createdAt: new Date(resp.data.createdAt) }));
};

export const updateNote = (noteData: Note) => {
    console.log('API_URL: ', API_URL);
    const { createdAt, ...data } = noteData;
    return axios
        .put(`${API_URL}/api/notes/${noteData._id}`, data)
        .then((resp) => ({ ...resp.data, createdAt: new Date(resp.data.createdAt) }));
};

export const generateBlogPost = (noteData: Note) => {
    return axios.post(`${API_URL}/api/generate/${noteData._id}`).then((resp) => resp.data);
};

export const generateSocialPost = (noteData: Note) => {
    return axios.post(`${API_URL}/api/generate-social/${noteData._id}`).then((resp) => resp.data);
};
