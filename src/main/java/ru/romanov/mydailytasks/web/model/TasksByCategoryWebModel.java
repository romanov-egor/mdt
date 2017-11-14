package ru.romanov.mydailytasks.web.model;

import java.util.List;

public class TasksByCategoryWebModel {

    private Long id;

    private String title;

    private List<TaskWebModel> tasks;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<TaskWebModel> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskWebModel> tasks) {
        this.tasks = tasks;
    }
}
