package ru.pes.todos.models;

import javax.persistence.*;

@Entity
@Table(name = "Todo")
public class ToDo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String content;
    private boolean complete;

    protected ToDo() {}

    public ToDo(String content, boolean complete) {
        this.content = content;
        this.complete = complete;
    }

    public int getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }
}
