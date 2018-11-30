package com.mtv.userprofile.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "STUDENT")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer studentId;

	@Column
	private boolean fullTime;

	@Column
	private Integer age;

	@Embedded
	private Person attendee;

	@OneToMany
	private List<Course> courses = new ArrayList<>();

	protected Student() {
	}

	public Student(Person attendee, boolean fullTime, Integer age) {
		this.attendee = attendee;
		this.fullTime = fullTime;
		this.age = age;
		this.courses = new ArrayList<>();
	}

	public Integer getAge() {
		return this.age;
	}

	public Person getAttendee() {
		return this.attendee;
	}

	public List<Course> getCourses() {
		return this.courses;
	}

	public Integer getStudentId() {
		return this.studentId;
	}

	public boolean isFullTime() {
		return this.fullTime;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	@Override
	public String toString() {
		return "Student{" + "studentId=" + this.studentId + ", " + this.attendee + ", fullTime=" + this.fullTime
				+ ", age=" + this.age + "}\n";
	}

}
