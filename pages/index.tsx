import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface Note {
    id: string;
    text: string;
    created_at: string;
}

export default function Home() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await fetch('/api/notes');
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const addNote = async () => {
        const text = inputValue.trim();
        if (!text) return;

        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                const newNote = await response.json();
                setNotes([newNote, ...notes]);
                setInputValue('');
            }
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const deleteNote = async (id: string) => {
        try {
            const response = await fetch(`/api/notes?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setNotes(notes.filter(note => note.id !== id));
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>Simple Notes App</title>
                <meta name="description" content="A simple notes app built with Next.js" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Simple Notes</h1>
                </header>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex gap-4">
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addNote()}
                            placeholder="Type your note here..." 
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                            onClick={addNote}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add Note
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Notes</h2>
                    <div className="space-y-4">
                        {notes.map(note => (
                            <div key={note.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-800">{note.text}</p>
                                <button 
                                    onClick={() => deleteNote(note.id)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 