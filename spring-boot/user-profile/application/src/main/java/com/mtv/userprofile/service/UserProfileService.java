package com.mtv.userprofile.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.stereotype.Service;

import com.mtv.user.Profile;

@Service
public class UserProfileService {

	final String[] nameSamples = { "Smith", "Brown", "Miller", "Johnson", "Jones", "Davis", "Williams", "Wilson",
			"Clark", "Taylor", "Mary", "Sarah", "Elizabeth", "Martha", "Margaret", "Nancy", "Ann", "Jane", "Eliza",
			"Catherine", "Smith", "Brown", "Davis", "Jones", "Johnson", "Clark", "Williams", "Miller", "Wilson", "Mary",
			"Elizabeth", "Sarah", "Nancy", "Ann", "Catherine", "Margaret", "Jane", "Susan", "Hannah", "John", "William",
			"James", "Thomas", "George", "Joseph", "Samuel", "Henry", "David", "Daniel", "James", "David",
			"Christopher", "George", "Ronald", "John", "Richard", "Daniel", "Kenneth", "Anthony", "Robert", "Charles",
			"PaulS", "Steven", "Kevin", "Michael", "Joseph", "Mark", "Edward", "Jason", "William", "Thomas", "Donald",
			"Brian", "Jeff" };

	private Profile generateDummyProfile() {

		final Profile profile = new Profile();
		profile.setFirstName(this.nameSamples[this.getRandomNumber(this.nameSamples.length)]);
		profile.setLastName(this.nameSamples[this.getRandomNumber(this.nameSamples.length)]);
		profile.setEmail(profile.getFirstName() + "." + profile.getLastName() + "@gmail.com");

		return profile;
	}

	private int getRandomNumber(int max) {
		return Math.abs(ThreadLocalRandom.current().nextInt() % max);
	}

	public List<Profile> getUserProfile() {

		final List<Profile> userProfiles = new ArrayList<>();

		for (Long i = 10001l; i <= 10250; i++) {
			final Profile user = this.generateDummyProfile();
			user.setId(i);
			userProfiles.add(user);
		}

		return userProfiles;
	}

}
