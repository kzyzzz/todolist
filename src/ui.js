import {Storage, Todo} from "./index"
import { formatISO, isToday, isThisWeek, parseISO } from 'date-fns'
import { ta } from "date-fns/locale";

export default class UI {

    static loadSite() {
        Storage.loadTodoList();

        if (Storage.getList() == '') {
            Storage.addTodo('Go to the gym');
            Storage.addTodo('Ikea delivery');
            Storage.addTodo('Walk the dog');
            Storage.addTodo('Cook breakfast');
            Storage.addTodo('Plan vacation');
            Storage.addTodo('New coding task');
            Storage.addTodo('Buy groceries');
            Storage.addTodo('Order concert tickets');
            Storage.addTodo('Water my plants');

            Storage.updateTodo('Go to the gym', {project: 'new', description: 'meet in lobby', priority: 'medium', dueDate: '2021-06-06'});
            Storage.updateTodo('Ikea delivery', {description: 'tel: 355-77-13', priority: 'hight', dueDate: '2021-05-23'});
            Storage.updateTodo('Walk the dog', {description: 'colar at the entrance'});
            Storage.updateTodo('Cook breakfast', {description: 'eggs, bacon', priority: 'medium', status: 'inactive'});
            Storage.updateTodo('Plan vacation', { description: 'booking? arirBnb?', priority: 'low', dueDate: '2021-07-06'});
            Storage.updateTodo('New coding task', {description: 'TheOdinProject: React?'});
            Storage.updateTodo('Buy groceries', {description: 'Milk, eggs, vegs', priority: 'medium'});
            Storage.updateTodo('Order concert tickets', {description: 'Pori Jazz 2nd day', priority: 'low', dueDate: '2021-07-01'});
            Storage.updateTodo('Water my plants', {priority: 'hight', status: 'inactive'});

            

            Storage.loadTodoList();
        }

        UI.initNavPanel();
        UI.initPopupButtons();
        UI.loadProjects();
        UI.expandProject('default');
    }

    static loadProjects(date = '') {

        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = '';

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

            UI.loadProjectContent(project, date);
        });  


        UI.initProjectListButtons();
   
    }

    static expandProject(title) {
        const projectButton = document.getElementById(`${title}`);
        projectButton.parentElement.classList.toggle('expand');
    }

    static loadProjectContent(title, date='') {

        let projectButton = document.getElementById(`${title}`);

        // let items = Storage.getList().reduce((acc, item) => {
        //     return (item.project == title) ? acc + 1 : acc;
        // }, 0);
        let items = 0;

        if (projectButton.parentElement.children[1] != undefined) {
            //clear project to update if exists
            projectButton.parentElement.removeChild(projectButton.parentElement.lastChild);
        }

        let projectContent = document.createElement('div');
        projectContent.setAttribute('class', 'project-content');
           

        Storage.getList().forEach((todo) => {
        
            if (todo.project == title) {

                    if (date == '') {
                        projectContent.appendChild(UI.loadTodo(todo));  
                        items += 1;
                    }

                    if (date == 'today') {
                        if (isToday(parseISO(todo.dueDate))) {
                            projectContent.appendChild(UI.loadTodo(todo));
                            items += 1;
                        }
                    }

                    if (date == 'thisWeek') {
                        if (isThisWeek(parseISO(todo.dueDate))) {
                            projectContent.appendChild(UI.loadTodo(todo));
                            items += 1;
                        }
                    }

                }
        });

        projectButton.querySelector('.project-items-counter').textContent = `${items}`;
           
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

    static initNavPanel() {
        
        let container = document.querySelector('.nav-panel');

        container.addEventListener('mouseover', (e) => {
            container.classList.add('active');
        });

        container.addEventListener('mouseout', (e) => {
            container.classList.remove('active');
        });

        container.addEventListener('click', (e) => {
            container.classList.toggle('active');
        });

        const menu = document.createElement('ul');

        const home = document.createElement('li');
        home.classList.add('nav-button');
        home.id = 'todo-home';
        home.innerHTML = `<span class="material-icons">
        home
        </span>home`;

        const add = document.createElement('li');
        add.classList.add('nav-button');
        add.id = 'todo-add';
        add.innerHTML = `<span class="material-icons">
        post_add
        </span>new Todo`;

        const today = document.createElement('li');
        today.classList.add('nav-button');
        today.id = 'todo-today';
        today.innerHTML = `<span class="material-icons">
        today
        </span>today`;

        const week = document.createElement('li');
        week.classList.add('nav-button');
        week.id = 'todo-week';
        week.innerHTML = `<span class="material-icons">
        date_range
        </span>week`;

        const info = document.createElement('li');
        info.classList.add('nav-button');
        info.id = 'todo-info';
        info.innerHTML = `<span class="material-icons">
        info
        </span>info`;

       // menu.appendChild(home);
        menu.appendChild(add);
        menu.appendChild(today);
        menu.appendChild(week);
        menu.appendChild(info);

        container.appendChild(menu);

        UI.initNavButtons();
    }

    static initNavButtons() {
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                UI.triggerNavButton(e.target);
            });
        });
    }

    static triggerNavButton(target) {
   

        if (target.classList.contains('material-icons')) {
            UI.triggerNavButton(target.parentElement);

        } else {

            if (target.id == 'todo-add') {
                UI.openPopup();
                UI.initPopupProjects();
            }

            if (target.id == 'todo-today') {
                document.getElementById('todo-week').classList.remove('active');
                if (target.classList.contains('active')) {
                    UI.loadProjects();
                    UI.expandProject('default');
                } else {       
                    UI.loadProjects('today');
                    UI.expandAllProjects();
                }
        
                target.classList.toggle('active');
            }

            if (target.id == 'todo-week') {

                document.getElementById('todo-today').classList.remove('active');
                if (target.classList.contains('active')) {
                    UI.loadProjects();
                    UI.expandProject('default');
                } else {       
                    UI.loadProjects('thisWeek');
                    UI.expandAllProjects();
                }
        
                target.classList.toggle('active');
                
            }

            if (target.id == 'todo-info') {
                alert(`Developed by Vladimir Baraev\nGithub: kzyzzz\nkzyzzz@gmail.com`);
            }
        }
    }

    static expandAllProjects() {
        Storage.getProjects().forEach((project) => {
            UI.expandProject(project);
        });
    }

    static initProjectListButtons() {
        let projectButtons = document.querySelectorAll('.project-button');

        projectButtons.forEach((button) => {
            button.addEventListener('click', (e) =>{

                let projectName = e.target.id;
                console.log(e.target);
                if (e.target.classList.contains('project-title')) {
                    projectName = e.target.textContent;
                }
                if (e.target.classList.contains('project-items-counter')) {
                    projectName = e.target.parentElement.id;
                }

                
                UI.expandProject(projectName);
            });
        });

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
        document.getElementById('popup-title').innerHTML = todo.title;
        //document.getElementById('todo-title').disabled = true;

        document.getElementById('todo-description').value = todo.description;
        document.getElementById('todo-due-date').value = todo.dueDate;

        document.getElementById('todo-project-select').value = todo.project;
        document.getElementById('todo-priority-select').value = todo.priority;

    }
    
    static openPopup() {
        document.querySelector('.todo-add-popup').classList.toggle('active');
    }

    static initPopupButtons() {
        let ok = document.getElementById('todo-ok');
        let calcel = document.getElementById('todo-cancel');
        let del = document.getElementById('todo-delete');

        calcel.addEventListener('click', (e) =>{
            UI.popupClose();
        });

        ok.addEventListener('click', (e) =>{
            UI.todoAddEdit();
        });

        del.addEventListener('click', (e) => {
            UI.todoDelete();
        });
    }

    static todoDelete() {
        const title = document.getElementById('popup-title').textContent;
        const project = Storage.getTodo(title).project;

        Storage.removeTodo(title);
        UI.loadProjectContent(project);
        UI.popupClose();
    }

    static popupClose() {

        document.getElementById('todo-title').value = '';
        document.getElementById('todo-title').disabled = false;

        document.getElementById('todo-description').value = '';
        document.getElementById('todo-due-date').value = '';
        document.getElementById('todo-project-select').value = '';
        document.getElementById('todo-priority-select').value = 'medium';
        document.getElementById('todo-delete').style.display = 'none';

        document.getElementById('popup-title').innerHTML = '';

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
        else if (Storage.getTodo(titleValue) == undefined && document.getElementById('popup-title').innerHTML == '') {
            Storage.addTodo(titleValue);
        }
        else if (Storage.getTodo(titleValue) == undefined && document.getElementById('popup-title').innerHTML != '') {
            Storage.updateTodo(document.getElementById('popup-title').innerHTML, {title: titleValue});
        }

        let oldProject = Storage.getTodo(titleValue).project;

        Storage.updateTodo(titleValue, {project: projectValue});
        Storage.updateTodo(titleValue, {priority: priorityValue});

        Storage.updateTodo(titleValue, {description: descriptionValue});

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