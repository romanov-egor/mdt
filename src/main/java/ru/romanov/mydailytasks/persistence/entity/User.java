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
    private String firstName;
    
	@Column
    private String lastName;

    protected User() {}

	public Long getId() {
		return userId;
	}

	public void setId(Long userId) { this.userId = userId; }
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Override
	public String toString() {
		return this.userId + " " + this.firstName + " " + this.lastName;
	}
    
}
