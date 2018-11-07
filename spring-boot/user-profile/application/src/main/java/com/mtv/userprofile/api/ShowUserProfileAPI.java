package com.mtv.userprofile.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mtv.user.Profile;
import com.mtv.userprofile.service.UserProfileService;

@RestController
@RequestMapping("/api")
public class ShowUserProfileAPI {
	@Autowired
	UserProfileService service;

	@GetMapping("/users")
	public List<Profile> getUserProfile() {
		return this.service.getUserProfile();
	}
}
