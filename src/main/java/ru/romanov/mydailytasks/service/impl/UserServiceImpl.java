package ru.romanov.mydailytasks.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.romanov.mydailytasks.persistence.entity.User;
import ru.romanov.mydailytasks.persistence.repository.UserRepository;
import ru.romanov.mydailytasks.service.UserService;
import ru.romanov.mydailytasks.web.model.UserWebModel;
import ru.romanov.mydailytasks.web.util.Converter;

@Component("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	public UserWebModel getUser(Long userId) {
		return Converter.toWebModel(userRepository.getOne(userId));
	}

	@Override
	public UserWebModel create(UserWebModel userWebModel) {
		User user = new User();
		user.setLogin(userWebModel.getLogin());
		user.setPassword(userWebModel.getPassword());
		return Converter.toWebModel(user);
	}
}
