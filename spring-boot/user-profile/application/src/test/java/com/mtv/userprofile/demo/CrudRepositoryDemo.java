package com.mtv.userprofile.demo;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mtv.userprofile.entity.Person;
import com.mtv.userprofile.entity.Student;
import com.mtv.userprofile.repo.StudentRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CrudRepositoryDemo {
	@Autowired
	StudentRepository studentRepository;

	@Before
	@After
	public void banner() {
		System.out.println(
				"\n\n-------------------------------------------------" + "-------------------------------------\n");
	}

	@Test
	public void simpleStudentCrudExample() {

		final boolean fullTime = true;
		this.studentRepository.save(new Student(new Person("jane", "doe"), fullTime, 20));
		this.studentRepository.save(new Student(new Person("john", "doe"), fullTime, 22));
		this.studentRepository.save(new Student(new Person("mike", "smith"), fullTime, 18));
		this.studentRepository.save(new Student(new Person("ally", "kim"), !fullTime, 19));

		System.out.println("*************After Creating*************");
		this.studentRepository.findAll().forEach(System.out::println);

		this.studentRepository.deleteAll();

		System.out.println("*************After Deleting*************");

		this.studentRepository.findAll().forEach(System.out::println);

	}
}
