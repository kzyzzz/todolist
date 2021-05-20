export default class Todo {
    constructor(title) {
        this.title = title;
        this.description = 'description';
        this.dueDate = 'No Date';
        this.priority = 'priority';
        this.project = 'default';
        this.status = 'active';
        this.priority = 'not set';
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