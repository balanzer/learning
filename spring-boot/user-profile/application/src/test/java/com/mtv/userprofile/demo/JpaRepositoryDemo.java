package com.mtv.userprofile.demo;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mtv.userprofile.repo.DepartmentRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JpaRepositoryDemo {

	@Autowired
	private DepartmentRepository departmentRepository;

	@Before
	@After
	public void banner() {
		System.out.println(
				"\n\n-------------------------------------------------" + "-------------------------------------\n");
	}

	@Test
	public void runJpaRepositoryMethods() {

		/*
		 * this.departmentRepository.save(new Department("Humanities"));
		 * this.departmentRepository.flush();
		 * 
		 * this.departmentRepository.saveAndFlush(new Department("Fine Arts"));
		 * 
		 * this.departmentRepository.save(new Department("Social Science"));
		 */

		System.out.println("\n*************3 Departments*************");
		this.departmentRepository.findAll().forEach(System.out::println);

		this.departmentRepository.deleteInBatch(this.departmentRepository.findAll().subList(0, 1));

		System.out.println("\n*************1 Less Departments*************");
		this.departmentRepository.findAll().forEach(System.out::println);
		this.departmentRepository.deleteAllInBatch();
		System.out.println("\n*************Zero Departments*************");
		this.departmentRepository.findAll().forEach(System.out::println);

	}

}
