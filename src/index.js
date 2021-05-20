import Todo from "./todo";
import Storage from "./storage";
import UI from "./ui";

export {Todo, Storage};



// list.save();
Storage.loadTodoList();
//console.log(Storage.getList());

UI.loadProjects();
UI.expandProject('default');
//Storage.addProject('new');
//Storage.updateTodo('nnnnn', {project: 'New2'});

//Storage.getTodoList();
