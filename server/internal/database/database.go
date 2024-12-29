package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
	"proj-kct-resume/internal/models"
)

// DB — глобальная переменная для доступа к базе данных
var DB *gorm.DB

// InitDatabase — инициализация базы данных
func InitDatabase() {
	var err error
	DB, err = gorm.Open(sqlite.Open("proj-kct-resume.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Ошибка подключения к базе данных: %v", err)
	}

	// Миграция схемы
	err = DB.AutoMigrate(&models.Resume{}, &models.Tag{})
	if err != nil {
		log.Fatalf("Ошибка миграции базы данных: %v", err)
	}

	log.Println("База данных успешно инициализирована!")
}
