package dev.jsaka.refrigeratorapp.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity // ① これはJPAのエンティティクラスです、という宣言
@Table(name = "foods") // ② 対応するテーブル名を指定
public class Food {

    @Id // ③ このフィールドが主キーであることを示す
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ④ IDが自動採番されることを示す
    private Long id;// int型だとnullではなく0になるのでラッパークラスのLongでnull参照できるようにしている
    // 一度intで作成しリソースの枯渇が発生するとその後の改修が困難になるため、大規模ECサイト等で主キーを設定する場合は、Long型がベストプラクティス
    private String name;

    private LocalDate expirationDate;

    private Integer quantity;

    // ⑤ JPAが必要とするため、引数なしのコンストラクタを必ず作る
    public Food() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}