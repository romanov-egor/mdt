package ru.romanov.mydailytasks.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;
import ru.romanov.mydailytasks.web.model.TaskWebModel;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

public interface TaskService {
    @Transactional
    TaskWebModel create(TaskWebModel taskWebModel) throws ParseException;

    @Transactional
    TaskWebModel update(TaskWebModel taskWebModel) throws ParseException;

    @Transactional
    TaskWebModel delete(Long id);

    @Transactional
    TaskWebModel get(Long id);

    @Transactional
    List<TaskWebModel> getAllByCategory(Long categoryId);

    @Transactional
    List<TaskWebModel> getAllByScheduled(boolean scheduled);

    @Transactional
    List<TaskWebModel> getAllByCategoryIdAndScheduled(Long categoryId, boolean scheduled);

    @Transactional
    List<TaskWebModel> getAllWithScheduleDateBefore(Date date);

    @Transactional
    @Scheduled(cron = "0/5 * * * * ?")
    void runWorkflowActionJob();
}
