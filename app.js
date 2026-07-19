let notes = [];

function loadNotes() {
    const savedNotes = localStorage.getItem("fluoreNotes");
    return savedNotes ? JSON.parse(savedNotes) : []
}

function saveNote(event) {
    event.preventDefault();

    const title = document.getElementById("noteTitle").value.trim();
    const content = document.getElementById("noteContent").value.trim();

    notes.unshift({
        id: generateId(),
        title: title,
        content: content
    })

    saveNotes();
    renderNotes(); // re-renders notes so that we dont have to refresh after making a note
}

function generateId() {
    return Date.now().toString()
}

function saveNotes() {
    localStorage.setItem("fluoreNotes", JSON.stringify(notes))
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
        </div>
        `).join('')
}

// note dialog code
function openNoteDialog() {
    const dialog = document.getElementById("noteDialog");
    const titleInput = document.getElementById("noteTitle");
    const contentInput = document.getElementById("noteContent");

    dialog.showModal();
    titleInput.focus(); // making dialog 
}

function closeNoteDialog() {
    document.getElementById("noteDialog").close();
}

//* updates
document.addEventListener("DOMContentLoaded", function() {

    notes = loadNotes() // loads notes
    renderNotes() //* updates note rendering function

    document.getElementById("noteForm").addEventListener("submit", saveNote)

    document.getElementById("noteDialog").addEventListener("click", function(event) {
        if(event.target === this) {    // makes sure dialog closes if clicked in whitespace
            closeNoteDialog();
        }
    });
});