package ru.pes.todos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.pes.todos.models.ToDo;
import ru.pes.todos.services.ToDoService;

import java.util.List;

@RestController
public class MainController {

    @Autowired
    ToDoService todoService;

    @RequestMapping("/atodo")
    public ToDo addToDo(@RequestParam(value = "content") String content) {
        ToDo todo = new ToDo(content, false);
        todoService.findToDoById(todoService.insertToDo(todo));
        return todo;
    }

    @RequestMapping("/utodo")
    public void changeToDo(@RequestParam(value = "id") int id,
                           @RequestParam(value = "content") String content,
                           @RequestParam(value = "complete") boolean complete) {
        todoService.updateToDo(id, content, complete);
        return;
    }

    @RequestMapping("/dtodo")
    public int removeToDo(@RequestParam(value = "id") int id) {
        todoService.deleteToDo(id);
        return id;
    }

    @RequestMapping("/utodos")
    public void changeToDos(@RequestParam(value = "complete") boolean complete) {
        todoService.updateAllToDos(complete);
        return;
    }

    @RequestMapping("/todos")
    public List<ToDo> getAllToDos() {
        return todoService.findAllToDos();
    }

}
