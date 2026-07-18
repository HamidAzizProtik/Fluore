let notes = [];


// note dialog code
function openNoteDialog() {
    const dialog = document.getElementById("noteDialog");
    const titleInput = document.getElementById("noteTitle");
    const contentInput = document.getElementById("noteContent");

    dialog.showModal();
    titleInput.focus(); // making dialog 
}

function closeNoteDialog() {
    document.getElementById("noteDialog").close()
}

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("noteDialog").addEventListener("click", function(event) {
        if(event.target === this) {    // makes sure dialog closes if clicked in whitespace
            closeNoteDialog();
        }
    });
});