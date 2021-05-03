import {Todo} from "./index";

export default class Project {
    constructor(title) {
        this.todoList = [];
        this.title = title;
    }
    get items() {
        return this.todoList;
    }
    get length() {
        return this.todoList.length;
    }

    updateTodo(title, updater) {
        this.todoList.find((item) => item.title == title).update(updater);
    }

    addTodo(title, description, dueDate, priority) {
        let todo = new Todo(title, description, dueDate, priority);
        this.todoList.push(todo);
    }
    removeTodo(title) {
        let itemToRemove = this.todoList.find((item) => item.getTitle() == title);
        this.todoList.splice(this.todoList.indexOf(itemToRemove), 1);
    }
}