package cn.tedu.entity;

import java.io.Serializable;

/**
 * 员工信息
 * 
 * @author JAVA
 *
 */
public class Staff implements Serializable {
	private static final long serialVersionUID = 1L;
	/** id 编号 int */
	private Integer id;
	/** name 姓名 var */
	private String name;
	/** passwordd 密码 var */
	private String password;

	public Staff(Integer id, String name, String password) {
		this.id = id;
		this.name = name;
		this.password = password;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Staff other = (Staff) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Staff [id=" + id + ", name=" + name + ", password=" + password + "]";
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
