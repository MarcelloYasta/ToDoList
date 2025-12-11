// Ambil elemen dari DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoPriority = document.getElementById('todo-priority');
const todoList = document.getElementById('todo-list');

// Array untuk menyimpan data tugas
let tasks = []; // Ini akan kita isi dari localStorage nanti

// Fungsi untuk menyimpan data ke localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk merender list tugas ke UI
function renderTasks() {
    // Kosongkan list yang ada
    todoList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        // Buat elemen <li> baru
        const listItem = document.createElement('li');
        listItem.classList.add('todo-item', task.priority); // Tambahkan kelas prioritas
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Konten teks tugas
        const taskText = document.createElement('span');
        taskText.classList.add('todo-text');
        taskText.textContent = task.text;
        
        // Tambahkan event listener untuk menandai selesai
        taskText.addEventListener('click', () => {
            toggleComplete(index);
        });

        // Tombol Hapus
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            deleteTask(index);
        });

        // Gabungkan elemen
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    });

    saveTasks(); // Selalu simpan setelah render/perubahan
}

// ---------------------------------------------
// 1. Tambah Tugas (Logic Utama)
// ---------------------------------------------
todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form submit/refresh halaman

    const text = todoInput.value.trim();
    const priority = todoPriority.value;

    if (text !== "") {
        const newTask = {
            id: Date.now(), // ID unik untuk tugas
            text: text,
            priority: priority,
            completed: false
        };

        tasks.push(newTask);
        todoInput.value = ''; // Bersihkan input
        renderTasks();
    }
});

// ---------------------------------------------
// 2. Tandai Selesai (Toggle Complete)
// ---------------------------------------------
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// ---------------------------------------------
// 3. Hapus Tugas
// ---------------------------------------------
function deleteTask(index) {
    // Hapus satu item dari array pada 'index' tertentu
    tasks.splice(index, 1); 
    renderTasks();
}

// ... (Kode sebelumnya)

// ---------------------------------------------
// 4. Muat Tugas dari Local Storage
// ---------------------------------------------
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// Panggil fungsi ini saat aplikasi dimuat pertama kali
function init() {
    loadTasks();
    renderTasks();
}

// Panggil inisialisasi
init();