package com.mtv.userprofile;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mtv.userprofile.entity.Course;
import com.mtv.userprofile.entity.Department;
import com.mtv.userprofile.entity.Person;
import com.mtv.userprofile.entity.Staff;
import com.mtv.userprofile.entity.Student;
import com.mtv.userprofile.repo.CourseRepository;
import com.mtv.userprofile.repo.DepartmentRepository;
import com.mtv.userprofile.repo.StaffRepository;
import com.mtv.userprofile.repo.StudentRepository;

@SpringBootApplication
public class UserProfileApplication implements CommandLineRunner {

	private static Logger logger = LogManager.getLogger(UserProfileApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(UserProfileApplication.class, args);
		logger.info("*********************************************************************");
		logger.info("Application started - UserProfileApplication");
		logger.info("*********************************************************************");
	}

	@Autowired
	StudentRepository studentRepository;

	@Autowired
	StaffRepository staffRepository;

	@Autowired
	CourseRepository courseRepository;

	@Autowired
	DepartmentRepository departmentRepository;

	@Override
	public void run(String... args) throws Exception {
		logger.info("*********************************************************************");
		logger.info("CommandLineRunner - run");
		logger.info("CommandLineRunner - initiate Data to H2");

		final boolean fullTime = true;
		this.studentRepository.save(new Student(new Person("jane", "doe"), fullTime, 20));
		this.studentRepository.save(new Student(new Person("john", "doe"), fullTime, 22));
		this.studentRepository.save(new Student(new Person("mike", "smith"), fullTime, 18));
		this.studentRepository.save(new Student(new Person("ally", "kim"), !fullTime, 19));

		// Staff
		final Staff deanJones = this.staffRepository.save(new Staff(new Person("John", "Jones")));
		final Staff deanMartin = this.staffRepository.save(new Staff(new Person("Matthew", "Martin")));
		final Staff profBrown = this.staffRepository.save(new Staff(new Person("James", "Brown")));
		final Staff profMiller = this.staffRepository.save(new Staff(new Person("Judy", "Miller")));
		final Staff profDavis = this.staffRepository.save(new Staff(new Person("James", "Davis")));
		final Staff profMoore = this.staffRepository.save(new Staff(new Person("Allison", "Moore")));
		final Staff profThomas = this.staffRepository.save(new Staff(new Person("Tom", "Thomas")));
		final Staff profGreen = this.staffRepository.save(new Staff(new Person("Graham", "Green")));
		final Staff profWhite = this.staffRepository.save(new Staff(new Person("Whitney", "White")));
		final Staff profBlack = this.staffRepository.save(new Staff(new Person("Jack", "Black")));
		final Staff profKing = this.staffRepository.save(new Staff(new Person("Queen", "King")));

		// Departments
		final Department humanities = this.departmentRepository.save(new Department("Humanities", deanJones));
		final Department naturalSciences = this.departmentRepository
				.save(new Department("Natural Sciences", deanMartin));
		final Department socialSciences = this.departmentRepository.save(new Department("Social Sciences", deanJones));

		// Humanities Courses
		final Course english101 = this.courseRepository.save(new Course("English 101", 3, profBlack, humanities));
		final Course english202 = this.courseRepository.save(new Course("English 202", 3, profBlack, humanities));
		this.courseRepository.save(english202.addPrerequisite(english101));
		final Course english201 = this.courseRepository.save(new Course("English 201", 3, profBrown, humanities));
		this.courseRepository.save(english201.addPrerequisite(english101));

		// Natural Science Courses
		final Course chemistry = this.courseRepository.save(new Course("Chemistry", 3, profDavis, naturalSciences));
		final Course physics = this.courseRepository.save(new Course("Physics", 3, profDavis, naturalSciences));
		this.courseRepository.save(physics.addPrerequisite(chemistry));
		final Course cProgramming = this.courseRepository
				.save(new Course("C Programming", 3, profMoore, naturalSciences));
		final Course jProgramming = this.courseRepository
				.save(new Course("Java Programming", 3, profMoore, naturalSciences));

		// Social Science Courses
		final Course history101 = this.courseRepository.save(new Course("History 101", 3, profMiller, socialSciences));
		final Course anthro = this.courseRepository.save(new Course("Anthropology ", 3, profKing, socialSciences));
		this.courseRepository.save(anthro.addPrerequisite(history101));
		final Course sociology = this.courseRepository.save(new Course("Sociology", 3, profKing, socialSciences));
		this.courseRepository.save(sociology.addPrerequisite(history101));
		final Course psych = this.courseRepository.save(new Course("Psychology", 3, profWhite, socialSciences));
		this.courseRepository.save(psych.addPrerequisite(history101).addPrerequisite(english101));

		logger.info("CommandLineRunner - Data added to H2");

		logger.info("*********************************************************************");
	}
}
