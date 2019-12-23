package cn.tedu.entity;

public class Check {
	private  int id ; //客房编号
	private  int rend_out; // 是否入住（未入住0，入住 1）
	private  String name; //客户名
	@Override
	public String toString() {
		return "Check [id=" + id + ", rend_out=" + rend_out + ", name=" + name + "]";
	}
	public Check(int id, int rend_out, String name) {
		super();
		this.id = id;
		this.rend_out = rend_out;
		this.name = name;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getRend_out() {
		return rend_out;
	}
	public void setRend_out(int rend_out) {
		this.rend_out = rend_out;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	
	
	
	
	
}
