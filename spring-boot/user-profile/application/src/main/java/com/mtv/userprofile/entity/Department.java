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
import javax.persistence.Table;

@Entity
@Table(name = "Department")
public class Department {

	@Id
	@GeneratedValue
	private Integer id;

	@Column
	private String name;

	@OneToMany(mappedBy = "department", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private final List<Course> courses = new ArrayList<>();

	protected Department() {
	}

	public Department(String name) {
		this.name = name;
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

	@Override
	public String toString() {
		return "Department{" + "id=" + this.id + ", name='" + this.name + '\'' + ", courses=" + this.courses + '}';
	}

}
