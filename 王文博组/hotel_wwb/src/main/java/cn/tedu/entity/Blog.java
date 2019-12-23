package cn.tedu.entity;

import java.sql.Date;
import java.text.SimpleDateFormat;

/**   
 * @包名 cn.tedu.entity 
 * @作者名 XM Yang   
 * @时间 2019年11月27日 下午7:35:05 
 */
public class Blog {
	private int id;
	private String roomName;
	private String title;
	private long created;
	private String userName;
	private String imgName;
	
	private String createdStr;
	
	public String getCreatedStr() {
		SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		
		Date date = new Date(this.created);
		
		return f.format(date);
	}
	public void setCreatedStr(String createdStr) {
		this.createdStr = createdStr;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public long getCreated() {
		return created;
	}
	public void setCreated(long created) {
		this.created = created;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getImgName() {
		return imgName;
	}
	public void setImgName(String imgName) {
		this.imgName = imgName;
	}
	
	public Blog(int id, String roomName, String title, long created, String userName, String imgName) {
		super();
		this.id = id;
		this.roomName = roomName;
		this.title = title;
		this.created = created;
		this.userName = userName;
		this.imgName = imgName;
	}
	@Override
	public String toString() {
		return "Blog [id=" + id + ", roomName=" + roomName + ", title=" + title + ", created=" + created + ", userName="
				+ userName + ", imgName=" + imgName + ", createdStr=" + createdStr + "]";
	}
	
	
}
