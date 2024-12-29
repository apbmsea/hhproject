package main

import (
	"second/internal/db"
	"second/internal/webServer/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	DB := db.InitDB()
	handler := &handlers.Handler{
		DB: DB,
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"*"},
		AllowCredentials: true,
	}))

	// Роуты для резюме
	r.POST("/resumes", handler.CreateCVHandler)
	r.GET("/resumes", handler.GetAllCVsHandler)
	r.GET("/resumes/:cvid", handler.GetCVByIDHandler)
	r.PATCH("/resumes/:cvid", handler.UpdateCVHandler)
	r.DELETE("/resumes/:cvid", handler.DeleteCVHandler)

	// Запуск сервера
	r.Run(":8080")
}
