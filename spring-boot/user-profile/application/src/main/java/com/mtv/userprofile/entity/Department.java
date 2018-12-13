package com.mtv.userprofile.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Department")
public class Department {

	@Id
	@GeneratedValue
	private Integer id;

	@Column
	private String name;

	@OneToOne
	private Staff chair;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "department", cascade = CascadeType.ALL)
	private List<Course> courses = new ArrayList<>();

	protected Department() {
	}

	public Department(String name, Staff chair) {
		this.name = name;
		this.chair = chair;
	}

	public void addCourse(Course course) {
		this.courses.add(course);
	}

	public Integer getId() {
		return this.id;
	}

	public String getName() {
		return this.name;
	}

	public void setChair(Staff chair) {
		this.chair = chair;
	}

	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Department{" + "chair=" + this.chair + ", name='" + this.name + '\'' + ", id=" + this.id + '}';
	}
}
