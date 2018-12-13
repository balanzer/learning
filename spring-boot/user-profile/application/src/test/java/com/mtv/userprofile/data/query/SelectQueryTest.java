package com.mtv.userprofile.data.query;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mtv.userprofile.repo.CourseRepository;
import com.mtv.userprofile.repo.DepartmentRepository;
import com.mtv.userprofile.repo.StaffRepository;
import com.mtv.userprofile.repo.StudentRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SelectQueryTest {

	@Autowired
	StudentRepository studentRepository;

	@Autowired
	StaffRepository staffRepository;

	@Autowired
	CourseRepository courseRepository;

	@Autowired
	DepartmentRepository departmentRepository;

	@Test
	public void simpleQueryExamples() {

		System.out.println("\nFind 20 year old students");
		this.studentRepository.findByAge(20).forEach(System.out::println);
		System.out.println("\nFind full time students");
		this.studentRepository.findByFullTime(true).forEach(System.out::println);
		System.out.println("\nFind students with 'doe' as last name");
		this.studentRepository.findByAttendeeLastName("doe").forEach(System.out::println);

	}
}
