package com.mtv.userprofile.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.mtv.userprofile.entity.Student;

public interface StudentRepository extends CrudRepository<Student, Integer> {

	List<Student> findByAge(Integer age);

	List<Student> findByAttendeeLastName(String lastName);

	List<Student> findByFullTime(boolean fullTime);

}
