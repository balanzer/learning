package com.mtv.userprofile.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Person {

	@Column
	private String firstName;

	@Column
	private String lastName;

	protected Person() {
	}

	public Person(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	@Override
	public String toString() {
		return " firstName='" + this.firstName + '\'' + ", lastname='" + this.lastName + "\' ";
	}
}
