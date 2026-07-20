let notes = [];
let editingNoteId = null

function loadNotes() {
    const savedNotes = localStorage.getItem("fluoreNotes");
    return savedNotes ? JSON.parse(savedNotes) : []
}

function saveNote(event) {
    event.preventDefault();

    const title = document.getElementById("noteTitle").value.trim();
    const content = document.getElementById("noteContent").value.trim();

    if(editingNoteId) {
        // update existing note

        const noteIndex = notes.findIndex(note => note.id === editingNoteId)
        notes[noteIndex] = {
            ...notes[noteIndex],
            title:title,
            content: content
        }
    }

    else {
        notes.unshift({
            id: generateId(),
            title: title,
            content: content
        })
    }

    closeNoteDialog()
    saveNotes();
    renderNotes(); // re-renders notes so that we dont have to refresh after making a note
}

function generateId() {
    return Date.now().toString()
}

function saveNotes() {
    localStorage.setItem("fluoreNotes", JSON.stringify(notes))
}

function deleteNote(noteId) {
    notes = notes.filter(note => note.id !== noteId);
    saveNotes();
    renderNotes();
}

function renderNotes() {
    const notesContainer = document.getElementById("notesContainer");

    if(notes.length === 0) {
        // show some fallback elements for empty space
        notesContainer.innerHTML = `
        <div class="empty-state">
            <h2>Ready to plan your next step?</h2>
            <button class="add-note-btn" onclick="openNoteDialog()">+ Add your first note</button>
        </div>
        `
        return
    }

    // displaying notes
    notesContainer.innerHTML = notes.map(note => `
        <div class="note-card">
            <h3 class="note-title">${note.title}</h3>
            <p class="note-content">${note.content}</p>
            <div class="note-actions">
                <button class="edit-btn" onclick="openNoteDialog('${note.id}')" title="Edit Note">
                    <svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor">
                        <path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/>
                    </svg>
                </button>
                <button class="delete-btn" onclick="deleteNote('${note.id}')" title="Delete Note">
                    <svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor">
                        <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/>
                    </svg>
                </button>
            </div>
        </div>
        `).join('')
}

// note dialog code
function openNoteDialog(noteId = null) {
    const dialog = document.getElementById("noteDialog");
    const titleInput = document.getElementById("noteTitle");
    const contentInput = document.getElementById("noteContent");

    if(noteId) {
        // edit note
        const noteToEdit = notes.find(note => note.id === noteId)
        editingNoteId = noteId
        document.getElementById('dialogTitle').textContent = 'Edit Note'
        titleInput.value = noteToEdit.title
        contentInput.value = noteToEdit.content
    }
    else {
        // add note
        editingNoteId = null
        document.getElementById('dialogTitle').textContent = 'Add New Note'
        titleInput.value = ''
        contentInput.value = ''
    }

    dialog.showModal();
    titleInput.focus(); // making dialog 
}

function closeNoteDialog() {
    document.getElementById("noteDialog").close();
}

function ToggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme',isDark ? 'dark' : 'light');
    document.getElementById('themeToggleBtn').textContent = isDark ? '🏙️' : '🌆'
}

function applyStoredTheme() {
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme')
        document.getElementById('themeToggleBtn').textContent = '🏙️'
    }
}

//* updates
document.addEventListener("DOMContentLoaded", function() {

    applyStoredTheme()

    notes = loadNotes() // loads notes
    renderNotes() //* updates note rendering function

    document.getElementById("noteForm").addEventListener("submit", saveNote)
    document.getElementById('themeToggleBtn').addEventListener('click', ToggleTheme)

    document.getElementById("noteDialog").addEventListener("click", function(event) {
        if(event.target === this) {    // makes sure dialog closes if clicked in whitespace
            closeNoteDialog();
        }
    });
});