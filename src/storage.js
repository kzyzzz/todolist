import {Project, Todo} from "./index"

export default class Storage {
    
    static removeProject (title) {
        //Code to implement
        concole.log(`removed ${title}`);
        return true;
    }

    static getProject(title) {
        let projectList = Storage.getProjects();

        return projectList.find((item) => item.title == title);
    }

    static addTodo(projectName, title, description, dueDate, priority) {
        
        let projectList = Storage.getProjects();
        projectList.find((project) => project.title == projectName).addTodo(title, description, dueDate, priority);

        Storage.setProjects(projectList);
    }

    static updateProjectTodo(projectName, title, updater) {
        
        let projectList = Storage.getProjects();
        projectList.find((project) => project.title == projectName).updateTodo(title, updater);

        Storage.setProjects(projectList);
    }

    static removeTodo(projectName, title) {
        
        let projectList = Storage.getProjects();
        projectList.find((project) => project.title == projectName).removeTodo(title);

        Storage.setProjects(projectList);
    }

    static getProjects() {
        const projectList = JSON.parse(localStorage.getItem('myProjects'));

        projectList.map((item, index) => {
            projectList[index] = Object.assign(new Project(), item);
        });

        projectList.forEach((project) =>{
            project.items.map((item, index) =>{
                project.items[index] = Object.assign(new Todo(), item);
            });
        });

        return projectList;

    }

    static setProjects(projectList) {
        localStorage.setItem('myProjects', JSON.stringify(projectList));
    }
}