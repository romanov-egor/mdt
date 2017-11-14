package ru.romanov.mydailytasks.service;

import ru.romanov.mydailytasks.persistence.entity.User;

public interface UserService {
	
	User getUser(Long userId);

}
