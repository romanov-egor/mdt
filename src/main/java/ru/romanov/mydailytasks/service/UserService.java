package ru.romanov.mydailytasks.service;

import ru.romanov.mydailytasks.persistence.entity.User;
import ru.romanov.mydailytasks.web.model.UserWebModel;

public interface UserService {
	
	UserWebModel getUser(Long id);

	UserWebModel create(UserWebModel userWebModel);

}
