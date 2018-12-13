package com.mtv.userprofile.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.mtv.userprofile.entity.Course;
import com.mtv.userprofile.view.CourseView;

public interface CourseRepository extends CrudRepository<Course, Integer> {
	@Query("Select c from Course c where c.department.chair.member.lastName=:chair")
	List<Course> findByChairLastName(@Param("chair") String chairLastName);

	List<Course> findByCredits(@Param("credits") int credits);

	Page<Course> findByCredits(@Param("credits") int credits, Pageable pageable);

	List<Course> findByDepartmentChairMemberLastName(String chair);

	Course findByName(String name);

	@Query("Select c from Course c join c.prerequisites p where p.id = ?1")
	List<Course> findCourseByPrerequisite(int id);

	@Query("Select new com.mtv.userprofile.view.CourseView"
			+ "(c.name, c.instructor.member.lastName, c.department.name) from Course c where c.id=?1")
	CourseView getCourseView(int courseId);

}
