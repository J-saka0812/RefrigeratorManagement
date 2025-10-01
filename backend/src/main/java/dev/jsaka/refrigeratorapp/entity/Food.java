package dev.jsaka.refrigeratorapp.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity // ① これはJPAのエンティティクラスです、という宣言
@Table(name = "foods") // ② 対応するテーブル名を指定
public class Food {

    @Id // このフィールドが主キーであることを示す
    @GeneratedValue(strategy = GenerationType.IDENTITY) // IDが自動採番されることを示す
    private Long id;// int型だとnullではなく0になるのでラッパークラスのLongでnull参照できるようにしている
    // 一度intで作成しリソースの枯渇が発生するとその後の改修が困難になるため、大規模ECサイト等で主キーを設定する場合は、Long型がベストプラクティス
    private String name;
    private LocalDate expirationDate;
    private Double quantity;
    private String icon;
    private String unit;
    private String category;
    @Column(nullable = false) // DB側でNOT NULL制約を付ける
    private Long userId;

    public Long getUserId() {
        return userId;
    }

    public Long setUserId(Long userId) {
        return this.userId = userId;
    }

    // JPAが必要とするため、引数なしのコンストラクタを必ず作る
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

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}