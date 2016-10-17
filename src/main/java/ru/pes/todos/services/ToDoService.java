package ru.pes.todos.services;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.pes.todos.models.ToDo;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
@Transactional
public class ToDoService {

    @PersistenceContext
    private EntityManager eManager;

    public int insertToDo(ToDo todo) {
        eManager.persist(todo);
        return todo.getId();
    }

    public ToDo findToDoById(int id) {
        return eManager.find(ToDo.class, id);
    }

    public int updateToDo(int id, String content, boolean complete) {
        String qString = "UPDATE Todo SET content = ?, complete = ? WHERE id = ?";
        Query query = eManager.createNativeQuery(qString);
        query.setParameter(1, content);
        query.setParameter(2, complete);
        query.setParameter(3, id);
        int result = query.executeUpdate();
        return result;
    }

    public int deleteToDo(int id) {
        String qString = "DELETE FROM Todo WHERE id = ?";
        Query query = eManager.createNativeQuery(qString);
        query.setParameter(1, id);
        query.executeUpdate();
        return id;
    }

    public int updateAllToDos(boolean complete) {
        int result = 0;
        List<ToDo> todos = findAllToDos();
        for (ToDo todo : todos) {
            result += updateToDo(todo.getId(), todo.getContent(), complete);
        }
        return result;
    }

    public List<ToDo> findAllToDos() {
        String qString = "SELECT T FROM ToDo T";
        Query query = eManager.createQuery(qString);
        List<ToDo> resultList = (List<ToDo>) query.getResultList();
        return resultList;
    }

}
