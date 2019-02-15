package com.mtv.sb.service;

import java.util.LinkedList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.mtv.sb.domain.User;


@Service
public class ManageUsers {

	private static final Logger logger = LogManager.getLogger(ManageUsers.class);
	
	
	final static List<User> users = new LinkedList<>();
	
	final static String[] names = {"James", "Michael", "Robert", "Maria", "David", "Maria", "Mary", "John", "William", "Charles", "Joseph"};
	
	
	static {
		logger.info("***************************************");
		logger.info("Creating Dummy Users");
		for (int i=0;i<10;i++) {
			long uid= i+1;
			String firstName = names[new Integer((int) (Math.random() * names.length))];
			String lastName = names[new Integer((int) (Math.random() * names.length))];
			String email = firstName+"."+lastName+"@gmail.com";
			users.add(new User(uid, firstName, lastName, email));
		}
		
		for (User user:users) {
			logger.info(user.toString());
		}
		
		logger.info("***************************************");
	}
	
	
	public List<User> listUsers(){
		return null;
	}
	
	
	public long createUser(User user){
		return 0;
	}
}
