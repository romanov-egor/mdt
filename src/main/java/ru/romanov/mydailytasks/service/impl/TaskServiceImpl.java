package ru.romanov.mydailytasks.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.romanov.mydailytasks.constants.WorkflowActionType;
import ru.romanov.mydailytasks.persistence.entity.Task;
import ru.romanov.mydailytasks.persistence.repository.TaskRepository;
import ru.romanov.mydailytasks.service.TaskService;
import ru.romanov.mydailytasks.web.model.TaskWebModel;
import ru.romanov.mydailytasks.web.util.Converter;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
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
        task.setWorkflowActionType(WorkflowActionType.getIdByName(taskWebModel.getWorkflowActionType()));
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
        task.setWorkflowActionType(WorkflowActionType.getIdByName(taskWebModel.getWorkflowActionType()));
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

    @Override
    @Transactional
    public List<TaskWebModel> getAllWithScheduleDateBefore(Date date) {
        List<Task> tasks = taskRepository.findByDoneAndScheduledAndScheduleDateBefore(false,true, date);
        return tasks.stream().map(Converter::toWebModel).collect(Collectors.toList());
    }

    @Override
    @Transactional
    @Scheduled(cron = "0/5 * * * * ?")
    // (cron = "0 1 0 * * ?")
    public void runWorkflowActionJob() {
        //System.out.println("Here i am!");
        Date now = new Date();
        List<Task> tasks = taskRepository.findByDoneAndScheduledAndScheduleDateBefore(false, true, now);
        for (Task task : tasks) {
            WorkflowActionType workflowActionType = WorkflowActionType.valueOf(task.getWorkflowActionType());
            switch (workflowActionType) {
                case DESCHEDULE:
                    task.setScheduled(false);
                    taskRepository.save(task);
                    break;
                case RESCHEDULE:
                    task.setScheduleDate(now);
                    taskRepository.save(task);
                    break;
                case DELETE:
                    taskRepository.delete(task);
                    break;
                default:
                    break;
            }
        }
    }
}
