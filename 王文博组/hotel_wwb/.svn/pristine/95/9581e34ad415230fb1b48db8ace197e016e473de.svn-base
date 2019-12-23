package cn.tedu.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import cn.tedu.entity.Check;
import cn.tedu.utils.DBUtils;

public class checkoutDao {

	public void delete(Check check) {
		//获取连接
		try(Connection conn=DBUtils.getConn();) 
		{
			String sql = "delete from tt where name =? and id = ? ";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, check.getName());
			ps.setInt(2, check.getId());
			ps.executeUpdate();
			
		} catch (Exception e) {

			e.printStackTrace();
		}


	}

}
