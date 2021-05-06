import Todo from "./todo";
import Storage from "./storage";
import UI from "./ui";

export {Todo, Storage};



// list.save();
Storage.loadTodoList();
//console.log(Storage.getList());

UI.loadProjects();
UI.loadProjectContent('default');
//Storage.addProject('new');
console.log(Storage.projects);

//Storage.getTodoList();
