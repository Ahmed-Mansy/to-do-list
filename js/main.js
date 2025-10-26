// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
    const ul = document.getElementById('myUL');
    ul.innerHTML = ''; // Clear existing tasks
    
    tasks.forEach(task => {
        createTaskElement(task.text, task.checked);
    });
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const liList = document.querySelectorAll('#myUL li');
    
    liList.forEach(li => {
        if (li.style.display !== 'none') {
            tasks.push({
                text: li.childNodes[0].textContent,
                checked: li.classList.contains('checked')
            });
        }
    });
    
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Create a task element
function createTaskElement(text, isChecked = false) {
    const li = document.createElement("li");
    const t = document.createTextNode(text);
    li.appendChild(t);
    
    // Add close button
    const span = document.createElement("span");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    
    // Add checked class if needed
    if (isChecked) {
        li.classList.add('checked');
    }
    
    // Add click listener to toggle checked state
    li.addEventListener('click', function(e) {
        if (!e.target.classList.contains('close')) {
            e.currentTarget.classList.toggle('checked');
            saveTasks(); // Save when toggled
        }
    });
    
    // Append to list
    document.getElementById("myUL").appendChild(li);
}

// Add event listener for close buttons (using event delegation)
document.getElementById('myUL').addEventListener('click', function(e) {
    if (e.target.classList.contains('close')) {
        e.target.parentElement.style.display = "none";
        saveTasks(); // Save when item is removed
    }
});

// Add new items
const addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function() {
    const inputValue = document.getElementById("myInput").value.trim();
    
    if (inputValue === '') {
        alert('You must write something!');
        return;
    }
    
    // Create new task element
    createTaskElement(inputValue, false);
    
    // Save to localStorage
    saveTasks();
    
    // Clear input
    document.getElementById("myInput").value = "";
});

// Add item on Enter key press
document.getElementById("myInput").addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

// Load tasks when page loads
window.addEventListener('DOMContentLoaded', loadTasks);