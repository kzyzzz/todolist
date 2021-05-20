import {Storage, Todo} from "./index"
import { formatISO, isToday, parseISO } from 'date-fns'

export default class UI {

    static loadProjects() {

        const projectsList = document.getElementById('projects-list');

        Storage.getProjects().forEach(project => {
            let projectDiv = document.createElement('div');
            let projectHeader = document.createElement('div');
            let projectTitle = document.createElement('div');
            let projectItems = document.createElement('div');
            projectItems.classList.add('project-items-counter');
            //style
            projectItems.style.opacity = '0.5';
            
            projectDiv.classList.add('project');
            projectHeader.classList.add('project-button');
            
            projectHeader.classList.add('default-primary-color');
            projectHeader.classList.add('text-primary-color')
            projectHeader.id = project;

            projectTitle.textContent = project;
            projectTitle.classList.add('project-title');
      
            projectHeader.appendChild(projectTitle);
            projectHeader.appendChild(projectItems);
            projectDiv.appendChild(projectHeader);

            projectsList.appendChild(projectDiv);

            UI.loadProjectContent(project);
        });  

        UI.insertAddTodoButton();

        UI.initProjectListButtons();
        UI.initPopupButtons();
    }

    static expandProject(title) {
        const projectButton = document.getElementById(`${title}`);
        projectButton.parentElement.classList.toggle('expand');
    }

    static loadProjectContent(title) {

        let projectButton = document.getElementById(`${title}`);

        let items = Storage.getList().reduce((acc, item) => {
            return (item.project == title) ? acc + 1 : acc;
        }, 0);

        projectButton.querySelector('.project-items-counter').textContent = `${items}`;

        if (projectButton.parentElement.children[1] != undefined) {
            //clear project to update if exists
            projectButton.parentElement.removeChild(projectButton.parentElement.lastChild);
        }

        let projectContent = document.createElement('div');
        projectContent.setAttribute('class', 'project-content');
           

        Storage.getList().forEach((todo) => {
        
            if (todo.project == title) {

                    projectContent.appendChild(UI.loadTodo(todo));  

                }
        });
           
        projectButton.parentElement.appendChild(projectContent);
        UI.initTodoButtons(title);
   
    }

    static loadTodo(todo) {
        
        const newTodo = document.createElement('div');

        newTodo.classList.add("todo-item");
        
        //styel
        newTodo.classList.add('light-primary-color');
        newTodo.classList.add('primary-text-color');

        newTodo.id = `${todo.title}`;

        if (todo.status == 'inactive') newTodo.classList.add("todo-inactive");

        const circle = document.createElement('i');
        circle.classList.add('fa', 'fa-circle-o');
        circle.classList.add('secondary-text-color');

        const checkCircle = document.createElement('i');
        checkCircle.classList.add('fa', 'fa-check-circle-o');


        const title = document.createElement('div');
        title.classList.add('todo-title');
        title.textContent = todo.title;

        const description = document.createElement('div');
        description.classList.add('todo-description');

        //style
        description.classList.add('secondary-text-color');
        description.textContent = todo.description;

        const dueDate = document.createElement('div');
        dueDate.classList.add('todo-due-date');
        dueDate.textContent = todo.dueDate;

        const editDiv = document.createElement('div');
        const editIcon = document.createElement('i');

        editIcon.classList.add('fa', 'fa-pencil-square-o');

        editDiv.appendChild(editIcon);
        
        const priorityDiv = document.createElement('div');
        priorityDiv.classList.add('priority-box');

        if (todo.priority == 'hight') {
            priorityDiv.classList.add('box-red');
        } else if (todo.priority == 'medium') {
            priorityDiv.classList.add('box-yellow');
        } else if (todo.priority  == 'low') {
            priorityDiv.classList.add('box-green');
        }

        const leftDiv = document.createElement('div');
        leftDiv.classList.add('left-div');

        const centerDiv = document.createElement('div');
        centerDiv.classList.add('center-div');

        const rightDiv = document.createElement('div');
        rightDiv.classList.add('right-div');

        leftDiv.appendChild(circle);
        leftDiv.appendChild(checkCircle);

        centerDiv.appendChild(title);
        centerDiv.appendChild(description);

        rightDiv.appendChild(editDiv);
        rightDiv.appendChild(dueDate);
       
        newTodo.appendChild(priorityDiv);
        newTodo.appendChild(leftDiv);
        newTodo.appendChild(centerDiv);
        newTodo.appendChild(rightDiv);

        return newTodo;
    }

    static insertAddTodoButton() {
        let todoAddButton = document.createElement('button');
        todoAddButton.classList.add('btn-round');

        //style
        todoAddButton.classList.add('accent-color');
        todoAddButton.classList.add('text-primary-color');

        todoAddButton.id = 'todo-add-btn';
        todoAddButton.textContent = '+';
        
        let container = document.querySelector('.nav-panel');
        container.appendChild(todoAddButton);
    }

    static initTodoButtons(project) {
        let todosDiv = document.getElementById(`${project}`).nextElementSibling;

        let todos = todosDiv.querySelectorAll('.todo-item');

        todos.forEach((todo) => {
            todo.addEventListener('click', (e) =>{
                UI.triggerEvent(e.target);
            });
        });
    }

    static triggerEvent(target) {
        console.log(target);
        if (target.classList.contains('fa-pencil-square-o')) {
         
            const title = target.parentElement.parentElement.parentElement.id;
            UI.editTodo(title);        
        };

        if (target.classList.contains('fa-circle-o')) {
            let title = target.parentElement.parentElement.id;
            UI.setStatus(title, 'inactive');
        }


        if (target.classList.contains('fa-check-circle-o')) {
            let title = target.parentElement.parentElement.id;
            UI.setStatus(title, 'active');
        }
    };

    static editTodo(todoTitle) {
        UI.openPopup();
        UI.initPopupProjects();

        const todo = Storage.getTodo(todoTitle);
        
        document.getElementById('todo-delete').style.display = 'unset';
        document.getElementById('todo-title').value = todo.title;
        document.getElementById('todo-title').disabled = true;

        document.getElementById('todo-description').value = todo.description;
        document.getElementById('todo-due-date').value = todo.dueDate;

        document.getElementById('todo-project-select').value = todo.project;
        document.getElementById('todo-priority-select').value = todo.priority;

    }
    
    static openPopup() {
        document.querySelector('.todo-add-popup').classList.toggle('active');
    }

    static initProjectListButtons() {
        let projectButtons = document.querySelectorAll('.project-button');
        let todoAddButton = document.getElementById('todo-add-btn');

        projectButtons.forEach((button) => {
            button.addEventListener('click', (e) =>{

                console.log(e.target);
                let projectName = e.target.id;
                UI.expandProject(projectName);
            });
        });

        todoAddButton.addEventListener('click', () => {
  //          console.log('todo-add-popup -> active');
            UI.openPopup();
            UI.initPopupProjects();
        });
    }

    static initPopupButtons() {
        let ok = document.getElementById('todo-ok');
        let calcel = document.getElementById('todo-cancel');

        calcel.addEventListener('click', (e) =>{
            UI.popupClose();
        });

        ok.addEventListener('click', (e) =>{
            UI.todoAddEdit();
        });
    }

    static popupClose() {

        document.getElementById('todo-title').value = '';
        document.getElementById('todo-title').disabled = false;

        document.getElementById('todo-description').value = '';
        document.getElementById('todo-due-date').value = '';
        document.getElementById('todo-project-select').value = '';
        document.getElementById('todo-priority-select').value = 'medium';
        document.getElementById('todo-delete').style.display = 'none';


        document.querySelector('.todo-add-popup').classList.toggle('active');
    }

    static todoAddEdit() {
        let titleValue = document.getElementById('todo-title').value;
        let descriptionValue = document.getElementById('todo-description').value;

        let dueDateValue = document.getElementById('todo-due-date').value;
        let projectValue = document.getElementById('todo-project-select').value;

        let priorityValue = document.getElementById('todo-priority-select').value;


        if (titleValue == '') {
            alert("Title is required");
        } 
        else if (Storage.getTodo(titleValue) == undefined) {
            Storage.addTodo(titleValue);
        }
        let oldProject = Storage.getTodo(titleValue).project;

        Storage.updateTodo(titleValue, {project: projectValue});
        Storage.updateTodo(titleValue, {priority: priorityValue});

        if (descriptionValue != '') {
            Storage.updateTodo(titleValue, {description: descriptionValue});
        }

        if (dueDateValue != '') {
            dueDateValue = formatISO(new Date(document.getElementById('todo-due-date').value), { representation: 'date' });
            Storage.updateTodo(titleValue, {dueDate: dueDateValue});
        }

        UI.loadProjectContent(oldProject);
        UI.loadProjectContent(projectValue);
        UI.popupClose();
    }
    
    static initPopupProjects() {
        let projectSelector = document.getElementById('todo-project-select');
        projectSelector.innerHTML = '';
        console.log(Storage.getProjects());

        Storage.getProjects().forEach((project) => {
            let option = document.createElement('option');
            option.value = project;
            option.textContent = project;

            projectSelector.appendChild(option);
        });
    }

    // static editItem(target) {
    //     console.log(target);

    //     const todo = Storage.getTodo(target.parentElement.parentElement.children[1].textContent);

    //     console.log(todo);
    //     let editor =  target.parentElement.parentElement;
    //     editor.innerHTML = `<div class='todo-editor'>
    //                             <textarea id='todo-title' type=text placeholder='Title' maxlength="50" rows='1'></textarea>
    //                             <textarea id='todo-description' type=text placeholder='Description' rows='4'></textarea>

    //                         </div>`;

    //     document.getElementById('todo-title').value = todo.title;
    //     document.getElementById('todo-description').value = todo.description;

    // }

    // static addItem(target) {

    //     console.log(target);
    //     if (target.classList.contains('project-add')) {
    //         const input = document.querySelector('.project-add-popup').children[0].value;
    //         Storage.addProject(input);
    //         UI.loadProjects();
    //     }
    //     else 
    //     {
    //         const project = target.parentElement.parentElement.parentElement.firstChild.textContent;
    //         const input = document.querySelector('.todo-add-popup').children[0].value;

    //         if (input == '') alert('Please input Todo Title');
    //         if (input != '') {
    //             if (Storage.getList().some((todo) => todo.getTitle() == input)) 
    //                 alert('Please input Unique Todo Title');

    //             else {
    //                 Storage.addTodo(input);
    //                 Storage.updateTodo(input, {project});
                    
    //             }
    //         }

    //         UI.loadProjectContent(project);
    //     }

    // }

    static setStatus(title, status) {

        Storage.updateTodo(title, {status});
        UI.loadProjectContent(Storage.getTodo(title).project);
    }

    // static removeTodo(target) {

    //     console.log(target);
    //     const todo = target.parentElement.parentElement.children[1].textContent;
    //     const projectName = target.parentElement.parentElement.parentElement.firstChild.textContent;

    //     Storage.removeTodo(todo);
    //     UI.loadProjectContent(projectName);
    // }


}