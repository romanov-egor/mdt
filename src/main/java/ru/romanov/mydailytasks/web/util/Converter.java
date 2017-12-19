package ru.romanov.mydailytasks.web.util;

import ru.romanov.mydailytasks.constants.WorkflowActionType;
import ru.romanov.mydailytasks.persistence.entity.Category;
import ru.romanov.mydailytasks.persistence.entity.Task;
import ru.romanov.mydailytasks.persistence.entity.User;
import ru.romanov.mydailytasks.web.model.CategoryWebModel;
import ru.romanov.mydailytasks.web.model.TaskWebModel;
import ru.romanov.mydailytasks.web.model.UserWebModel;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class Converter {

    public static TaskWebModel toWebModel(Task task) {
        TaskWebModel taskWebModel = new TaskWebModel();
        taskWebModel.setId(task.getId());
        taskWebModel.setText(task.getText());
        taskWebModel.setDone(task.isDone());
        taskWebModel.setWorkflowActionType(WorkflowActionType.getNameById(task.getWorkflowActionType()));
        taskWebModel.setScheduled(task.isScheduled());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        taskWebModel.setScheduleDate(dateFormat.format(task.getScheduleDate()));
        taskWebModel.setCategoryId(task.getCategoryId());
        return taskWebModel;
    }

    public static CategoryWebModel toWebModel(Category category) {
        CategoryWebModel categoryWebModel = new CategoryWebModel();
        categoryWebModel.setId(category.getId());
        categoryWebModel.setTitle(category.getTitle());
        return categoryWebModel;
    }

    public static UserWebModel toWebModel(User user) {
        UserWebModel userWebModel = new UserWebModel();
        userWebModel.setLogin(user.getLogin());
        userWebModel.setPassword(user.getPassword());
        return userWebModel;
    }
}
