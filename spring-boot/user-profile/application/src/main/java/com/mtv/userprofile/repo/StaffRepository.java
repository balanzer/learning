package com.mtv.userprofile.repo;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.mtv.userprofile.entity.Staff;

public interface StaffRepository extends PagingAndSortingRepository<Staff, Integer> {

}
