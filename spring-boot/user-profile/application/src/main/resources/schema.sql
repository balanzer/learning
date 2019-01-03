CREATE TABLE USER_PROFILE(
  PERSON_ID BIGINT AUTO_INCREMENT PRIMARY KEY,
  FIRST_NAME VARCHAR(64),
  LAST_NAME VARCHAR(64),
  EMAIL_ADDRESS VARCHAR(64),
  ADDRESS VARCHAR(64),
  ADDRESS2 VARCHAR(64),
  CITY VARCHAR(32),
  COUNTRY VARCHAR(32),
  STATE VARCHAR(12),
  ZIPCODE VARCHAR(12),
  PHONE_NUMBER VARCHAR(24)
);