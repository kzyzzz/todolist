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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Project\": () => (/* reexport safe */ _project__WEBPACK_IMPORTED_MODULE_0__.default),\n/* harmony export */   \"Todo\": () => (/* reexport safe */ _todo__WEBPACK_IMPORTED_MODULE_1__.default),\n/* harmony export */   \"Storage\": () => (/* reexport safe */ _storage__WEBPACK_IMPORTED_MODULE_2__.default)\n/* harmony export */ });\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ \"./src/storage.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n\n\n\n\n\n\n\n\nlet pr1 = new _project__WEBPACK_IMPORTED_MODULE_0__.default('proj1');\npr1.addTodo('Tit', 'Des', 'due', 'high');\npr1.addTodo('Tit2', 'Des2', 'due2', 'high2');\npr1.addTodo('Tit3', 'Des3', 'due3', 'high3');\n\nlet pr2 = new _project__WEBPACK_IMPORTED_MODULE_0__.default('proj2');\npr2.addTodo('Tit-2', 'Des', 'due', 'high');\npr2.addTodo('Tit2-2', 'Des2', 'due2', 'high2');\n\n// list.projectList.push(pr1);\n// list.projectList.push(pr2);\n\n\n// list.save();\n\n\n_ui__WEBPACK_IMPORTED_MODULE_3__.default.loadProjects();\n\n\n//# sourceURL=webpack://todolist/./src/index.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\nclass Project {\n    constructor(title) {\n        this.todoList = [];\n        this.title = title;\n    }\n    get items() {\n        return this.todoList;\n    }\n    get length() {\n        return this.todoList.length;\n    }\n\n    updateTodo(title, updater) {\n        this.todoList.find((item) => item.title == title).update(updater);\n    }\n\n    addTodo(title, description, dueDate, priority) {\n        let todo = new _index__WEBPACK_IMPORTED_MODULE_0__.Todo(title, description, dueDate, priority);\n        this.todoList.push(todo);\n    }\n    removeTodo(title) {\n        let itemToRemove = this.todoList.find((item) => item.getTitle() == title);\n        this.todoList.splice(this.todoList.indexOf(itemToRemove), 1);\n    }\n}\n\n//# sourceURL=webpack://todolist/./src/project.js?");

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Storage)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\nclass Storage {\n    \n    static removeProject (title) {\n        //Code to implement\n        concole.log(`removed ${title}`);\n        return true;\n    }\n\n    static getProject(title) {\n        let projectList = Storage.getProjects();\n\n        return projectList.find((item) => item.title == title);\n    }\n\n    static addTodo(projectName, title, description, dueDate, priority) {\n        \n        let projectList = Storage.getProjects();\n        projectList.find((project) => project.title == projectName).addTodo(title, description, dueDate, priority);\n\n        Storage.setProjects(projectList);\n    }\n\n    static updateProjectTodo(projectName, title, updater) {\n        \n        let projectList = Storage.getProjects();\n        projectList.find((project) => project.title == projectName).updateTodo(title, updater);\n\n        Storage.setProjects(projectList);\n    }\n\n    static removeTodo(projectName, title) {\n        \n        let projectList = Storage.getProjects();\n        projectList.find((project) => project.title == projectName).removeTodo(title);\n\n        Storage.setProjects(projectList);\n    }\n\n    static getProjects() {\n        const projectList = JSON.parse(localStorage.getItem('myProjects'));\n\n        projectList.map((item, index) => {\n            projectList[index] = Object.assign(new _index__WEBPACK_IMPORTED_MODULE_0__.Project(), item);\n        });\n\n        projectList.forEach((project) =>{\n            project.items.map((item, index) =>{\n                project.items[index] = Object.assign(new _index__WEBPACK_IMPORTED_MODULE_0__.Todo(), item);\n            });\n        });\n\n        return projectList;\n\n    }\n\n    static setProjects(projectList) {\n        localStorage.setItem('myProjects', JSON.stringify(projectList));\n    }\n}\n\n//# sourceURL=webpack://todolist/./src/storage.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Todo)\n/* harmony export */ });\nclass Todo {\n    constructor(title, description, dueDate, priority) {\n        this.title = title;\n        this.description = description;\n        this.dueDate = dueDate;\n        this.priority = priority;\n        this.status = 'active';\n    }\n\n    getTitle() {\n        return this.title;\n    }\n\n    update(updater) {\n        Object.assign(this, updater);\n\n        console.log(this);\n    }\n    \n    getInfo() {\n        return {title: this.title, description: this.description, dueDate: this.dueDate, priority: this.priority};\n    }\n}\n\n//# sourceURL=webpack://todolist/./src/todo.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\nclass UI {\n    static loadProjects() {\n        const projectsList = document.getElementById('projects-list');\n\n        _index__WEBPACK_IMPORTED_MODULE_0__.Storage.getProjects().forEach(element => {\n            projectsList.innerHTML += \n                `<div class=\"project-title\">\n                 <h1>${element.title}</h1>\n                 <button class=\"project-button\">show</button>\n                 </div>`;\n        });\n\n        UI.initProjectListButtons();\n    }\n\n    static loadProjectContent(title) {\n\n        const projectContent = document.getElementById('project-content');\n        projectContent.innerHTML  = `<div class=\"project-title\">${title}</div>`;\n\n        _index__WEBPACK_IMPORTED_MODULE_0__.Storage.getProject(title).items.forEach((todo) => {\n            \n           let todoClassName = \"todo-item\";\n           if (todo.status == 'inactive') todoClassName += \" todo-inactive\";\n\n            projectContent.innerHTML += `\n                                        <div class=\"${todoClassName}\">  \n\n                                            <div class=\"todo-buttons\">\n                                                    <i class=\"fa fa-circle-thin\"></i>\n                                                    <i class=\"fa fa-check-circle-o\"></i>\n                                            </div>\n\n                                            \n                                            <div>${todo.title}</div>\n                                            <div>${todo.description}</div>\n                                            <div>${todo.dueDate}</div>\n                                            <div><input type=\"date\" class=\"due-date-picker\"></div>\n\n                                            <div class=\"todo-buttons\">\n                                                    <i class=\"fa fa-pencil-square-o\"></i>\n                                                    <i class=\"fa fa-trash\"></i>\n                                            </div>\n                                        \n                                        </div>`;\n        });\n\n        //project footer\n        projectContent.innerHTML += `<div class=\"todo-add-button\">\n                                        <button><i class=\"fa fa-plus\"></i></button>                                                                 \n                                    </div>\n\n                                    <div class=\"todo-add-popup\">\n                                        <input type=\"tetx\" placeholder=\"title\">\n                                        <div class=\"todo-buttons\">\n                                                    <i class=\"fa fa-check\"></i>\n                                                    <i class=\"fa fa-times\"></i>\n                                        </div>\n                                    </div>`;\n\n\n        UI.initProjectButtons();\n    }\n\n    static initProjectListButtons() {\n        let projectButtons = document.querySelectorAll('.project-button');\n\n        projectButtons.forEach((button) => {\n            button.addEventListener('click', (e) =>{\n                let projectName = e.target.previousElementSibling.textContent;\n\n                UI.loadProjectContent(projectName);\n            });\n        });\n    }\n\n    \n    static initProjectButtons() {\n        let addTodoButtons = document.querySelectorAll('.todo-add-button');\n        let removeTodoButtons = document.querySelectorAll('.todo-remove-button');\n        let dueDatePicker = document.querySelectorAll('.due-date-picker');\n        let todoButtons = document.querySelectorAll('.todo-buttons');\n        let todoAddButton = document.querySelector('.todo-add-button');\n\n        todoAddButton.addEventListener('click', (e) => {\n            console.log(e.target.lastChild);\n\n            document.querySelector('.todo-add-button').classList.add('active');\n            document.querySelector('.todo-add-popup').classList.add('active');\n        });\n\n        todoButtons.forEach((button) => {\n            button.addEventListener('click', (e) => {\n                if (e.target.classList.contains('fa-circle-thin')) UI.setStatus(e.target, 'inactive');\n                if (e.target.classList.contains('fa-check-circle-o')) UI.setStatus(e.target, 'active');\n                if (e.target.classList.contains('fa-trash')) UI.removeTodo(e.target);\n            });\n        });\n\n        dueDatePicker.forEach((picker) => {\n            picker.addEventListener('change', (e) => {\n\n                let dueDate = e.target.value;\n\n                let todoName = e.target.parentNode.parentNode.firstElementChild.textContent;\n                let projectName = e.target.parentNode.parentNode.parentNode.firstChild.textContent;\n\n                _index__WEBPACK_IMPORTED_MODULE_0__.Storage.updateProjectTodo(projectName, todoName, {dueDate});\n\n                UI.loadProjectContent(projectName);\n            });\n        });\n    }\n\n    static setStatus(target, status) {\n\n        const todo = target.parentElement.nextElementSibling.textContent;\n        const projectName = target.parentElement.parentElement.parentElement.firstChild.textContent;\n\n        _index__WEBPACK_IMPORTED_MODULE_0__.Storage.updateProjectTodo(projectName, todo, {status});\n        UI.loadProjectContent(projectName);\n    }\n\n    static removeTodo(target) {\n\n        console.log(target);\n        const todo = target.parentElement.parentElement.children[1].textContent;\n        const projectName = target.parentElement.parentElement.parentElement.firstChild.textContent;\n\n        _index__WEBPACK_IMPORTED_MODULE_0__.Storage.removeTodo(projectName, todo);\n        UI.loadProjectContent(projectName);\n    }\n\n\n}\n\n//# sourceURL=webpack://todolist/./src/ui.js?");

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