package ru.romanov.mydailytasks.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.romanov.mydailytasks.persistence.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
