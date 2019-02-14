package com.mtv.sb.mvcapp.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.mtv.sb.domain.Profile;

@RunWith(SpringRunner.class)
@WebMvcTest(NewUserController.class)
public class NewUserControllerTest {

	private static final Logger logger = LogManager.getLogger(NewUserController.class);

	@Autowired
	private MockMvc mockMvc;

	@InjectMocks
	private NewUserController requestController;

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testGetMapping() throws Exception {
		// simulate getting a new form for the user to fill in (GET Request)
		this.mockMvc.perform(get("/newuser")).andExpect(status().is(200)).andReturn();
	}

	@Test
	public void testPostMapping() throws Exception {

		final Profile newProfile = new Profile();

		// simulate the form submit (POST)
		this.mockMvc.perform(post("/newuser", newProfile)).andExpect(status().isOk()).andReturn();

	}

}
