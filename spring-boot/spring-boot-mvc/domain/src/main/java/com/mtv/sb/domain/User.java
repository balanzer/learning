package com.mtv.sb.domain;

public class User extends Profile {

	@Override
	public String toString() {
		return "User [toString()=" + super.toString() + "]";
	}
	public User() {
		super();
	}
	public User(Long uid, String firstName, String lastName, String email) {
		super(uid, firstName, lastName, email);
		// TODO Auto-generated constructor stub
	}


}
