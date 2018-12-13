package com.mtv.userprofile.repo;

import org.springframework.data.repository.CrudRepository;

import com.mtv.userprofile.entity.Course;

public interface CourseRepository extends CrudRepository<Course, Integer> {

}
