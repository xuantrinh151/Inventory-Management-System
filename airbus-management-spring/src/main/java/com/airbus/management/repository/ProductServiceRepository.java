package com.airbus.management.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.airbus.management.dto.ProductSdo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.airbus.management.model.Product;

@Repository
public class ProductServiceRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	public List<ProductSdo> getAllProducts() {
		
		
		List<ProductSdo> productList=new ArrayList<>();
		
		 productList=jdbcTemplate.query("SELECT p.productId,p.productName,p.productDescription,p.units,c.category_name from product p \n" +
				 "INNER JOIN category c \n" +
				 "ON p.category = c.category_id", new RowMapper<ProductSdo>(){
			   
			@Override
			public ProductSdo mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub

				ProductSdo product=new ProductSdo();
				product.setProductId(rs.getString("productId"));
				product.setProductName(rs.getString("productName"));
				product.setProductDescription(rs.getString("productDescription"));
				product.setProductCategory(rs.getString("category_name"));
				product.setUnits(rs.getInt("units"));
				
				
				return product;
			}  
		    }); 
		 
		return productList;
		}
	
	public List<ProductSdo> getProductsByCategory(String categoryName) {
		
		List<ProductSdo> productList=new ArrayList<>();
		
		 productList=jdbcTemplate.query("SELECT p.productId,p.productName,p.productDescription,p.units,c.category_name from product p \n" +
				 "INNER JOIN category c \n" +
				 "ON p.category = c.category_id" +
				 " where category='"+categoryName+"'", new RowMapper<ProductSdo>(){
			   
			@Override
			public ProductSdo mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub

				ProductSdo product=new ProductSdo();
				product.setProductId(rs.getString("productId"));
				product.setProductName(rs.getString("productName"));
				product.setProductDescription(rs.getString("productDescription"));
				product.setProductCategory(rs.getString("category_name"));
				product.setUnits(rs.getInt("units"));
				
				
				return product;
			}  
		    }); 
		return productList;
		}
	
	
	public void addProduct(Product productDetails) {
		
		 String INSERT_STATEMENT = "INSERT INTO Product(productId,productName,productDescription,category, units) VALUES (?,?,?,?,?)" ;

			jdbcTemplate.batchUpdate(INSERT_STATEMENT, new BatchPreparedStatementSetter() {
				
				@Override
				public void setValues(PreparedStatement ps, int i) throws SQLException {
					// TODO Auto-generated method stub
					ps.setString(1,productDetails.getProductId());
					ps.setString(2, productDetails.getProductName());
					ps.setString(3, productDetails.getProductDescription());
					ps.setString(4, productDetails.getProductCategory());
					ps.setInt(5, productDetails.getUnits());
				}
				
				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return 1;
				}
			});
	}
	
	public int updateProduct(Product productDetails, String productId) {
		
		String query="UPDATE Product set productName='"+productDetails.getProductName()+"',productDescription='"+productDetails.getProductDescription()+"',category='"+productDetails.getProductCategory()+"',units='"+productDetails.getUnits()+"' where productId='"+productId+"' ";
			    return jdbcTemplate.update(query);  
	}
	
	public int deleteProduct(String productId){  
	    String query="delete from product where productId='"+productId+"' ";  
	    return jdbcTemplate.update(query);  
	}  
	
	public String fetchPasswordForUserName(String userName) {
		
		String result="";
		
		String query="SELECT password from User where username='"+ userName+"'";
		
		result= jdbcTemplate.queryForObject(query,String.class);
		
		return result;
	}
	
}
