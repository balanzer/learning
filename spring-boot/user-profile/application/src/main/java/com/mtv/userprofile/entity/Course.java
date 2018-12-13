package com.mtv.userprofile.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "COURSE")
public class Course {

	@Id
	@GeneratedValue
	private Integer id;

	@Column
	private String name;

	@Column
	private Integer credits;

	@OneToOne
	private Staff instructor;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private final List<Course> prerequisites = new ArrayList<>();

	@ManyToOne
	private Department department;

	protected Course() {
	}

	public Course(String name, Integer credits, Staff instructor, Department department) {
		this.name = name;
		this.credits = credits;
		this.instructor = instructor;
		this.department = department;
	}

	public Course addPrerequisite(Course prerequisite) {
		this.prerequisites.add(prerequisite);
		return this;
	}

	public Department getDepartment() {
		return this.department;
	}

	public Integer getId() {
		return this.id;
	}

	public Staff getInstructor() {
		return this.instructor;
	}

	public String getName() {
		return this.name;
	}

	@Override
	public String toString() {
		return "Course{" + "name='" + this.name + '\'' + ", id=" + this.id + ", credits=" + this.credits
				+ ", instructor=" + this.instructor + ", department=" + this.department.getName() + '}';
	}
}
