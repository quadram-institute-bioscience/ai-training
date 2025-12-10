// IndexedDB setup
let db;
const dbName = 'PromptDB';
const storeName = 'prompts';
let currentPromptId = null;
let easyMDE = null;

const request = indexedDB.open(dbName, 1);

request.onerror = function(event) {
  console.error('Error opening database:', event.target.error);
};

request.onsuccess = function(event) {
  db = event.target.result;
  initializeEditor();
  displayPrompts();
};

request.onupgradeneeded = function(event) {
  db = event.target.result;
  db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
};

// Initialize EasyMDE editor
function initializeEditor() {
  easyMDE = new EasyMDE({
    element: document.getElementById('editor'),
    spellChecker: false,
    status: false,
    toolbar: [
      'bold', 'italic', 'strikethrough', '|',
      'heading-1', 'heading-2', 'heading-3', '|',
      'quote', 'unordered-list', 'ordered-list', '|',
      'link', 'image', '|',
      'preview', 'side-by-side', 'fullscreen'
    ],
    placeholder: 'Start typing your prompt here... The first line will be used as the title.',
    minHeight: '400px',
    autofocus: false,
    sideBySideFullscreen: false
  });
}

// Save prompt to IndexedDB
function savePrompt() {
  const content = easyMDE.value().trim();

  if (!content) {
    showSaveStatus('Cannot save empty prompt', 'error');
    return;
  }

  const lines = content.split('\n');
  const title = lines[0].trim().replace(/^#+\s*/, '') || 'Untitled Prompt';

  showSaveStatus('Saving...', 'saving');

  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

  const prompt = {
    title: title,
    content: content,
    updatedAt: new Date().toISOString()
  };

  let request;
  if (currentPromptId) {
    prompt.id = currentPromptId;
    request = store.put(prompt);
  } else {
    request = store.add(prompt);
  }

  request.onsuccess = function(event) {
    if (!currentPromptId) {
      currentPromptId = event.target.result;
    }
    showSaveStatus('Saved', 'saved');
    setTimeout(() => showSaveStatus('', ''), 2000);
  };

  transaction.oncomplete = function() {
    displayPrompts();
    document.getElementById('deleteBtn').disabled = false;
  };

  transaction.onerror = function() {
    showSaveStatus('Error saving', 'error');
  };
}

// Display prompts in the sidebar
function displayPrompts() {
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);

  const request = store.getAll();

  request.onsuccess = function(event) {
    const prompts = event.target.result;
    const promptList = document.getElementById('promptList');
    promptList.innerHTML = '';

    if (prompts.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'text-muted text-center p-3';
      emptyMessage.innerHTML = '<small>No prompts yet.<br>Click "New" to create one.</small>';
      promptList.appendChild(emptyMessage);
      return;
    }

    prompts.reverse().forEach(function(prompt) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      if (prompt.id === currentPromptId) {
        li.classList.add('active');
      }

      const titleDiv = document.createElement('div');
      titleDiv.className = 'prompt-title';
      titleDiv.textContent = prompt.title || 'Untitled';

      const previewDiv = document.createElement('div');
      previewDiv.className = 'prompt-preview';
      const lines = prompt.content.split('\n');
      const preview = lines.length > 1 ? lines[1] : '';
      previewDiv.textContent = preview.substring(0, 50) + (preview.length > 50 ? '...' : '');

      li.appendChild(titleDiv);
      li.appendChild(previewDiv);

      li.addEventListener('click', function() {
        loadPrompt(prompt.id);
      });

      promptList.appendChild(li);
    });
  };
}

// Load prompt into the editor
function loadPrompt(id) {
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);

  const request = store.get(id);

  request.onsuccess = function(event) {
    const prompt = event.target.result;
    easyMDE.value(prompt.content);
    currentPromptId = id;
    document.getElementById('deleteBtn').disabled = false;
    displayPrompts();
  };
}

// Search prompts
function searchPrompts(query) {
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);

  const request = store.getAll();

  request.onsuccess = function(event) {
    const prompts = event.target.result;
    const filteredPrompts = prompts.filter(function(prompt) {
      return prompt.title.toLowerCase().includes(query.toLowerCase()) ||
             prompt.content.toLowerCase().includes(query.toLowerCase());
    });

    const promptList = document.getElementById('promptList');
    promptList.innerHTML = '';

    if (filteredPrompts.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'text-muted text-center p-3';
      emptyMessage.innerHTML = '<small>No matching prompts</small>';
      promptList.appendChild(emptyMessage);
      return;
    }

    filteredPrompts.reverse().forEach(function(prompt) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      if (prompt.id === currentPromptId) {
        li.classList.add('active');
      }

      const titleDiv = document.createElement('div');
      titleDiv.className = 'prompt-title';
      titleDiv.textContent = prompt.title || 'Untitled';

      const previewDiv = document.createElement('div');
      previewDiv.className = 'prompt-preview';
      const lines = prompt.content.split('\n');
      const preview = lines.length > 1 ? lines[1] : '';
      previewDiv.textContent = preview.substring(0, 50) + (preview.length > 50 ? '...' : '');

      li.appendChild(titleDiv);
      li.appendChild(previewDiv);

      li.addEventListener('click', function() {
        loadPrompt(prompt.id);
      });

      promptList.appendChild(li);
    });
  };
}

// Export prompts to JSON
function exportPrompts() {
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);

  const request = store.getAll();

  request.onsuccess = function(event) {
    const prompts = event.target.result;
    const json = JSON.stringify(prompts, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompts.json';
    a.click();
  };
}

// Import prompts from JSON
function importPrompts() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';

  input.onchange = function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
      const prompts = JSON.parse(reader.result);
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      prompts.forEach(function(prompt) {
        delete prompt.id; // Remove the existing id
        store.add(prompt);
      });

      transaction.oncomplete = function() {
        displayPrompts();
      };
    };

    reader.readAsText(file);
  };

  input.click();
}

// Create new prompt
function newPrompt() {
  currentPromptId = null;
  easyMDE.value('');
  easyMDE.codemirror.focus();
  document.getElementById('deleteBtn').disabled = true;
  displayPrompts();
}

// Delete current prompt
function deletePrompt() {
  if (!currentPromptId) return;

  if (!confirm('Are you sure you want to delete this prompt?')) return;

  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

  store.delete(currentPromptId);

  transaction.oncomplete = function() {
    newPrompt();
    displayPrompts();
    showSaveStatus('Prompt deleted', 'saved');
    setTimeout(() => showSaveStatus('', ''), 2000);
  };
}

// Show save status message
function showSaveStatus(message, type) {
  const statusEl = document.getElementById('saveStatus');
  statusEl.textContent = message;
  statusEl.className = 'ms-3 small ' + type;
}

// Event listeners
const saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', savePrompt);

const newBtn = document.getElementById('newBtn');
newBtn.addEventListener('click', newPrompt);

const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', deletePrompt);

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
  if (searchInput.value === '') {
    displayPrompts();
  } else {
    searchPrompts(searchInput.value);
  }
});

const exportBtn = document.getElementById('exportBtn');
exportBtn.addEventListener('click', exportPrompts);

const importBtn = document.getElementById('importBtn');
importBtn.addEventListener('click', importPrompts);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + S to save
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    savePrompt();
  }
  // Ctrl/Cmd + N to create new prompt
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault();
    newPrompt();
  }
});
