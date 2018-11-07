# Spring Boot

Application URL : http://localhost/

Application API : http://localhost/apis   or http://localhost/apis/greeting

user profile : http://localhost/api/users   or http://localhost/users 

activate profile with JVM option at run time, for example -Dspring.profiles.active=local

default profile port : 80

local profile port : 8080 = VM argument - -Dspring.profiles.active=local - http://localhost:8080/api/greeting

dev profile port : 8090 = VM argument - -Dspring.profiles.active=dev   - http://localhost:8090/api/greeting



#generate simple java maven project
mvn archetype:generate -DgroupId=com.mtv -DartifactId=domain -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false