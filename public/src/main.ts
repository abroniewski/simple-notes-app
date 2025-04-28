interface Note {
    id: string;
    text: string;
    createdAt: Date;
}

class NotesApp {
    private notes: Note[] = [];
    private inputElement: HTMLInputElement;
    private notesListElement: HTMLElement;

    constructor() {
        this.inputElement = document.querySelector('input') as HTMLInputElement;
        this.notesListElement = document.getElementById('notes-list') as HTMLElement;
        
        // Load notes from localStorage
        this.loadNotes();
        
        // Add event listeners
        document.querySelector('button')?.addEventListener('click', () => this.addNote());
        this.inputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addNote();
        });
    }

    private loadNotes(): void {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            this.notes = JSON.parse(savedNotes).map((note: any) => ({
                ...note,
                createdAt: new Date(note.createdAt)
            }));
            this.renderNotes();
        }
    }

    private saveNotes(): void {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    private addNote(): void {
        const text = this.inputElement.value.trim();
        if (!text) return;

        const note: Note = {
            id: crypto.randomUUID(),
            text,
            createdAt: new Date()
        };

        this.notes.unshift(note);
        this.saveNotes();
        this.renderNotes();
        this.inputElement.value = '';
    }

    private deleteNote(id: string): void {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    private renderNotes(): void {
        this.notesListElement.innerHTML = this.notes.map(note => `
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <p class="text-gray-800">${note.text}</p>
                <button 
                    class="text-red-500 hover:text-red-700 focus:outline-none"
                    data-note-id="${note.id}"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        `).join('');

        // Add event listeners to delete buttons
        this.notesListElement.querySelectorAll('button[data-note-id]').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = (e.currentTarget as HTMLElement).dataset.noteId;
                if (id) this.deleteNote(id);
            });
        });
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
}); 