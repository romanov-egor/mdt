package ru.romanov.mydailytasks.web.model;

import java.util.Date;

public class TaskWebModel {

    private Long id;

    private String text;

    private Long categoryId;

    private boolean done;

    private String workflowActionType;

    private boolean scheduled;

    private String scheduleDate;

    public TaskWebModel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public String getWorkflowActionType() {
        return workflowActionType;
    }

    public void setWorkflowActionType(String workflowActionType) {
        this.workflowActionType = workflowActionType;
    }

    public boolean isScheduled() {
        return scheduled;
    }

    public void setScheduled(boolean scheduled) {
        this.scheduled = scheduled;
    }

    public String getScheduleDate() {
        return scheduleDate;
    }

    public void setScheduleDate(String scheduleDate) {
        this.scheduleDate = scheduleDate;
    }
}
