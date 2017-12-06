package ru.romanov.mydailytasks.service;

import org.springframework.transaction.annotation.Transactional;
import ru.romanov.mydailytasks.web.model.TaskWebModel;

import java.text.ParseException;
import java.util.List;

public interface TaskService {
    TaskWebModel create(TaskWebModel taskWebModel) throws ParseException;

    TaskWebModel update(TaskWebModel taskWebModel) throws ParseException;

    TaskWebModel delete(Long id);

    TaskWebModel get(Long id);

    List<TaskWebModel> getAllByCategory(Long categoryId);

    @Transactional
    List<TaskWebModel> getAllByScheduled(boolean scheduled);

    @Transactional
    List<TaskWebModel> getAllByCategoryIdAndScheduled(Long categoryId, boolean scheduled);
}
