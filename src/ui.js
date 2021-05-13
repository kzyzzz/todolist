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

            projectDiv.classList.add('project');
            projectHeader.classList.add('project-button');
            projectHeader.id = project;

            let items = Storage.getList().reduce((acc, item) => {
                return (item.project == project) ? acc + 1 : acc;
            }, 0);

            projectTitle.textContent = project;

            projectItems.textContent = `(${items})`;
      
            projectHeader.appendChild(projectTitle);
            projectHeader.appendChild(projectItems);
            projectDiv.appendChild(projectHeader);

            projectsList.appendChild(projectDiv);

            UI.loadProjectContent(project);
        });  

        UI.initProjectListButtons();
    }

    static expandProject(title) {
        const projectButton = document.getElementById(`${title}`);
        projectButton.parentElement.classList.toggle('expand');
    }

    static loadProjectContent(title) {

        let projectButton = document.getElementById(`${title}`);

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
   
    }

    static loadTodo(todo) {
        
        const newTodo = document.createElement('div');

        newTodo.classList.add("todo-item");
        if (todo.status == 'inactive') newTodo.classList.add("todo-inactive");

        const circle = document.createElement('i');
        circle.classList.add('fa', 'fa-circle-o');

        circle.addEventListener('click', (e) => {
            console.log(e.target.parentElement.children[2].textContent);
            UI.setStatus(e.target.parentElement.children[2].textContent, 'inactive');
        });

        const checkCircle = document.createElement('i');
        checkCircle.classList.add('fa', 'fa-check-circle-o');

        checkCircle.addEventListener('click', (e) => {
            console.log(e.target.parentElement.children[2].textContent);
            UI.setStatus(e.target.parentElement.children[2].textContent, 'active');
        });
      

        const title = document.createElement('div');
        title.textContent = todo.title;

        const description = document.createElement('div');
        description.textContent = todo.description;

        const dueDate = document.createElement('div');
        dueDate.textContent = todo.dueDate;


        newTodo.appendChild(circle);
        newTodo.appendChild(checkCircle);
        newTodo.appendChild(title);
        newTodo.appendChild(description);
        newTodo.appendChild(dueDate);

        return newTodo;
    } 

    static initProjectListButtons() {
        let projectButtons = document.querySelectorAll('.project-button');
        let projectAddButton = document.querySelector('.project-add-button');


        projectButtons.forEach((button) => {
            button.addEventListener('click', (e) =>{
                console.log(e.target)
                let projectName = e.target.children[0].textContent;
                UI.expandProject(projectName);
            });
        });


        // projectAddButton.addEventListener('click', (e) => {
        //     console.log('click')
        //     document.querySelector('.project-add-button').classList.add('active');
        //     document.querySelector('.project-add-popup').classList.add('active');
        // });
    }

    
    static initProjectButtons() {

        // let projectDiv = document.getElementById(`${title}`).parentElement;
       
        // let todoButtons = projectDiv.querySelectorAll('.todo-buttons');
        // console.log(projectDiv);
        // console.log(todoButtons);

        // let todoAddButton = projectDiv.querySelector('.todo-add-button');

        // if (todoAddButton != null) {
        //     todoAddButton.addEventListener('click', (e) => {
        //         console.log(e.target.lastChild);

        //         title.querySelector('.todo-add-button').classList.add('active');
        //         title.querySelector('.todo-add-popup').classList.add('active');
        //     });
        // }

        // todoButtons.forEach((button) => {
        //     button.addEventListener('click', (e) => {
        //         if (e.target.classList.contains('fa-circle-o')) UI.setStatus(e.target, 'inactive');
        //         if (e.target.classList.contains('fa-check-circle-o')) UI.setStatus(e.target, 'active');
        //         if (e.target.classList.contains('fa-trash')) UI.removeTodo(e.target);
        //         if (e.target.classList.contains('fa-check')) UI.addItem(e.target);
        //         if (e.target.classList.contains('fa-pencil-square-o')) UI.editItem(e.target);
                
        //         if (e.target.classList.contains('fa-times')) {
        //                 title.querySelector('.todo-add-button').classList.remove('active');
        //                 title.querySelector('.todo-add-popup').classList.remove('active');
        //             }
        //     });
        // });

         //let dueDatePicker = document.querySelectorAll('.due-date-picker');
        // dueDatePicker.forEach((picker) => {
        //     picker.addEventListener('change', (e) => {

        //         let dueDate = formatISO(new Date(e.target.value), { representation: 'date' });

        //         let todoName = e.target.parentElement.parentElement.children[1].textContent;
        //         let projectName = e.target.parentNode.parentNode.parentNode.firstChild.textContent;

        //         Storage.updateTodo(todoName, {dueDate});

        //         UI.loadProjectContent(projectName);
        //     });
        // });
    }

    static editItem(target) {
        console.log(target);

        const todo = Storage.getTodo(target.parentElement.parentElement.children[1].textContent);

        console.log(todo);
        let editor =  target.parentElement.parentElement;
        editor.innerHTML = `<div class='todo-editor'>
                                <textarea id='todo-title' type=text placeholder='Title' maxlength="50" rows='1'></textarea>
                                <textarea id='todo-description' type=text placeholder='Description' rows='4'></textarea>

                            </div>`;

        document.getElementById('todo-title').value = todo.title;
        document.getElementById('todo-description').value = todo.description;

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

    static setStatus(title, status) {

        Storage.updateTodo(title, {status});
        UI.loadProjectContent(Storage.getTodo(title).project);
    }

    static removeTodo(target) {

        console.log(target);
        const todo = target.parentElement.parentElement.children[1].textContent;
        const projectName = target.parentElement.parentElement.parentElement.firstChild.textContent;

        Storage.removeTodo(todo);
        UI.loadProjectContent(projectName);
    }


}