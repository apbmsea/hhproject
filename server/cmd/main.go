package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"proj-kct-resume/internal/database"
	"proj-kct-resume/internal/handlers"
)

func main() {
	// Инициализация базы данных
	database.InitDatabase()

	// Инициализация маршрутизатора
	router := gin.Default()

	// Роуты для резюме
	resumeGroup := router.Group("/resumes")
	{
		resumeGroup.POST("/", handlers.CreateResume)
		resumeGroup.GET("/", handlers.GetResumes)
		resumeGroup.GET("/:id", handlers.GetResumeByID)
		resumeGroup.PUT("/:id", handlers.UpdateResume)
		resumeGroup.DELETE("/:id", handlers.DeleteResume)
		resumeGroup.POST("/:id/tags", handlers.AddTagToResume)
	}

	// Новый маршрут для фильтрации по тегам
	router.GET("/resumes/filter", handlers.FilterResumesByTag)

	// Запуск сервера
	log.Println("Сервер запущен на порту :8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Ошибка запуска сервера: %v", err)
	}
}
