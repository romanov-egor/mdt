package ru.romanov.mydailytasks.web.model;

import java.util.ArrayList;
import java.util.List;

public class TasksByDateWebModel {

    private String date;

    private List<TaskWebModel> tasks = new ArrayList<>();

    public TasksByDateWebModel(String date) {
        this.date = date;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<TaskWebModel> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskWebModel> tasks) {
        this.tasks = tasks;
    }
}
