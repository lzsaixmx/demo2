package cn.tedu.entity;

/**   
 * @包名 cn.tedu.entity 
 * @作者名 XM Yang   
 * @时间 2019年11月28日 下午5:24:18 
 */
public class Ctar {
	private int id;
	private String userName;
	private String ctarText;
	private long ctarDate;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getCtarText() {
		return ctarText;
	}
	public void setCtarText(String ctarText) {
		this.ctarText = ctarText;
	}
	public long getCtarDate() {
		return ctarDate;
	}
	public void setCtarDate(long ctarDate) {
		this.ctarDate = ctarDate;
	}
	public Ctar(int id, String userName, String ctarText, long ctarDate) {
		super();
		this.id = id;
		this.userName = userName;
		this.ctarText = ctarText;
		this.ctarDate = ctarDate;
	}
	
}
