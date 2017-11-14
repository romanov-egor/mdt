package ru.romanov.mydailytasks.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.romanov.mydailytasks.persistence.entity.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByCategoryId(Long categoryId);
}
