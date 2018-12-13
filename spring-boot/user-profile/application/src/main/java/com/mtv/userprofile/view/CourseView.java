package com.mtv.userprofile.view;

public class CourseView {
	private final String name;
	private final String instructorLastName;
	private final String deptName;

	public CourseView(String name, String instructorLastName, String deptName) {
		this.name = name;
		this.instructorLastName = instructorLastName;
		this.deptName = deptName;
	}

	public String getDeptName() {
		return this.deptName;
	}

	public String getInstructorLastName() {
		return this.instructorLastName;
	}

	public String getName() {
		return this.name;
	}

	@Override
	public String toString() {
		return "CourseView{" + "name='" + this.name + '\'' + ", instructorLastName='" + this.instructorLastName + '\''
				+ ", deptName='" + this.deptName + '\'' + '}';
	}
}
