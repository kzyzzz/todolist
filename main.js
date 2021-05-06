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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Todo\": () => (/* reexport safe */ _todo__WEBPACK_IMPORTED_MODULE_0__.default),\n/* harmony export */   \"Storage\": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_1__.default)\n/* harmony export */ });\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ \"./src/storage.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n\n\n\n\n\n\n\n\n// list.save();\n_storage__WEBPACK_IMPORTED_MODULE_1__.default.loadTodoList();\n//console.log(Storage.getList());\n\n_ui__WEBPACK_IMPORTED_MODULE_2__.default.loadProjects();\n_ui__WEBPACK_IMPORTED_MODULE_2__.default.loadProjectContent('default');\n//Storage.addProject('new');\nconsole.log(_storage__WEBPACK_IMPORTED_MODULE_1__.default.projects);\n\n//Storage.getTodoList();\n\n\n//# sourceURL=webpack://todolist/./src/index.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\nclass UI {\n    static loadProjects() {\n        const projectsList = document.getElementById('projects-list');\n\n        projectsList.innerHTML = `<div class=\"project-title\">\n                                    <button class=\"project-button\">Today</button>\n                                    </div>`;\n\n        _index__WEBPACK_IMPORTED_MODULE_0__.Storage.getProjects().forEach(project => {\n            projectsList.innerHTML += \n                `<div class=\"project-title\">\n                 <button class=\"project-button\">${project}</button>\n                 </div>`;\n        });\n\n        //project list footer\n        projectsList.innerHTML +=\n                `<div class=\"project-add-button\">\n                    <button><i class=\"fa fa-plus\"></i></button>                                                                 \n                </div>\n                <div class=\"project-add-popup\">\n                    <input type=\"tetx\" placeholder=\"title\">\n                    <div class=\"todo-buttons\">\n                                <i class=\"fa fa-check project-add\"></i>\n                                <i class=\"fa fa-times project-add\"></i>\n                    </div>\n                </div>`;\n                \n\n        UI.initProjectListButtons();\n    }\n\n    static loadProjectContent(title) {\n\n        const projectContent = document.getElementById('project-content');\n        projectContent.innerHTML  = `<div class=\"project-title\">${title}</div>`;\n\n\n        if (title == 'Today') {\n            let d = new Date;\n\n            let todayDate = d.getFullYear() + '-' + ('0' + (d.getMonth()+1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);\n\n            _index__WEBPACK_IMPORTED_MODULE_0__.Storage.getList().forEach((todo) => {\n\n                    if (todo.dueDate == todayDate) {\n                               \n                        UI.loadTodo(todo);\n                    }\n            });\n\n            \n        }\n        else {\n            _index__WEBPACK_IMPORTED_MODULE_0__.Storage.getList().forEach((todo) => {\n            \n                if (todo.project == title) {\n                    let todoClassName = \"todo-item\";\n                    if (todo.status == 'inactive') todoClassName += \" todo-inactive\";\n\n                        UI.loadTodo(todo);\n                    }\n            });\n\n            //project footer\n            projectContent.innerHTML += `<div class=\"todo-add-button\">\n                                            <button><i class=\"fa fa-plus\"></i></button>                                                                 \n                                        </div>\n\n                                        <div class=\"todo-add-popup\">\n                                            <input type=\"tetx\" placeholder=\"title\">\n                                            <div class=\"todo-buttons\">\n                                                        <i class=\"fa fa-check\"></i>\n                                                        <i class=\"fa fa-times\"></i>\n                                            </div>\n                                        </div>`;\n        }\n\n        UI.initProjectButtons();\n    }\n\n    static loadTodo(todo) {\n        \n        const projectContent = document.getElementById('project-content');\n        let todoClassName = \"todo-item\";\n        if (todo.status == 'inactive') todoClassName += \" todo-inactive\";\n        \n                    projectContent.innerHTML += `\n                    <div class=\"${todoClassName}\">  \n\n                        <div class=\"todo-buttons\">\n                                <i class=\"fa fa-circle-o\"></i>\n                                <i class=\"fa fa-check-circle-o\"></i>\n                        </div>\n\n                        \n                        <div>${todo.title}</div>\n                        <div>${todo.description}</div>\n                        <div>${todo.dueDate}</div>\n                        <div><input type=\"date\" class=\"due-date-picker\"></div>\n\n                        <div class=\"todo-buttons\">\n                                <i class=\"fa fa-pencil-square-o\"></i>\n                                <i class=\"fa fa-trash\"></i>\n                        </div>\n                    \n                    </div>`;\n    } \n\n    static initProjectListButtons() {\n        let projectButtons = document.querySelectorAll('.project-button');\n        let projectAddButton = document.querySelector('.project-add-button');\n\n\n        projectButtons.forEach((button) => {\n            button.addEventListener('click', (e) =>{\n                let projectName = e.target.textContent;\n\n                UI.loadProjectContent(projectName);\n            });\n        });\n\n\n        projectAddButton.addEventListener('click', (e) => {\n            console.log('click')\n            document.querySelector('.project-add-button').classList.add('active');\n            document.querySelector('.project-add-popup').classList.add('active');\n        });\n    }\n\n    \n    static initProjectButtons() {\n\n        let dueDatePicker = document.querySelectorAll('.due-date-picker');\n        let todoButtons = document.querySelectorAll('.todo-buttons');\n        let todoAddButton = document.querySelector('.todo-add-button');\n\n        todoAddButton.addEventListener('click', (e) => {\n            console.log(e.target.lastChild);\n\n            document.querySelector('.todo-add-button').classList.add('active');\n            document.querySelector('.todo-add-popup').classList.add('active');\n        });\n\n        todoButtons.forEach((button) => {\n            button.addEventListener('click', (e) => {\n                if (e.target.classList.contains('fa-circle-o')) UI.setStatus(e.target, 'inactive');\n                if (e.target.classList.contains('fa-check-circle-o')) UI.setStatus(e.target, 'active');\n                if (e.target.classList.contains('fa-trash')) UI.removeTodo(e.target);\n                if (e.target.classList.contains('fa-check')) UI.addItem(e.target);\n                if (e.target.classList.contains('fa-times')) {\n                        document.querySelector('.todo-add-button').classList.remove('active');\n                        document.querySelector('.todo-add-popup').classList.remove('active');\n                    }\n            });\n        });\n\n        dueDatePicker.forEach((picker) => {\n            picker.addEventListener('change', (e) => {\n\n                let dueDate = e.target.value;\n\n                let todoName = e.target.parentElement.parentElement.children[1].textContent;\n                let projectName = e.target.parentNode.parentNode.parentNode.firstChild.textContent;\n\n                _index__WEBPACK_IMPORTED_MODULE_0__.Storage.updateTodo(todoName, {dueDate});\n\n                UI.loadProjectContent(projectName);\n            });\n        });\n    }\n\n    static addItem(target) {\n\n        console.log(target);\n        if (target.classList.contains('project-add')) {\n            const input = document.querySelector('.project-add-popup').children[0].value;\n            _index__WEBPACK_IMPORTED_MODULE_0__.Storage.addProject(input);\n            UI.loadProjects();\n        }\n        else \n        {\n            const project = target.parentElement.parentElement.parentElement.firstChild.textContent;\n            const input = document.querySelector('.todo-add-popup').children[0].value;\n\n            if (input == '') alert('Please input Todo Title');\n            if (input != '') {\n                if (_index__WEBPACK_IMPORTED_MODULE_0__.Storage.getList().some((todo) => todo.getTitle() == input)) \n                    alert('Please input Unique Todo Title');\n\n                else {\n                    _index__WEBPACK_IMPORTED_MODULE_0__.Storage.addTodo(input);\n                    _index__WEBPACK_IMPORTED_MODULE_0__.Storage.updateTodo(input, {project});\n                    \n                }\n            }\n\n            UI.loadProjectContent(project);\n        }\n\n    }\n\n    static setStatus(target, status) {\n\n        const todoTitle = target.parentElement.nextElementSibling.textContent;\n        const projectName = target.parentElement.parentElement.parentElement.firstChild.textContent;\n\n        _index__WEBPACK_IMPORTED_MODULE_0__.Storage.updateTodo(todoTitle, {status});\n        UI.loadProjectContent(projectName);\n    }\n\n    static removeTodo(target) {\n\n        console.log(target);\n        const todo = target.parentElement.parentElement.children[1].textContent;\n        const projectName = target.parentElement.parentElement.parentElement.firstChild.textContent;\n\n        _index__WEBPACK_IMPORTED_MODULE_0__.Storage.removeTodo(todo);\n        UI.loadProjectContent(projectName);\n    }\n\n\n}\n\n//# sourceURL=webpack://todolist/./src/ui.js?");

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