export default class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = 'active';
    }

    getTitle() {
        return this.title;
    }

    update(updater) {
        Object.assign(this, updater);

        console.log(this);
    }
    
    getInfo() {
        return {title: this.title, description: this.description, dueDate: this.dueDate, priority: this.priority};
    }
}