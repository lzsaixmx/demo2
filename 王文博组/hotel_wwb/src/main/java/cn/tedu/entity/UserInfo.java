package cn.tedu.entity;

/**   
 * @包名 cn.tedu.entity 
 * @作者名 XM Yang   
 * @时间 2019年11月23日 下午3:33:49 
 */
public class UserInfo {
	private String userName;
	private String password;
	private String name;
	private String card;
	private String birth;
	private String size;
	private String phone;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCard() {
		return card;
	}
	public void setCard(String card) {
		this.card = card;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	@Override
	public String toString() {
		return "UserInfo [id="+ ", userName=" + userName + ", password=" + password + ", name=" + name + ", card="
				+ card + ", birth=" + birth + ", size=" + size + ", phone=" + phone + "]";
	}
	public UserInfo(String userName, String password, String name, String card, String birth, String size,
			String phone) {
		super();
		this.userName = userName;
		this.password = password;
		this.name = name;
		this.card = card;
		this.birth = birth;
		this.size = size;
		this.phone = phone;
	}
	public UserInfo(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}
	
}
