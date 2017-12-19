package ru.romanov.mydailytasks.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.romanov.mydailytasks.service.UserService;
import ru.romanov.mydailytasks.web.model.UserWebModel;

@RestController
@RequestMapping(path = "/user")
public class UserRest {

    @Autowired
    UserService userService;

    @RequestMapping(path = "/create", method = RequestMethod.POST)
    public ResponseEntity<UserWebModel> create(@RequestBody UserWebModel userWebModel) {
        UserWebModel result = userService.create(userWebModel);
        return new ResponseEntity<UserWebModel>(result, HttpStatus.OK);
    }
}
