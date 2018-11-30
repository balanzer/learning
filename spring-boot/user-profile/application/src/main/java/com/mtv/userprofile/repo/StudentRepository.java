package com.mtv.userprofile.repo;

import org.springframework.data.repository.CrudRepository;

import com.mtv.userprofile.entity.Student;

public interface StudentRepository extends CrudRepository<Student, Integer> {

}
