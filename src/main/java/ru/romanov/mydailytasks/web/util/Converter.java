package ru.romanov.mydailytasks.web.util;

import ru.romanov.mydailytasks.persistence.entity.Category;
import ru.romanov.mydailytasks.persistence.entity.Task;
import ru.romanov.mydailytasks.web.model.CategoryWebModel;
import ru.romanov.mydailytasks.web.model.TaskWebModel;

public class Converter {

    public static TaskWebModel toWebModel(Task task) {
        TaskWebModel taskWebModel = new TaskWebModel();
        taskWebModel.setId(task.getId());
        taskWebModel.setText(task.getText());
        taskWebModel.setCategoryId(task.getCategoryId());
        return taskWebModel;
    }

    public static CategoryWebModel toWebModel(Category category) {
        CategoryWebModel categoryWebModel = new CategoryWebModel();
        categoryWebModel.setId(category.getId());
        categoryWebModel.setTitle(category.getTitle());
        return categoryWebModel;
    }
}