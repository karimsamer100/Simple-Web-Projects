// Main variables to store tasks and current selections
let todos = [];
let currentFilter = 'all';
let selectedPriority = 'medium';
let selectedCategory = 'personal';
let editingTaskId = null;

// Load saved tasks when page loads
try {
    const saved = localStorage.getItem('myTodoList');
    if (saved) todos = JSON.parse(saved) || [];
} catch (e) {
    todos = [];
}

// Check if dark mode was on last time
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    const tgl = document.querySelector('.theme-toggle');
    if (tgl) tgl.textContent = '☀️';
}

// Setup the priority button clicks
function initPriorityButtons() {
    document.querySelectorAll('.priority-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.priority-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedPriority = this.dataset.priority;
        });
    });

    // ensure UI initial active matches selectedPriority variable
    const activeBtn = document.querySelector(`.priority-btn[data-priority="${selectedPriority}"]`);
    if (activeBtn) {
        document.querySelectorAll('.priority-btn').forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
    }
}

// category select
const categorySelectEl = document.getElementById('categorySelect');
if (categorySelectEl) {
    categorySelectEl.addEventListener('change', function() {
        selectedCategory = this.value;
    });
    // set initial category value in DOM
    categorySelectEl.value = selectedCategory;
}

// enter key to add task
const taskInputEl = document.getElementById('taskInput');
if (taskInputEl) {
    taskInputEl.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
}

// search tasks
const searchInputEl = document.getElementById('searchInput');
if (searchInputEl) {
    searchInputEl.addEventListener('input', function(e) {
        displayTasks(e.target.value.toLowerCase());
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
}

function addTask() {
    const input = document.getElementById('taskInput');
    if (!input) return;
    const taskText = input.value.trim();
    
    if (taskText === '') {
        return;
    }

    if (editingTaskId !== null) {
        // editing existing task
        const task = todos.find(t => t.id === editingTaskId);
        if (task) {
            task.text = taskText;
            task.priority = selectedPriority;
            task.category = selectedCategory;
            task.updatedAt = Date.now();
        }
        editingTaskId = null;
        const btn = document.querySelector('.add-btn');
        if (btn) btn.textContent = 'Add Task';
    } else {
        // new task
        const now = Date.now();
        const newTask = {
            id: now,
            text: taskText,
            completed: false,
            priority: selectedPriority,
            category: selectedCategory,
            createdAt: now
        };
        // push to front (newest first)
        todos.unshift(newTask);
    }

    saveToStorage();
    input.value = '';
    displayTasks(document.getElementById('searchInput').value.toLowerCase());
}

function toggleComplete(id) {
    const task = todos.find(t => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    // keep ordering but update timestamp for stable sort if needed
    task.updatedAt = Date.now();
    saveToStorage();
    displayTasks(document.getElementById('searchInput').value.toLowerCase());
}

function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    todos = todos.filter(t => t.id !== id);
    saveToStorage();
    displayTasks(document.getElementById('searchInput').value.toLowerCase());
}

function editTask(id) {
    const task = todos.find(t => t.id === id);
    if (!task) return;
    const input = document.getElementById('taskInput');
    if (!input) return;
    input.value = task.text;
    input.focus();
    
    // set priority UI
    document.querySelectorAll('.priority-btn').forEach(b => b.classList.remove('active'));
    const pBtn = document.querySelector(`[data-priority="${task.priority}"]`);
    if (pBtn) pBtn.classList.add('active');
    selectedPriority = task.priority || 'medium';
    
    // set category
    const cat = document.getElementById('categorySelect');
    if (cat) {
        cat.value = task.category || 'personal';
        selectedCategory = cat.value;
    }
    
    editingTaskId = id;
    const btn = document.querySelector('.add-btn');
    if (btn) btn.textContent = 'Update';
    // keep the current tab/filter; the user can update and hit Update
}

// filterTasks now accepts the clicked element to manage active state
function filterTasks(filter, clickedEl) {
    if (typeof filter !== 'string') return;
    currentFilter = filter;

    // manage active class on tabs
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (clickedEl && clickedEl.classList) {
        clickedEl.classList.add('active');
    } else {
        // fallback: try to set active based on filter value
        const mapping = { all: 0, active: 1, completed: 2 };
        const buttons = document.querySelectorAll('.filter-tabs .tab-btn');
        const idx = mapping[filter];
        if (typeof idx === 'number' && buttons[idx]) buttons[idx].classList.add('active');
    }

    displayTasks(document.getElementById('searchInput').value.toLowerCase());
}

function clearCompleted() {
    const completedTasks = todos.filter(t => t.completed);
    if (completedTasks.length === 0) {
        alert('No completed tasks to clear');
        return;
    }
    if (confirm(`Delete ${completedTasks.length} completed tasks?`)) {
        todos = todos.filter(t => !t.completed);
        saveToStorage();
        displayTasks(document.getElementById('searchInput').value.toLowerCase());
    }
}

function exportTasks() {
    if (todos.length === 0) {
        alert('No tasks to export');
        return;
    }
    
    let exportText = 'My Tasks Export\n';
    exportText += '===============\n\n';
    
    todos.forEach(task => {
        const checkbox = task.completed ? '[x]' : '[ ]';
        const created = task.createdAt ? new Date(task.createdAt).toLocaleString() : 'Unknown';
        exportText += `${checkbox} ${task.text}\n`;
        exportText += `   Category: ${task.category} | Priority: ${task.priority}\n`;
        exportText += `   Created: ${created}\n\n`;
    });
    
    const file = new Blob([exportText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = 'my-tasks.txt';
    link.click();
}

// Sort tasks by different criteria (newest, oldest, priority, name)
function sortTasks(tasks) {
    const sortBy = (document.getElementById('sortSelect') || {}).value || 'newest';
    const arr = tasks.slice();

    if (sortBy === 'newest') {
        return arr.sort((a, b) => (b.id || b.createdAt || 0) - (a.id || a.createdAt || 0));
    } else if (sortBy === 'oldest') {
        return arr.sort((a, b) => (a.id || a.createdAt || 0) - (b.id || b.createdAt || 0));
    } else if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return arr.sort((a, b) => (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99));
    } else if (sortBy === 'name') {
        return arr.sort((a, b) => a.text.localeCompare(b.text));
    }
    
    return arr;
}

function displayTasks(searchText = '') {
    const container = document.getElementById('taskList');
    if (!container) return;
    
    let filtered = todos.slice();
    
    // filter by status
    if (currentFilter === 'active') {
        filtered = filtered.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }
    
    // filter by search
    if (searchText) {
        filtered = filtered.filter(t => t.text.toLowerCase().includes(searchText));
    }
    
    filtered = sortTasks(filtered);
    
    // update stats
    const totalTasks = todos.length;
    const activeTasks = todos.filter(t => !t.completed).length;
    const completedTasks = todos.filter(t => t.completed).length;
    
    document.getElementById('totalCount').textContent = totalTasks;
    document.getElementById('activeCount').textContent = activeTasks;
    document.getElementById('completedCount').textContent = completedTasks;
    
    // show empty message
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-msg">
                <div class="empty-icon">📋</div>
                <p>${searchText ? 'No matching tasks found' : 'No tasks yet. Add one above!'}</p>
            </div>
        `;
        return;
    }
    
    // display tasks
    container.innerHTML = '';
    filtered.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'done' : ''} priority-${task.priority}`;
        
        let priorityColor = '#3498db';
        if (task.priority === 'high') priorityColor = '#e74c3c';
        if (task.priority === 'medium') priorityColor = '#f39c12';
        
        const createdDate = task.createdAt ? new Date(task.createdAt).toLocaleDateString() : '';
        const createdTime = task.createdAt ? new Date(task.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
        
        taskDiv.innerHTML = `
            <input type="checkbox" class="task-check" 
                   ${task.completed ? 'checked' : ''} 
                   onchange="toggleComplete(${task.id})">
            <div class="task-info">
                <div class="task-name">${escapeHtml(task.text)}</div>
                <div class="task-details">
                    <span class="task-category">${escapeHtml(task.category)}</span>
                    <span>${createdDate}</span>
                    <span>${createdTime}</span>
                    <span class="task-priority" style="color: ${priorityColor}">${task.priority}</span>
                </div>
            </div>
            <div class="task-buttons">
                <button class="task-btn edit" onclick="editTask(${task.id})">Edit</button>
                <button class="task-btn delete" onclick="deleteTask(${task.id})">Del</button>
            </div>
        `;
        
        container.appendChild(taskDiv);
    });
}

// helper to avoid inserting raw HTML in task text
function escapeHtml(unsafe) {
    if (unsafe == null) return '';
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function saveToStorage() {
    try {
        localStorage.setItem('myTodoList', JSON.stringify(todos));
    } catch (e) {
        console.warn('Could not save to localStorage', e);
    }
}

// initialize UI
(function init() {
    initPriorityButtons();
    const cat = document.getElementById('categorySelect');
    if (cat) cat.value = selectedCategory;

    const map = { all: 0, active: 1, completed: 2 };
    const tabs = document.querySelectorAll('.filter-tabs .tab-btn');
    if (tabs && tabs.length > 0) {
        tabs.forEach(t => t.classList.remove('active'));
        const idx = map[currentFilter];
        if (typeof idx === 'number' && tabs[idx]) tabs[idx].classList.add('active');
    }

    // initial display
    displayTasks();
})();
