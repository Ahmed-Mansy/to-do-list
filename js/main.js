    // Load tasks from localStorage
        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
            const ul = document.getElementById('myUL');
            ul.innerHTML = '';
            
            if (tasks.length === 0) {
                showEmptyState();
            } else {
                tasks.forEach(task => {
                    createTaskElement(task.text, task.checked);
                });
            }
        }

        // Show empty state
        function showEmptyState() {
            const ul = document.getElementById('myUL');
            ul.innerHTML = `
                <div class="empty-state">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                    </svg>
                    <p>No tasks yet. Add one to get started!</p>
                </div>
            `;
        }

        // Save tasks to localStorage
        function saveTasks() {
            const tasks = [];
            const liList = document.querySelectorAll('#myUL li');
            
            liList.forEach(li => {
                if (li.style.display !== 'none') {
                    tasks.push({
                        text: li.childNodes[1].textContent,
                        checked: li.classList.contains('checked')
                    });
                }
            });
            
            localStorage.setItem('todoTasks', JSON.stringify(tasks));
            
            if (tasks.length === 0) {
                showEmptyState();
            }
        }

        // Create a task element
        function createTaskElement(text, isChecked = false) {
            const ul = document.getElementById('myUL');
            
            // Remove empty state if it exists
            const emptyState = ul.querySelector('.empty-state');
            if (emptyState) {
                ul.innerHTML = '';
            }
            
            const li = document.createElement("li");
            const t = document.createTextNode(text);
            li.appendChild(t);
            
            // Add close button
            const span = document.createElement("span");
            const txt = document.createTextNode("×");
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
                    saveTasks();
                }
            });
            
            ul.appendChild(li);
        }

        // Add event listener for close buttons
        document.getElementById('myUL').addEventListener('click', function(e) {
            if (e.target.classList.contains('close')) {
                e.stopPropagation();
                const li = e.target.parentElement;
                li.style.animation = 'fadeIn 0.3s ease-out reverse';
                setTimeout(() => {
                    li.remove();
                    saveTasks();
                }, 300);
            }
        });

        // Add new items
        const addBtn = document.getElementById('addBtn');

        addBtn.addEventListener('click', function() {
            const inputValue = document.getElementById("myInput").value.trim();
            
            if (inputValue === '') {
                document.getElementById("myInput").focus();
                document.getElementById("myInput").style.animation = 'shake 0.5s';
                setTimeout(() => {
                    document.getElementById("myInput").style.animation = '';
                }, 500);
                return;
            }
            
            createTaskElement(inputValue, false);
            saveTasks();
            document.getElementById("myInput").value = "";
            document.getElementById("myInput").focus();
        });

        // Add shake animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);

        // Add item on Enter key press
        document.getElementById("myInput").addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addBtn.click();
            }
        });

        // Load tasks when page loads
        window.addEventListener('DOMContentLoaded', loadTasks);