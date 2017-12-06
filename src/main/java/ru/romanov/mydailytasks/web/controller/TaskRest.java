package ru.romanov.mydailytasks.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.romanov.mydailytasks.service.TaskService;
import ru.romanov.mydailytasks.web.model.TaskWebModel;

import java.text.ParseException;

@RestController
@RequestMapping(path = "/task")
public class TaskRest {

    @Autowired
    private TaskService taskService;

    @RequestMapping(path = "/create", method = RequestMethod.POST)
    public ResponseEntity<TaskWebModel> create(@RequestBody TaskWebModel taskWebModel) {
        TaskWebModel result = null;
        try {
            result = taskService.create(taskWebModel);
        } catch (ParseException e) {
            e.printStackTrace();
            return new ResponseEntity<TaskWebModel>(new TaskWebModel(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<TaskWebModel>(result, HttpStatus.OK);
    }

    @RequestMapping(path = "/get/{id}", method = RequestMethod.GET)
    public ResponseEntity<TaskWebModel> get(@PathVariable Long id) {
        TaskWebModel result = taskService.get(id);
        return new ResponseEntity<TaskWebModel>(result, HttpStatus.OK);
    }

    @RequestMapping(path = "/update", method = RequestMethod.POST)
    public ResponseEntity<TaskWebModel> update(@RequestBody TaskWebModel taskWebModel) {
        TaskWebModel result = null;
        try {
            result = taskService.update(taskWebModel);
        } catch (ParseException e) {
            e.printStackTrace();
            return new ResponseEntity<TaskWebModel>(new TaskWebModel(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<TaskWebModel>(result, HttpStatus.OK);
    }

    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    public ResponseEntity<TaskWebModel> delete(@RequestBody TaskWebModel taskWebModel) {
        TaskWebModel result = taskService.delete(taskWebModel.getId());
        return new ResponseEntity<TaskWebModel>(result, HttpStatus.OK);
    }
}
