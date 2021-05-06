import {Todo} from "./index"

export default class Storage {

    static removeProject(title) {
        const newList = [];
        this.todoList.map((todo, index) => {
            if (todo.project != title) {
                newList.push(todo);
            }
        })
        this.todoList = newList;
    }
    static getProjects() {
        return this.projects;
    }

    static addProject(title) {
        if (this.projects.indexOf(title) === -1) this.projects.push(title);
        console.log(this.projects);
    }


    static getList() {
        return this.todoList;
    }

    static getTodo(title) {

        return this.todoList.find((item) => item.getTitle() == title);
    }


    static updateTodo(title, updater) {

        Storage.getTodo(title).update(updater);
        Storage.setTodoList(this.todoList);
    }

    static addTodo(title) {
        let todo = new Todo(title);
        this.todoList.push(todo);

        Storage.setTodoList(this.todoList);
    }

    static removeTodo(title) {
        console.log(this.todoList)
        let itemToRemove = this.todoList.find((todo) => {
            return (todo.getTitle() == title)
        });
        this.todoList.splice(this.todoList.indexOf(itemToRemove), 1);

        Storage.setTodoList(this.todoList);
    }

    static loadTodoList() {
        const savedList = JSON.parse(localStorage.getItem('TodoLis'));
        const projects = ['default'];
        let todoList = [];

        if (savedList != null)  {

            savedList.map((item) => {
                todoList.push(Object.assign(new Todo(), item));
            });

            todoList.map((todo) => {
                if (projects.indexOf(todo.project) === -1) projects.push(todo.project);
            });
            
        }

        this.todoList = todoList;
        this.projects = projects;

        return todoList;
    }

    static setTodoList(todoList) {
        localStorage.setItem('TodoLis', JSON.stringify(todoList));
    }
}