package com.mtv.userprofile.data.query;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;

import com.mtv.userprofile.entity.Course;
import com.mtv.userprofile.entity.Person;
import com.mtv.userprofile.entity.Staff;
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
	public void intermediateQueryExamples() {
		System.out.println("Find students by name and traverse entities \n"
				+ this.studentRepository.findByAttendeeFirstNameAndAttendeeLastName("jane", "doe"));
		System.out.println("Find students by name with Person Object \n"
				+ this.studentRepository.findByAttendee(new Person("jane", "doe")));

		System.out.println("\nFind Students older than 19");
		this.studentRepository.findByAgeGreaterThan(19).forEach(System.out::println);

		System.out.println("\nFind Students under 19");
		this.studentRepository.findByAgeLessThan(19).forEach(System.out::println);

		System.out.println("\nFind Students with last name Doe, despite the case");
		this.studentRepository.findByAttendeeLastNameIgnoreCase("Doe").forEach(System.out::println);

		System.out.println("\nFind Students with an i in the last name");
		this.studentRepository.findByAttendeeLastNameLike("%i%").forEach(System.out::println);

		System.out.println(
				"\nFind first Student in alphabet \n" + this.studentRepository.findFirstByOrderByAttendeeLastNameAsc());

		System.out.println("\nFind oldest Student \n" + this.studentRepository.findTopByOrderByAgeDesc());

		System.out.println("\nFind 3 oldest Students \n" + this.studentRepository.findTop3ByOrderByAgeDesc());

	}

	@Test
	public void jpqlQueries() {
		// *******Method Simplification*******

		System.out.println("Find Courses where Jones is the department Chair with Property Expression");
		this.courseRepository.findByDepartmentChairMemberLastName("Jones").forEach(System.out::println);

		// Select c from Course c where c.department.chair.member.lastName=:chair
		System.out.println("\nFind Courses where Jones is the department Chair with @Query");
		this.courseRepository.findByChairLastName("Jones").forEach(System.out::println);

		// *******Complex Queries********
		final Course english101 = this.courseRepository.findByName("English 101");

		// Select c from Course c join c.prerequisites p where p.id = ?1
		System.out.println("\nFind Courses where English 101 is a prerequisite");
		this.courseRepository.findCourseByPrerequisite(english101.getId()).forEach(System.out::println);

		// Select new com.example.university.view.CourseView
		// (c.name, c.instructor.member.lastName, c.department.name) from Course c where
		// c.id=?1
		System.out.println("\nCourseView for English 101 \n" + this.courseRepository.getCourseView(english101.getId()));
	}

	@Test
	public void pagingAndSortingQueries() {
		System.out.println("\nFind all 3-credit courses");
		this.courseRepository.findByCredits(3).forEach(System.out::println);

		System.out.println("\nFind first 4 3-credit courses, sort by credit, then course name");
		final Page<Course> courses = this.courseRepository.findByCredits(3,
				new PageRequest(0, 4, Sort.Direction.ASC, "credits", "name"));
		courses.forEach(System.out::println);

		System.out.println("\nFind all staff members, sort alphabetically by last name");
		final Sort sortByLastName = new Sort(Sort.Direction.ASC, "member.lastName");
		this.staffRepository.findAll(sortByLastName).forEach(System.out::println);

		final Page<Staff> members = this.staffRepository.findAll(new PageRequest(0, 5, sortByLastName));
		System.out.println("\nTotal number of staff members=" + members.getTotalElements());
		System.out.println("Total number of 5-element-pages=" + members.getTotalPages());
		System.out.println("Find first 5 Staff members, sort alphabetically by last name");
		members.forEach(System.out::println);
	}

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
