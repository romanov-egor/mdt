package ru.romanov.mydailytasks.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.romanov.mydailytasks.persistence.entity.User;
import ru.romanov.mydailytasks.persistence.repository.UserRepository;
import ru.romanov.mydailytasks.service.UserService;

@Component("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	public User getUser(Long userId) {
		return userRepository.getOne(userId);
	}
}
