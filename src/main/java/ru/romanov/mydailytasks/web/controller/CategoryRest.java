package ru.romanov.mydailytasks.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.romanov.mydailytasks.service.CategoryService;
import ru.romanov.mydailytasks.service.TaskService;
import ru.romanov.mydailytasks.web.model.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping(path = "/category")
public class CategoryRest {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private TaskService taskService;

    @RequestMapping(path = "/create", method = RequestMethod.POST)
    public ResponseEntity<CategoryWebModel> create(@RequestBody CategoryWebModel categoryWebModel) {
        CategoryWebModel result = categoryService.create(categoryWebModel);
        return new ResponseEntity<CategoryWebModel>(result, HttpStatus.OK);
    }

    @RequestMapping(path = "/update", method = RequestMethod.POST)
    public ResponseEntity<CategoryWebModel> update(@RequestBody CategoryWebModel categoryWebModel) {
        CategoryWebModel result = categoryService.update(categoryWebModel);
        return new ResponseEntity<CategoryWebModel>(result, HttpStatus.OK);
    }

    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    public ResponseEntity<CategoryWebModel> delete(@RequestBody CategoryWebModel categoryWebModel) {
        CategoryWebModel result = categoryService.delete(categoryWebModel.getId());
        return new ResponseEntity<CategoryWebModel>(result, HttpStatus.OK);
    }

    @RequestMapping(path = "/get/{id}", method = RequestMethod.GET)
    public ResponseEntity<CategoryWebModel> get(@PathVariable Long id) {
        CategoryWebModel result = categoryService.get(id);
        return new ResponseEntity<CategoryWebModel>(result, HttpStatus.OK);
    }

    @RequestMapping(path = "/getAllCategories", method = RequestMethod.GET)
    public ResponseEntity<List<CategoryWebModel>> getAllCategories() {
        List<CategoryWebModel> result = categoryService.getAll();
        return new ResponseEntity<List<CategoryWebModel>>(result, HttpStatus.OK);
    }

    @RequestMapping(path = "/getAllTasksByCategory", method = RequestMethod.GET)
    public ResponseEntity<List<TasksByCategoryWebModel>> getAllTasksByCategory() {
        List<CategoryWebModel> categoryWebModels = categoryService.getAll();
        List<TasksByCategoryWebModel> tasksByCategoryWebModels = new ArrayList<>();
        for (CategoryWebModel categoryWebModel : categoryWebModels) {
            TasksByCategoryWebModel tasksByCategoryWebModel = new TasksByCategoryWebModel();
            tasksByCategoryWebModel.setId(categoryWebModel.getId());
            tasksByCategoryWebModel.setTitle(categoryWebModel.getTitle());
            tasksByCategoryWebModel.setTasks(taskService.getAllByCategory(categoryWebModel.getId()));
            tasksByCategoryWebModels.add(tasksByCategoryWebModel);
        }
        return new ResponseEntity<List<TasksByCategoryWebModel>>(tasksByCategoryWebModels, HttpStatus.OK);
    }

    @RequestMapping(path = "/getAllTasksByCategory/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<TaskWebModel>> getAllTasksByCategoryId(@PathVariable Long id) {
        List<TaskWebModel> taskWebModels = taskService.getAllByCategory(id);
        return new ResponseEntity<List<TaskWebModel>>(taskWebModels, HttpStatus.OK);
    }

    @RequestMapping(path = "/getAllTasksByDate", method = RequestMethod.GET)
    public ResponseEntity<List<TasksByDateWebModel>> getAllTasksByDate() {
        List<TaskWebModel> taskWebModels = taskService.getAllByScheduled(true);
        Collections.sort(taskWebModels, Comparator.comparing(TaskWebModel::getScheduleDate,
                Comparator.nullsLast(Comparator.naturalOrder())));
        taskWebModels.removeIf(p -> p.getScheduleDate() == null);
        List<TasksByDateWebModel> tasksByDateWebModels = new ArrayList<TasksByDateWebModel>();
        for (TaskWebModel taskWebModel : taskWebModels) {
            Optional<TasksByDateWebModel> tasksByDateWebModel = tasksByDateWebModels.stream().filter(
                    p -> p.getDate().equals(taskWebModel.getScheduleDate())).findFirst();
            if (tasksByDateWebModel.isPresent()) {
                tasksByDateWebModel.get().getTasks().add(taskWebModel);
            } else {
                TasksByDateWebModel newTasksByDateWebModel = new TasksByDateWebModel(taskWebModel.getScheduleDate());
                newTasksByDateWebModel.getTasks().add(taskWebModel);
                tasksByDateWebModels.add(newTasksByDateWebModel);
            }
        }
        return new ResponseEntity<List<TasksByDateWebModel>>(tasksByDateWebModels, HttpStatus.OK);
    }

    @RequestMapping(path = "/getAllTasksByDate/{date}", method = RequestMethod.GET)
    public ResponseEntity<List<TaskWebModel>> getAllTasksByDate(@PathVariable String date) {
        List<TaskWebModel> taskWebModels = taskService.getAllByScheduled(true);
        if (date != null) {
            taskWebModels.removeIf(p -> !date.equals(p.getScheduleDate()));
            return new ResponseEntity<List<TaskWebModel>>(taskWebModels, HttpStatus.OK);
        } else {
            return new ResponseEntity<List<TaskWebModel>>(new ArrayList<TaskWebModel>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(path = "/getAllScheduledDatesByMonth/{firstDateOfMonth}", method = RequestMethod.GET)
    public ResponseEntity<List<String>> getAllScheduledDatesByMonth(@PathVariable String firstDateOfMonth) {
        List<TaskWebModel> taskWebModels = taskService.getAllByScheduled(true);
        taskWebModels.removeIf(p -> p.getScheduleDate() == null);
        List<String> result = new ArrayList<String>();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date dateFromRequest = null;
        try {
            dateFromRequest = dateFormat.parse(firstDateOfMonth);
            Calendar cal = Calendar.getInstance();
            cal.setTime(dateFromRequest);
            int requestMonth = cal.get(Calendar.MONTH);
            int requestYear = cal.get(Calendar.YEAR);
            for (TaskWebModel taskWebModel : taskWebModels) {
                Date taskScheduledDate = dateFormat.parse(taskWebModel.getScheduleDate());
                cal.setTime(taskScheduledDate);
                if (requestMonth == cal.get(Calendar.MONTH) && requestYear == cal.get(Calendar.YEAR)) {
                    if (!result.stream().filter(p -> p.equals(taskWebModel.getScheduleDate())).findAny().isPresent()) {
                        result.add(taskWebModel.getScheduleDate());
                    }
                }
            }
        } catch (ParseException e) {
            e.printStackTrace();
            return new ResponseEntity<List<String>>(new ArrayList<String>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<List<String>>(result, HttpStatus.OK);
    }
}
