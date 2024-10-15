/* eslint-disable jsx-a11y/heading-has-content */
'use client';
import { PlusCircle, Copy, Check } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
    getNotes,
    createNote,
    updateNote,
    generateBlogPost,
    generateSocialPost,
} from '@/lib/utils';
import { Note } from '@/types/types';

const customRenderers: Partial<Components> = {
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-4xl font-bold mb-6 mt-8" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="text-3xl font-semibold mb-5 mt-7" {...props}>
            {children}
        </h2>
    ),
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="text-2xl font-semibold mb-4 mt-6" {...props}>
            {children}
        </h3>
    ),
    h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className="text-xl font-semibold mb-3 mt-5" {...props}>
            {children}
        </h4>
    ),
    h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5 className="text-lg font-semibold mb-2 mt-4" {...props}>
            {children}
        </h5>
    ),
    h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6 className="text-base font-semibold mb-2 mt-3" {...props}>
            {children}
        </h6>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="mb-4 text-base leading-relaxed" {...props}>
            {children}
        </p>
    ),
    ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc list-inside mb-4 pl-4" {...props}>
            {children}
        </ul>
    ),
    ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside mb-4 pl-4" {...props}>
            {children}
        </ol>
    ),
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
        <li className="mb-1" {...props}>
            {children}
        </li>
    ),
};

export default function NotesApp() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedStates, setCopiedStates] = useState({ preview: false, post: false });
    const updatingTimeRef = useRef<null | NodeJS.Timeout>(null);
    useEffect(() => {
        getNotes().then((notes: Note[]) => {
            console.log('Notes: ', notes);
            setNotes(notes);
        });
    }, []);
    const createNewNote = async () => {
        const newNote: Note = {
            title: '',
            content: '',
            blogPost: '',
            socialPost: '',
            createdAt: new Date(),
        };
        const apiNote = await createNote(newNote);

        setNotes([apiNote, ...notes]);
        setActiveNote(apiNote);
    };

    const updateActiveNote = (field: keyof Note, value: string) => {
        if (activeNote) {
            const updatedNote = { ...activeNote, [field]: value };
            setActiveNote(updatedNote);
            setNotes(notes.map((note) => (note._id === activeNote._id ? updatedNote : note)));
            console.log('update');
            if (updatingTimeRef.current) {
                console.log('CLEAR TIMEOUT');

                clearTimeout(updatingTimeRef.current);
            }
            console.log('API TIMEOUT');
            updatingTimeRef.current = setTimeout(() => {
                console.log('Running timeout');
                updateNote(updatedNote);
            }, 500);
        }
    };

    const generateText = async (type: 'blogPost' | 'socialPost') => {
        if (!activeNote) return;
        setIsLoading(true);
        console.log('type: ', type);
        let generated;
        if (type === 'blogPost') {
            generated = await generateBlogPost(activeNote);
        } else {
            generated = await generateSocialPost(activeNote);
        }
        console.log('generated: ', generated);
        updateActiveNote(type === 'blogPost' ? 'blogPost' : 'socialPost', generated?.aiOutput);
        setIsLoading(false);
    };

    const copyToClipboard = async (content: string, type: 'preview' | 'post') => {
        await navigator.clipboard.writeText(content);
        setCopiedStates({ ...copiedStates, [type]: true });
        setTimeout(() => setCopiedStates({ ...copiedStates, [type]: false }), 2000);
    };

    return (
        <div className="flex flex-col h-screen">
            <nav className="flex justify-between items-center p-4 bg-primary text-primary-foreground">
                <h1 className="text-2xl font-bold">Devblog AI</h1>
                <Button onClick={createNewNote} variant="secondary">
                    <PlusCircle className="mr-2 h-4 w-4" /> New Note
                </Button>
            </nav>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/4 bg-secondary p-4 overflow-auto">
                    <ScrollArea className="h-full">
                        {notes.map((note) => (
                            <Card
                                key={note._id}
                                className="mb-2 cursor-pointer hover:bg-secondary-foreground/10"
                                onClick={() => setActiveNote(note)}
                            >
                                <CardContent className="p-2">
                                    <h3 className="font-semibold truncate">
                                        {note.title || 'Sin título'}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {note.createdAt.toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </ScrollArea>
                </div>
                <div className="w-3/4 p-4">
                    {activeNote ? (
                        <Tabs defaultValue="edit" className="w-full">
                            <TabsList className="mb-4">
                                <TabsTrigger value="edit">Raw Notes</TabsTrigger>
                                <TabsTrigger value="preview">Blog Post</TabsTrigger>
                                <TabsTrigger value="post">Social Post</TabsTrigger>
                            </TabsList>
                            <TabsContent value="edit">
                                <div className="space-y-4">
                                    <Input
                                        placeholder="Título de la nota"
                                        value={activeNote.title}
                                        onChange={(e) => updateActiveNote('title', e.target.value)}
                                        className="w-full"
                                    />
                                    <Textarea
                                        placeholder="Escribe tu nota en markdown aquí"
                                        value={activeNote.content}
                                        onChange={(e) =>
                                            updateActiveNote('content', e.target.value)
                                        }
                                        className="w-full h-[calc(100vh-300px)]"
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="preview">
                                <div className="space-y-4">
                                    <div className="prose dark:prose-invert max-w-none border p-4 rounded-md overflow-y-auto h-[calc(100vh-300px)]">
                                        <ReactMarkdown components={customRenderers}>
                                            {activeNote.blogPost ||
                                                'No hay contenido generado aún.'}
                                        </ReactMarkdown>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            onClick={() => generateText('blogPost')}
                                            disabled={isLoading}
                                        >
                                            Generar vista previa
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                copyToClipboard(activeNote.blogPost, 'preview')
                                            }
                                            disabled={!activeNote.blogPost}
                                        >
                                            {copiedStates.preview ? (
                                                <Check className="h-4 w-4 mr-2" />
                                            ) : (
                                                <Copy className="h-4 w-4 mr-2" />
                                            )}
                                            {copiedStates.preview ? 'Copiado' : 'Copiar contenido'}
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="post">
                                <div className="space-y-4">
                                    <Textarea
                                        placeholder="Contenido del post para redes sociales"
                                        value={activeNote.socialPost}
                                        onChange={(e) =>
                                            updateActiveNote('socialPost', e.target.value)
                                        }
                                        className="w-full h-[calc(100vh-300px)]"
                                    />
                                    <div className="flex space-x-2">
                                        <Button
                                            onClick={() => generateText('socialPost')}
                                            disabled={isLoading}
                                        >
                                            Generate social post
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                copyToClipboard(activeNote.socialPost, 'post')
                                            }
                                            disabled={!activeNote.socialPost}
                                        >
                                            {copiedStates.post ? (
                                                <Check className="h-4 w-4 mr-2" />
                                            ) : (
                                                <Copy className="h-4 w-4 mr-2" />
                                            )}
                                            {copiedStates.post ? 'Copiado' : 'Copiar contenido'}
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground">
                                Selecciona una nota o crea una nueva
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
