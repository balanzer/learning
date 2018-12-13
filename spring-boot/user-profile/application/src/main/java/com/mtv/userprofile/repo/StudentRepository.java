package com.mtv.userprofile.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.mtv.userprofile.entity.Person;
import com.mtv.userprofile.entity.Student;

public interface StudentRepository extends CrudRepository<Student, Integer> {

	List<Student> findByAge(Integer age);

	List<Student> findByAgeGreaterThan(int minimumAge);

	List<Student> findByAgeLessThan(int maximumAge);

	Student findByAttendee(Person person);

	// Query Methods with Clauses and Exrpessions
	Student findByAttendeeFirstNameAndAttendeeLastName(String firstName, String lastName);

	List<Student> findByAttendeeLastName(String lastName);

	List<Student> findByAttendeeLastNameIgnoreCase(String lastName);

	List<Student> findByAttendeeLastNameLike(String likeString);

	List<Student> findByFullTime(boolean fullTime);

	Student findFirstByOrderByAttendeeLastNameAsc();

	List<Student> findTop3ByOrderByAgeDesc();

	Student findTopByOrderByAgeDesc();
}
