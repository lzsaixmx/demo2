package cn.tedu.entity;

import java.io.Serializable;
import java.sql.Date;

/**
 * 论坛bean
 * @author JAVA
 *
 */
public class Forum implements Serializable{
	private static final long serialVersionUID = 1L;
	
	/**编号      id          int*/
	private Integer id;
	/**用户名   name        var*/
	private String userId;
	/**标题     title       var*/
	private String title;
	/**内容     content     text*/
	private String content;
	/**创建日期     created_time    date*/
	private Date createdTime;
	/**修改日期     modified_time   date*/
	private Date modifiedTime;
	
	public Forum(Integer id, String name, String userId, String title, String content, Date createdTime,
			Date modifiedTime) {
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.content = content;
		this.createdTime = createdTime;
		this.modifiedTime = modifiedTime;
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
		Forum other = (Forum) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Forum [id=" + id + ", userId=" + userId + ", title=" + title + ", content=" + content
				+ ", createdTime=" + createdTime + ", modifiedTime=" + modifiedTime + "]";
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getCreatedTime() {
		return createdTime;
	}
	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}
	public Date getModifiedTime() {
		return modifiedTime;
	}
	public void setModifiedTime(Date modifiedTime) {
		this.modifiedTime = modifiedTime;
	}

}
