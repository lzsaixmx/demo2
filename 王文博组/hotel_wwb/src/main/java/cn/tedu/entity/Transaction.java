package cn.tedu.entity;

import java.io.Serializable;
import java.sql.Date;

public class Transaction implements Serializable{
	private static final long serialVersionUID = 1L;
	
	/** id 编号 int */
	private Integer id;
	/** user_id 客户id var */
	private String userId;
	/** room_id 房间号 int */
	private Integer roomId;
	/** room_type 客房类型 var */
	private String roomtype;
	/** in_time 入住时间 date */
	private Date inTime;
	/** out_time 退房时间 date */
	private Date outTime;
	/** total_money 总金额 double */
	private Double totalMoney;
	/** settle_staff 工作人员 int */
	private Integer settleStaff;

	public Transaction(Integer id, String userId, Integer roomId, String roomtype, Date inTime, Date outTime,
			double totalMoney, Integer settleStaff) {
		this.id = id;
		this.userId = userId;
		this.roomId = roomId;
		this.roomtype = roomtype;
		this.inTime = inTime;
		this.outTime = outTime;
		this.totalMoney = totalMoney;
		this.settleStaff = settleStaff;
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
		Transaction other = (Transaction) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Transaction [id=" + id + ", userId=" + userId + ", roomId=" + roomId + ", roomtype=" + roomtype
				+ ", inTime=" + inTime + ", outTime=" + outTime + ", totalMoney=" + totalMoney + ", settleStaff="
				+ settleStaff + "]";
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

	public Integer getRoomId() {
		return roomId;
	}

	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
	}

	public String getRoomtype() {
		return roomtype;
	}

	public void setRoomtype(String roomtype) {
		this.roomtype = roomtype;
	}

	public Date getInTime() {
		return inTime;
	}

	public void setInTime(Date inTime) {
		this.inTime = inTime;
	}

	public Date getOutTime() {
		return outTime;
	}

	public void setOutTime(Date outTime) {
		this.outTime = outTime;
	}

	public double getTotalMoney() {
		return totalMoney;
	}

	public void setTotalMoney(double totalMoney) {
		this.totalMoney = totalMoney;
	}

	public Integer getSettleStaff() {
		return settleStaff;
	}

	public void setSettleStaff(Integer settleStaff) {
		this.settleStaff = settleStaff;
	}

}
