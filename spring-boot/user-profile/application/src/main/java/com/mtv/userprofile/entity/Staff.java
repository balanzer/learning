package com.mtv.userprofile.entity;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Staff_member")
public class Staff {

	@Id
	@GeneratedValue
	private Integer id;

	@Embedded
	private Person member;

	protected Staff() {
	}

	public Staff(Person member) {
		this.member = member;
	}

	public Person getMember() {
		return this.member;
	}

	@Override
	public String toString() {
		return "Staff{" + "id=" + this.id + ", member=" + this.member + '}';
	}
}
