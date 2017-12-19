package ru.romanov.mydailytasks.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column
    private Long userId;
	
	@Column
    private String login;
    
	@Column
    private String password;

	public Long getId() {
		return userId;
	}

	public void setId(Long userId) { this.userId = userId; }
	
	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return this.userId + " " + this.login + " " + this.password;
	}
    
}
