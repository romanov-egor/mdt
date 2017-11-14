package ru.romanov.mydailytasks.service;

import ru.romanov.mydailytasks.web.model.TaskWebModel;

import java.util.List;

public interface TaskService {
    TaskWebModel create(TaskWebModel taskWebModel);

    TaskWebModel update(TaskWebModel taskWebModel);

    TaskWebModel delete(Long id);

    TaskWebModel get(Long id);

    List<TaskWebModel> getAllByCategory(Long categoryId);
}
