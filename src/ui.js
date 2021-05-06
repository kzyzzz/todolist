import {Storage, Todo} from "./index"

export default class UI {
    static loadProjects() {
        const projectsList = document.getElementById('projects-list');

        projectsList.innerHTML = `<div class="project-title">
                                    <button class="project-button">Today</button>
                                    </div>`;

        Storage.getProjects().forEach(project => {
            projectsList.innerHTML += 
                `<div class="project-title">
                 <button class="project-button">${project}</button>
                 </div>`;
        });

        //project list footer
        projectsList.innerHTML +=
                `<div class="project-add-button">
                    <button><i class="fa fa-plus"></i></button>                                                                 
                </div>
                <div class="project-add-popup">
                    <input type="tetx" placeholder="title">
                    <div class="todo-buttons">
                                <i class="fa fa-check project-add"></i>
                                <i class="fa fa-times project-add"></i>
                    </div>
                </div>`;
                

        UI.initProjectListButtons();
    }

    static loadProjectContent(title) {

        const projectContent = document.getElementById('project-content');
        projectContent.innerHTML  = `<div class="project-title">${title}</div>`;


        if (title == 'Today') {
            let d = new Date;

            let todayDate = d.getFullYear() + '-' + ('0' + (d.getMonth()+1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);

            Storage.getList().forEach((todo) => {

                    if (todo.dueDate == todayDate) {
                               
                        UI.loadTodo(todo);
                    }
            });

            
        }
        else {
            Storage.getList().forEach((todo) => {
            
                if (todo.project == title) {
                    let todoClassName = "todo-item";
                    if (todo.status == 'inactive') todoClassName += " todo-inactive";

                        UI.loadTodo(todo);
                    }
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
        }

        UI.initProjectButtons();
    }

    static loadTodo(todo) {
        
        const projectContent = document.getElementById('project-content');
        let todoClassName = "todo-item";
        if (todo.status == 'inactive') todoClassName += " todo-inactive";
        
                    projectContent.innerHTML += `
                    <div class="${todoClassName}">  

                        <div class="todo-buttons">
                                <i class="fa fa-circle-o"></i>
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
    } 

    static initProjectListButtons() {
        let projectButtons = document.querySelectorAll('.project-button');
        let projectAddButton = document.querySelector('.project-add-button');


        projectButtons.forEach((button) => {
            button.addEventListener('click', (e) =>{
                let projectName = e.target.textContent;

                UI.loadProjectContent(projectName);
            });
        });


        projectAddButton.addEventListener('click', (e) => {
            console.log('click')
            document.querySelector('.project-add-button').classList.add('active');
            document.querySelector('.project-add-popup').classList.add('active');
        });
    }

    
    static initProjectButtons() {

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
                if (e.target.classList.contains('fa-circle-o')) UI.setStatus(e.target, 'inactive');
                if (e.target.classList.contains('fa-check-circle-o')) UI.setStatus(e.target, 'active');
                if (e.target.classList.contains('fa-trash')) UI.removeTodo(e.target);
                if (e.target.classList.contains('fa-check')) UI.addItem(e.target);
                if (e.target.classList.contains('fa-times')) {
                        document.querySelector('.todo-add-button').classList.remove('active');
                        document.querySelector('.todo-add-popup').classList.remove('active');
                    }
            });
        });

        dueDatePicker.forEach((picker) => {
            picker.addEventListener('change', (e) => {

                let dueDate = e.target.value;

                let todoName = e.target.parentElement.parentElement.children[1].textContent;
                let projectName = e.target.parentNode.parentNode.parentNode.firstChild.textContent;

                Storage.updateTodo(todoName, {dueDate});

                UI.loadProjectContent(projectName);
            });
        });
    }

    static addItem(target) {

        console.log(target);
        if (target.classList.contains('project-add')) {
            const input = document.querySelector('.project-add-popup').children[0].value;
            Storage.addProject(input);
            UI.loadProjects();
        }
        else 
        {
            const project = target.parentElement.parentElement.parentElement.firstChild.textContent;
            const input = document.querySelector('.todo-add-popup').children[0].value;

            if (input == '') alert('Please input Todo Title');
            if (input != '') {
                if (Storage.getList().some((todo) => todo.getTitle() == input)) 
                    alert('Please input Unique Todo Title');

                else {
                    Storage.addTodo(input);
                    Storage.updateTodo(input, {project});
                    
                }
            }

            UI.loadProjectContent(project);
        }

    }

    static setStatus(target, status) {

        const todoTitle = target.parentElement.nextElementSibling.textContent;
        const projectName = target.parentElement.parentElement.parentElement.firstChild.textContent;

        Storage.updateTodo(todoTitle, {status});
        UI.loadProjectContent(projectName);
    }

    static removeTodo(target) {

        console.log(target);
        const todo = target.parentElement.parentElement.children[1].textContent;
        const projectName = target.parentElement.parentElement.parentElement.firstChild.textContent;

        Storage.removeTodo(todo);
        UI.loadProjectContent(projectName);
    }


}