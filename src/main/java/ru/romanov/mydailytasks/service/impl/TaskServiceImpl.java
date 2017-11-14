package ru.romanov.mydailytasks.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.romanov.mydailytasks.persistence.entity.Task;
import ru.romanov.mydailytasks.persistence.repository.TaskRepository;
import ru.romanov.mydailytasks.service.TaskService;
import ru.romanov.mydailytasks.web.model.TaskWebModel;
import ru.romanov.mydailytasks.web.util.Converter;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    @Transactional
    public TaskWebModel create(TaskWebModel taskWebModel) {
        Task task = new Task();

        task.setText(taskWebModel.getText());
        task.setCategoryId(taskWebModel.getCategoryId());

        taskRepository.save(task);
        return Converter.toWebModel(task);
    }

    @Override
    @Transactional
    public TaskWebModel update(TaskWebModel taskWebModel) {
        Task task = taskRepository.findOne(taskWebModel.getId());

        task.setText(taskWebModel.getText());
        task.setCategoryId(taskWebModel.getCategoryId());

        return Converter.toWebModel(task);
    }

    @Override
    @Transactional
    public TaskWebModel delete(Long id) {
        Task task = taskRepository.findOne(id);
        TaskWebModel result = Converter.toWebModel(task);
        taskRepository.delete(task);
        return result;
    }

    @Override
    @Transactional
    public TaskWebModel get(Long id) {
        Task task = taskRepository.findOne(id);
        if (task != null) {
            return Converter.toWebModel(task);
        }
        return new TaskWebModel();
    }

    @Override
    @Transactional
    public List<TaskWebModel> getAllByCategory(Long categoryId) {
        List<Task> tasks = taskRepository.findByCategoryId(categoryId);
        return tasks.stream().map(Converter::toWebModel).collect(Collectors.toList());
    }
}
