package com.devsuperior.dscatalog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("SELECT DISTINCT p FROM Product p INNER JOIN p.categories cats WHERE "
			+ "(COALESCE(:categories) IS NULL OR cats IN :categories) AND "
			+ "(LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')))")
	Page<Product> find(List<Category> categories, String name, Pageable pageRequest);
	
	@Query("SELECT p FROM Product p JOIN FETCH p.categories WHERE p IN :products")
	List<Product> findProductsWithCategories(List<Product> products);

}
