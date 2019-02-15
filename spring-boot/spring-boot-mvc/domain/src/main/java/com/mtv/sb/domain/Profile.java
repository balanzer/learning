package com.mtv.sb.domain;

public class Profile {
	private String firstName;
	private String lastName;
	private String email;
	public Profile(Long uid, String firstName, String lastName, String email) {
		this.firstName=firstName;
		this.uid=uid;
		this.lastName=lastName;
		this.email=email;
	}

	public Profile() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Profile [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", uid=" + uid + "]";
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	private Long uid;
	
	
	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

}
