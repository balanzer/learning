/**
 *
 */
package com.mtv.userprofile.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author VarathM
 *
 */

@RestController
@RequestMapping("/apis")
public class ApiController {

	@GetMapping
	public String defaultGreeting() {
		return "Hello world from api - default mapping";
	}

	@GetMapping("/greeting")
	public String sayGreeting() {
		return "Hello world from api - greeting mapping";
	}

}
