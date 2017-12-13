package ru.romanov.mydailytasks.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.romanov.mydailytasks.persistence.entity.Task;
import ru.romanov.mydailytasks.persistence.repository.TaskRepository;
import ru.romanov.mydailytasks.service.TaskService;
import ru.romanov.mydailytasks.web.model.TaskWebModel;
import ru.romanov.mydailytasks.web.util.Converter;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;s
import java.util.stream.Collectors;

@Component
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    @Transactional
    public TaskWebModel create(TaskWebModel taskWebModel) throws ParseException {
        Task task = new Task();

        task.setText(taskWebModel.getText());
        task.setCategoryId(taskWebModel.getCategoryId());
        task.setDone(taskWebModel.isDone());
        task.setScheduled(taskWebModel.isScheduled());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        task.setScheduleDate(dateFormat.parse(taskWebModel.getScheduleDate()));

        taskRepository.save(task);
        return Converter.toWebModel(task);
    }

    @Override
    @Transactional
    public TaskWebModel update(TaskWebModel taskWebModel) throws ParseException {
        Task task = taskRepository.findOne(taskWebModel.getId());

        task.setText(taskWebModel.getText());
        task.setCategoryId(taskWebModel.getCategoryId());
        task.setDone(taskWebModel.isDone());
        task.setScheduled(taskWebModel.isScheduled());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        task.setScheduleDate(dateFormat.parse(taskWebModel.getScheduleDate()));

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

    @Override
    @Transactional
    public List<TaskWebModel> getAllByScheduled(boolean scheduled) {
        List<Task> tasks = taskRepository.findByScheduled(scheduled);
        return tasks.stream().map(Converter::toWebModel).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<TaskWebModel> getAllByCategoryIdAndScheduled(Long categoryId, boolean scheduled) {
        List<Task> tasks = taskRepository.findByCategoryIdAndScheduled(categoryId, scheduled);
        return tasks.stream().map(Converter::toWebModel).collect(Collectors.toList());
    }
}
