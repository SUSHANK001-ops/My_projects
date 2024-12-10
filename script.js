document.addEventListener('DOMContentLoaded', () => {
  const addNoteBtn = document.querySelector('.add-note-btn');
  addNoteBtn.addEventListener('click', () => createNote());
  loadNotes();
});

function createNote(content = '', creationTime = null) {
  const note = document.createElement('div');
  note.classList.add('note');
  
  
  const timeString = creationTime || new Date().toLocaleString();

  note.innerHTML = ` 
    <div class="note-time">${timeString}</div>
    <div class="essentials">
      <div class="left_e">
        <i class="save-icon ti ti-device-floppy" title="Save"></i>
      </div>
      <div class="right_e">
        <i class="fill ti ti-heart" title="Favorite"></i>
        <i class="ti ti-trash" title="Delete"></i>
      </div>
    </div>
    <textarea class="note-content">${content}</textarea>
    <div class="inside"></div>
  `;

  document.querySelector('.notes').prepend(note);

  
  note.querySelector('.right_e .fill').addEventListener('click', () => toggleFavorite(note));
  note.querySelector('.left_e .save-icon').addEventListener('click', () => saveNote(note));
  note.querySelector('.right_e .ti-trash').addEventListener('click', () => deleteNote(note));
}

function toggleFavorite(note) {
  const favoriteIcon = note.querySelector('.right_e .fill');
  favoriteIcon.classList.toggle('favorite');
}

function saveNote(note) {
  const saveIcon = note.querySelector('.left_e .save-icon');
  saveIcon.classList.add('saved');
  saveIcon.style.backgroundColor = 'green'; 
  saveAllNotesToLocalStorage();
}

function deleteNote(note) {
  note.remove();
  saveAllNotesToLocalStorage();
}

function saveAllNotesToLocalStorage() {
  const notes = document.querySelectorAll('.note');
  const notesData = Array.from(notes).map(note => {
    const textarea = note.querySelector('.note-content');
    const noteTime = note.querySelector('.note-time').textContent;  
    const isSaved = note.querySelector('.save-icon').classList.contains('saved');
    const isFavorite = note.querySelector('.fill').classList.contains('favorite');
    return { content: textarea.value, saved: isSaved, favorite: isFavorite, createdAt: noteTime };
  });
  
  localStorage.setItem('stickyNotes', JSON.stringify(notesData));
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('stickyNotes') || '[]');
  notes.forEach(noteData => {
  
    createNote(noteData.content, noteData.createdAt);
  });
}
