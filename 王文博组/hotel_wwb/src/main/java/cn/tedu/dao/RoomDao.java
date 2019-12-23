package cn.tedu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import cn.tedu.entity.Room;
import cn.tedu.utils.DBUtils;

/**   
 * @包名 cn.tedu.dao 
 * @作者名 XM Yang   
 * @时间 2019年11月25日 下午8:36:50 
 */
public class RoomDao {

	public void add(Room room) {
		//获取连接
		try (Connection conn = DBUtils.getConn();) {
			String sql = "insert into room values(null,?,?,?,?)";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, room.getCheckDate());
			ps.setString(2, room.getLeaveDate());
			ps.setString(3, room.getName());
			ps.setString(4, room.getPhone());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
}
