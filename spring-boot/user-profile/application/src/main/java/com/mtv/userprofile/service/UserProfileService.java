package com.mtv.userprofile.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.mtv.user.Profile;

@Service
public class UserProfileService {

	public List<Profile> getUserProfile() {
		final Random numGen = new Random();

		final List<Profile> userProfiles = new ArrayList<>();

		final String[] firstName = { "Mark", "Alan", "Henry", "George", "James", "Michael", "Robert" };

		final String[] lastName = { "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller" };

		for (Long i = 10001l; i <= 10020; i++) {
			final int rand = numGen.nextInt(firstName.length);
			userProfiles.add(new Profile(i, firstName[rand], lastName[rand],
					firstName[rand] + "." + lastName[rand] + "@gmail.com"));
		}

		return userProfiles;
	}
}
