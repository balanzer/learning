package com.mtv.userprofile.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtv.userprofile.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

}
