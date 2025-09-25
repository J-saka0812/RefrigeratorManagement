package dev.jsaka.refrigeratorapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.jsaka.refrigeratorapp.entity.Food;

// JpaRepositoryには、基本的なCRUD操作（save, findById, findAll, deleteById など）を行うためのメソッドがすべて定義されている
//ジェネリクス<Food, Long>: 特定の型を割り当てて、型専用のクラスを生成する機能
public interface FoodRepository extends JpaRepository<Food, Long> {
}
