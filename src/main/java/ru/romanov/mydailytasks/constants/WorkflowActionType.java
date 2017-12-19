package ru.romanov.mydailytasks.constants;

import java.util.Arrays;

public enum WorkflowActionType {

    DESCHEDULE(1, "deschedule"),
    RESCHEDULE(2, "reschedule"),
    DELETE(3, "delete");

    private int id;
    private String name;

    WorkflowActionType(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public static WorkflowActionType valueOf(int id) {
        return Arrays.stream(WorkflowActionType.values()).filter(p -> p.getId() == id).findAny().get();
    }

    public static String getNameById(int id) {
        return valueOf(id).getName();
    }

    public static int getIdByName(String name) {
        return Arrays.stream(WorkflowActionType.values()).filter(p -> p.getName().equals(name)).findAny().get().getId();
    }
}
