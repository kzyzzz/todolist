/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Todo\": () => (/* reexport safe */ _todo__WEBPACK_IMPORTED_MODULE_0__.default),\n/* harmony export */   \"Storage\": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_1__.default)\n/* harmony export */ });\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ \"./src/storage.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n\n\n\n\n\n\n\n\n// list.save();\n_storage__WEBPACK_IMPORTED_MODULE_1__.default.loadTodoList();\n//console.log(Storage.getList());\n\n_ui__WEBPACK_IMPORTED_MODULE_2__.default.loadProjects();\n//Storage.addProject('new');\n//Storage.updateTodo('nnnnn', {project: 'New2'});\n\n//Storage.getTodoList();\n\n\n//# sourceURL=webpack://todolist/./src/index.js?");

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Storage)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\nclass Storage {\n\n    static removeProject(title) {\n        const newList = [];\n        this.todoList.map((todo, index) => {\n            if (todo.project != title) {\n                newList.push(todo);\n            }\n        })\n        this.todoList = newList;\n    }\n    static getProjects() {\n        return this.projects;\n    }\n\n    static addProject(title) {\n        if (this.projects.indexOf(title) === -1) this.projects.push(title);\n        console.log(this.projects);\n    }\n\n\n    static getList() {\n        return this.todoList;\n    }\n\n    static getTodo(title) {\n\n        return this.todoList.find((item) => item.getTitle() == title);\n    }\n\n\n    static updateTodo(title, updater) {\n\n        Storage.getTodo(title).update(updater);\n        Storage.setTodoList(this.todoList);\n    }\n\n    static addTodo(title) {\n        let todo = new _index__WEBPACK_IMPORTED_MODULE_0__.Todo(title);\n        this.todoList.push(todo);\n\n        Storage.setTodoList(this.todoList);\n    }\n\n    static removeTodo(title) {\n        console.log(this.todoList)\n        let itemToRemove = this.todoList.find((todo) => {\n            return (todo.getTitle() == title)\n        });\n        this.todoList.splice(this.todoList.indexOf(itemToRemove), 1);\n\n        Storage.setTodoList(this.todoList);\n    }\n\n    static loadTodoList() {\n        const savedList = JSON.parse(localStorage.getItem('TodoLis'));\n        const projects = ['default'];\n        let todoList = [];\n\n        if (savedList != null)  {\n\n            savedList.map((item) => {\n                todoList.push(Object.assign(new _index__WEBPACK_IMPORTED_MODULE_0__.Todo(), item));\n            });\n\n            todoList.map((todo) => {\n                if (projects.indexOf(todo.project) === -1) projects.push(todo.project);\n            });\n            \n        }\n\n        this.todoList = todoList;\n        this.projects = projects;\n\n        return todoList;\n    }\n\n    static setTodoList(todoList) {\n        localStorage.setItem('TodoLis', JSON.stringify(todoList));\n    }\n}\n\n//# sourceURL=webpack://todolist/./src/storage.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Todo)\n/* harmony export */ });\nclass Todo {\n    constructor(title) {\n        this.title = title;\n        this.description = 'description';\n        this.dueDate = 'No Date';\n        this.priority = 'priority';\n        this.project = 'default';\n        this.status = 'active';\n    }\n\n    getTitle() {\n        return this.title;\n    }\n\n    update(updater) {\n        Object.assign(this, updater);\n\n        console.log(this);\n    }\n    \n    getInfo() {\n        return {title: this.title, description: this.description, dueDate: this.dueDate, priority: this.priority};\n    }\n}\n\n//# sourceURL=webpack://todolist/./src/todo.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\n\nclass UI {\n\n    static loadProjects() {\n\n        const projectsList = document.getElementById('projects-list');\n\n        _index__WEBPACK_IMPORTED_MODULE_0__.Storage.getProjects().forEach(project => {\n            let projectDiv = document.createElement('div');\n            let projectHeader = document.createElement('div');\n            let projectTitle = document.createElement('div');\n            let projectItems = document.createElement('div');\n\n            projectDiv.classList.add('project');\n            projectHeader.classList.add('project-button');\n            projectHeader.id = project;\n\n            let items = _index__WEBPACK_IMPORTED_MODULE_0__.Storage.getList().reduce((acc, item) => {\n                return (item.project == project) ? acc + 1 : acc;\n            }, 0);\n\n            projectTitle.textContent = project;\n\n            projectItems.textContent = `(${items})`;\n      \n            projectHeader.appendChild(projectTitle);\n            projectHeader.appendChild(projectItems);\n            projectDiv.appendChild(projectHeader);\n\n            projectsList.appendChild(projectDiv);\n\n            UI.loadProjectContent(project);\n        });  \n\n        UI.initProjectListButtons();\n    }\n\n    static expandProject(title) {\n        const projectButton = document.getElementById(`${title}`);\n        projectButton.parentElement.classList.toggle('expand');\n    }\n\n    static loadProjectContent(title) {\n\n        let projectButton = document.getElementById(`${title}`);\n\n        if (projectButton.parentElement.children[1] != undefined) {\n            //clear project to update if exists\n            projectButton.parentElement.removeChild(projectButton.parentElement.lastChild);\n        }\n\n        let projectContent = document.createElement('div');\n        projectContent.setAttribute('class', 'project-content');\n           \n\n        _index__WEBPACK_IMPORTED_MODULE_0__.Storage.getList().forEach((todo) => {\n        \n            if (todo.project == title) {\n\n                    projectContent.appendChild(UI.loadTodo(todo));  \n\n                }\n        });\n           \n        projectButton.parentElement.appendChild(projectContent);\n   \n    }\n\n    static loadTodo(todo) {\n        \n        const newTodo = document.createElement('div');\n\n        newTodo.classList.add(\"todo-item\");\n        if (todo.status == 'inactive') newTodo.classList.add(\"todo-inactive\");\n\n        const circle = document.createElement('i');\n        circle.classList.add('fa', 'fa-circle-o');\n\n        circle.addEventListener('click', (e) => {\n            console.log(e.target.parentElement.children[2].textContent);\n            UI.setStatus(e.target.parentElement.children[2].textContent, 'inactive');\n        });\n\n        const checkCircle = document.createElement('i');\n        checkCircle.classList.add('fa', 'fa-check-circle-o');\n\n        checkCircle.addEventListener('click', (e) => {\n            console.log(e.target.parentElement.children[2].textContent);\n            UI.setStatus(e.target.parentElement.children[2].textContent, 'active');\n        });\n      \n\n        const title = document.createElement('div');\n        title.textContent = todo.title;\n\n        const description = document.createElement('div');\n        description.textContent = todo.description;\n\n        const dueDate = document.createElement('div');\n        dueDate.textContent = todo.dueDate;\n\n\n        newTodo.appendChild(circle);\n        newTodo.appendChild(checkCircle);\n        newTodo.appendChild(title);\n        newTodo.appendChild(description);\n        newTodo.appendChild(dueDate);\n\n        return newTodo;\n    } \n\n    static initProjectListButtons() {\n        let projectButtons = document.querySelectorAll('.project-button');\n        let projectAddButton = document.querySelector('.project-add-button');\n\n\n        projectButtons.forEach((button) => {\n            button.addEventListener('click', (e) =>{\n                console.log(e.target)\n                let projectName = e.target.children[0].textContent;\n                UI.expandProject(projectName);\n            });\n        });\n\n\n        // projectAddButton.addEventListener('click', (e) => {\n        //     console.log('click')\n        //     document.querySelector('.project-add-button').classList.add('active');\n        //     document.querySelector('.project-add-popup').classList.add('active');\n        // });\n    }\n\n    \n    static initProjectButtons() {\n\n        // let projectDiv = document.getElementById(`${title}`).parentElement;\n       \n        // let todoButtons = projectDiv.querySelectorAll('.todo-buttons');\n        // console.log(projectDiv);\n        // console.log(todoButtons);\n\n        // let todoAddButton = projectDiv.querySelector('.todo-add-button');\n\n        // if (todoAddButton != null) {\n        //     todoAddButton.addEventListener('click', (e) => {\n        //         console.log(e.target.lastChild);\n\n        //         title.querySelector('.todo-add-button').classList.add('active');\n        //         title.querySelector('.todo-add-popup').classList.add('active');\n        //     });\n        // }\n\n        // todoButtons.forEach((button) => {\n        //     button.addEventListener('click', (e) => {\n        //         if (e.target.classList.contains('fa-circle-o')) UI.setStatus(e.target, 'inactive');\n        //         if (e.target.classList.contains('fa-check-circle-o')) UI.setStatus(e.target, 'active');\n        //         if (e.target.classList.contains('fa-trash')) UI.removeTodo(e.target);\n        //         if (e.target.classList.contains('fa-check')) UI.addItem(e.target);\n        //         if (e.target.classList.contains('fa-pencil-square-o')) UI.editItem(e.target);\n                \n        //         if (e.target.classList.contains('fa-times')) {\n        //                 title.querySelector('.todo-add-button').classList.remove('active');\n        //                 title.querySelector('.todo-add-popup').classList.remove('active');\n        //             }\n        //     });\n        // });\n\n         //let dueDatePicker = document.querySelectorAll('.due-date-picker');\n        // dueDatePicker.forEach((picker) => {\n        //     picker.addEventListener('change', (e) => {\n\n        //         let dueDate = formatISO(new Date(e.target.value), { representation: 'date' });\n\n        //         let todoName = e.target.parentElement.parentElement.children[1].textContent;\n        //         let projectName = e.target.parentNode.parentNode.parentNode.firstChild.textContent;\n\n        //         Storage.updateTodo(todoName, {dueDate});\n\n        //         UI.loadProjectContent(projectName);\n        //     });\n        // });\n    }\n\n    static editItem(target) {\n        console.log(target);\n\n        const todo = _index__WEBPACK_IMPORTED_MODULE_0__.Storage.getTodo(target.parentElement.parentElement.children[1].textContent);\n\n        console.log(todo);\n        let editor =  target.parentElement.parentElement;\n        editor.innerHTML = `<div class='todo-editor'>\n                                <textarea id='todo-title' type=text placeholder='Title' maxlength=\"50\" rows='1'></textarea>\n                                <textarea id='todo-description' type=text placeholder='Description' rows='4'></textarea>\n\n                            </div>`;\n\n        document.getElementById('todo-title').value = todo.title;\n        document.getElementById('todo-description').value = todo.description;\n\n    }\n\n    static addItem(target) {\n\n        console.log(target);\n        if (target.classList.contains('project-add')) {\n            const input = document.querySelector('.project-add-popup').children[0].value;\n            _index__WEBPACK_IMPORTED_MODULE_0__.Storage.addProject(input);\n            UI.loadProjects();\n        }\n        else \n        {\n            const project = target.parentElement.parentElement.parentElement.firstChild.textContent;\n            const input = document.querySelector('.todo-add-popup').children[0].value;\n\n            if (input == '') alert('Please input Todo Title');\n            if (input != '') {\n                if (_index__WEBPACK_IMPORTED_MODULE_0__.Storage.getList().some((todo) => todo.getTitle() == input)) \n                    alert('Please input Unique Todo Title');\n\n                else {\n                    _index__WEBPACK_IMPORTED_MODULE_0__.Storage.addTodo(input);\n                    _index__WEBPACK_IMPORTED_MODULE_0__.Storage.updateTodo(input, {project});\n                    \n                }\n            }\n\n            UI.loadProjectContent(project);\n        }\n\n    }\n\n    static setStatus(title, status) {\n\n        _index__WEBPACK_IMPORTED_MODULE_0__.Storage.updateTodo(title, {status});\n        UI.loadProjectContent(_index__WEBPACK_IMPORTED_MODULE_0__.Storage.getTodo(title).project);\n    }\n\n    static removeTodo(target) {\n\n        console.log(target);\n        const todo = target.parentElement.parentElement.children[1].textContent;\n        const projectName = target.parentElement.parentElement.parentElement.firstChild.textContent;\n\n        _index__WEBPACK_IMPORTED_MODULE_0__.Storage.removeTodo(todo);\n        UI.loadProjectContent(projectName);\n    }\n\n\n}\n\n//# sourceURL=webpack://todolist/./src/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;