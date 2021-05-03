import Project from "./project";
import Todo from "./todo";
import Storage from "./storage";
import UI from "./ui";

export {Project, Todo, Storage};


let pr1 = new Project('proj1');
pr1.addTodo('Tit', 'Des', 'due', 'high');
pr1.addTodo('Tit2', 'Des2', 'due2', 'high2');
pr1.addTodo('Tit3', 'Des3', 'due3', 'high3');

let pr2 = new Project('proj2');
pr2.addTodo('Tit-2', 'Des', 'due', 'high');
pr2.addTodo('Tit2-2', 'Des2', 'due2', 'high2');

// list.projectList.push(pr1);
// list.projectList.push(pr2);


// list.save();


UI.loadProjects();
