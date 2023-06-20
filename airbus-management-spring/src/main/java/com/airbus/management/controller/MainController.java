package com.airbus.management.controller;

import java.util.List;

import com.airbus.management.exception.CategoryAlreadyExistsException;
import com.airbus.management.model.Category;
import com.airbus.management.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.airbus.management.exception.ProductAlreadyExistsException;
import com.airbus.management.model.Product;
import com.airbus.management.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/airbusManagement")
public class MainController {
	
	@Autowired
	ProductService productService;

	@Autowired
	CategoryService categoryService;

	ObjectMapper objectMapper = new ObjectMapper().configure(SerializationFeature.INDENT_OUTPUT, true);


	/*
	Author: tryhn.nx
    Created on: 06/16/2023
    Detail: Product
	*/

	@GetMapping("/getAllProducts")
	public Object getAllProducts(){
		List<Product> result= productService.getAllProducts();
		return result;
	}
	
	@GetMapping("/getProductsByCategory/{categoryId}")
	public Object getProductsByCategory(@PathVariable("categoryId") String categoryId) throws JsonProcessingException{

		List<Product> result= productService.getProductsByCategory(categoryId);
		String listToJson = objectMapper.writeValueAsString(result);
		return listToJson;
	}

	@PostMapping("/addProduct")
	public boolean addProduct(@RequestBody Product producDetails) throws JsonProcessingException, ProductAlreadyExistsException{
		
		boolean response = productService.addProduct(producDetails);
		return response;
	}
	
	@PostMapping("updateProduct/{productId}")  
    public boolean updateProduct(@RequestBody Product productDetails,@PathVariable("productId") String productId) {  
        boolean result= productService.updateProduct(productDetails, productId);  
        return result;  
    }  
	
	@DeleteMapping("deleteProduct/{productId}")  
    public boolean deleteProduct(@PathVariable("productId") String productId) {  
        boolean result= productService.deleteProduct(productId);  
        return result;  
    }


	/*
	Author: tryhn.nx
    Created on: 06/16/2023
    Detail: Category
	*/

	@GetMapping("/getAllCategories")
	public Object getAllCategories(){
		List<Category> result= categoryService.getAllCategories();
		return result;
	}

	@DeleteMapping("deleteCategory/{categoryId}")
	public boolean deleteCategory(@PathVariable("categoryId") String categoryId) {
		boolean result= categoryService.deleteCategory(categoryId);
		return result;
	}

	@PostMapping("/addCategory")
	public boolean addCategory(@RequestBody Category categoryDetails) throws JsonProcessingException, CategoryAlreadyExistsException {

		boolean response = categoryService.addCategory(categoryDetails);
		return response;
	}

	@PostMapping("updateCategory/{categoryId}")
	public boolean updateCategory(@RequestBody Category categoryDetails,@PathVariable("categoryId") String categoryId) {
		boolean result= categoryService.updateCategory(categoryDetails, categoryId);
		return result;
	}
}
