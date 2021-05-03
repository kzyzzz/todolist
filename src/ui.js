import {Storage, Project, Todo} from "./index"

export default class UI {
    static loadProjects() {
        const projectsList = document.getElementById('projects-list');

        Storage.getProjects().forEach(element => {
            projectsList.innerHTML += 
                `<div class="project-title">
                 <h1>${element.title}</h1>
                 <button class="project-button">show</button>
                 </div>`;
        });

        UI.initProjectListButtons();
    }

    static loadProjectContent(title) {

        const projectContent = document.getElementById('project-content');
        projectContent.innerHTML  = `<div class="project-title">${title}</div>`;

        Storage.getProject(title).items.forEach((todo) => {
            
           let todoClassName = "todo-item";
           if (todo.status == 'inactive') todoClassName += " todo-inactive";

            projectContent.innerHTML += `
                                        <div class="${todoClassName}">  

                                            <div class="todo-buttons">
                                                    <i class="fa fa-circle-thin"></i>
                                                    <i class="fa fa-check-circle-o"></i>
                                            </div>

                                            
                                            <div>${todo.title}</div>
                                            <div>${todo.description}</div>
                                            <div>${todo.dueDate}</div>
                                            <div><input type="date" class="due-date-picker"></div>

                                            <div class="todo-buttons">
                                                    <i class="fa fa-pencil-square-o"></i>
                                                    <i class="fa fa-trash"></i>
                                            </div>
                                        
                                        </div>`;
        });

        //project footer
        projectContent.innerHTML += `<div class="todo-add-button">
                                        <button><i class="fa fa-plus"></i></button>                                                                 
                                    </div>

                                    <div class="todo-add-popup">
                                        <input type="tetx" placeholder="title">
                                        <div class="todo-buttons">
                                                    <i class="fa fa-check"></i>
                                                    <i class="fa fa-times"></i>
                                        </div>
                                    </div>`;


        UI.initProjectButtons();
    }

    static initProjectListButtons() {
        let projectButtons = document.querySelectorAll('.project-button');

        projectButtons.forEach((button) => {
            button.addEventListener('click', (e) =>{
                let projectName = e.target.previousElementSibling.textContent;

                UI.loadProjectContent(projectName);
            });
        });
    }

    
    static initProjectButtons() {
        let addTodoButtons = document.querySelectorAll('.todo-add-button');
        let removeTodoButtons = document.querySelectorAll('.todo-remove-button');
        let dueDatePicker = document.querySelectorAll('.due-date-picker');
        let todoButtons = document.querySelectorAll('.todo-buttons');
        let todoAddButton = document.querySelector('.todo-add-button');

        todoAddButton.addEventListener('click', (e) => {
            console.log(e.target.lastChild);

            document.querySelector('.todo-add-button').classList.add('active');
            document.querySelector('.todo-add-popup').classList.add('active');
        });

        todoButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                if (e.target.classList.contains('fa-circle-thin')) UI.setStatus(e.target, 'inactive');
                if (e.target.classList.contains('fa-check-circle-o')) UI.setStatus(e.target, 'active');
                if (e.target.classList.contains('fa-trash')) UI.removeTodo(e.target);
            });
        });

        dueDatePicker.forEach((picker) => {
            picker.addEventListener('change', (e) => {

                let dueDate = e.target.value;

                let todoName = e.target.parentNode.parentNode.firstElementChild.textContent;
                let projectName = e.target.parentNode.parentNode.parentNode.firstChild.textContent;

                Storage.updateProjectTodo(projectName, todoName, {dueDate});

                UI.loadProjectContent(projectName);
            });
        });
    }

    static setStatus(target, status) {

        const todo = target.parentElement.nextElementSibling.textContent;
        const projectName = target.parentElement.parentElement.parentElement.firstChild.textContent;

        Storage.updateProjectTodo(projectName, todo, {status});
        UI.loadProjectContent(projectName);
    }

    static removeTodo(target) {

        console.log(target);
        const todo = target.parentElement.parentElement.children[1].textContent;
        const projectName = target.parentElement.parentElement.parentElement.firstChild.textContent;

        Storage.removeTodo(projectName, todo);
        UI.loadProjectContent(projectName);
    }


}