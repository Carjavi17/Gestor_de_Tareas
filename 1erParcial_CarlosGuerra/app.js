const app = new Vue({
    el: '#app',
    data: {
        tasks: tasks,
        newTask: '',
        searchQuery: '',
        filteredPendingTasks: [],
        filteredCompletedTasks: [],
    },
    computed: {
        pendingTasks() {
            return this.tasks.filter(task => !task.completed);
        },
        completedTasks() {
            return this.tasks.filter(task => task.completed);
        },
    },
    methods: {
        addTask() {
            if (this.newTask.trim() !== '') {
                const newTask = {
                    name: this.newTask,
                    completed: false,
                    editing:false
                };
                this.tasks.push(newTask);
                this.newTask = '';
        
                this.filteredPendingTasks = this.tasks.filter(task => !task.completed);
                this.filteredCompletedTasks = this.tasks.filter(task => task.completed);
            }
        },
        
        toggleTaskStatus(task) {
            task.completed = !task.completed;
            this.filteredPendingTasks = this.tasks.filter(task => !task.completed);
            this.filteredCompletedTasks = this.tasks.filter(task => task.completed);
        },
        deleteTask(taskToDelete) {
            const index = this.tasks.indexOf(taskToDelete);
            if (index > -1) {
                this.tasks.splice(index, 1);
            }
            this.filteredPendingTasks = this.tasks.filter(task => !task.completed);
            this.filteredCompletedTasks = this.tasks.filter(task => task.completed);
        },
        editTask(task) {
            task.editing = true;
        },
        
        saveTask(task) {
            task.editing = false;
        },
        filterTasks() {
            const searchTerm = this.searchQuery.toLowerCase();
            if (!searchTerm) {
                this.filteredPendingTasks = this.tasks.filter(task => !task.completed);
                this.filteredCompletedTasks = this.tasks.filter(task => task.completed);
            } else {
                this.filteredPendingTasks = this.tasks.filter(task =>
                    task.name.toLowerCase().includes(searchTerm) && !task.completed
                );
                this.filteredCompletedTasks = this.tasks.filter(task =>
                    task.name.toLowerCase().includes(searchTerm) && task.completed
                );
            }
        },             
    },
    created() {
        this.filteredPendingTasks = this.tasks.filter(task => !task.completed);
        this.filteredCompletedTasks = this.tasks.filter(task => task.completed);
    }
});



