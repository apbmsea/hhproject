package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// HomeHandler — базовый маршрут для проверки сервиса
func HomeHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome to the Resume Service!",
	})
}
