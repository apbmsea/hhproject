package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"proj-kct-resume/internal/database"
	"proj-kct-resume/internal/models"
)

// CreateResume — создание нового резюме
func CreateResume(c *gin.Context) {
	var resume models.Resume
	if err := c.ShouldBindJSON(&resume); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&resume).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось создать резюме"})
		return
	}

	c.JSON(http.StatusCreated, resume)
}

// GetResumes — получение списка всех резюме
func GetResumes(c *gin.Context) {
	var resumes []models.Resume
	if err := database.DB.Find(&resumes).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось получить список резюме"})
		return
	}

	c.JSON(http.StatusOK, resumes)
}

// GetResumeByID — получение резюме по ID
func GetResumeByID(c *gin.Context) {
	id := c.Param("id")
	var resume models.Resume

	if err := database.DB.First(&resume, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Резюме не найдено"})
		return
	}

	c.JSON(http.StatusOK, resume)
}

// UpdateResume — обновление резюме
func UpdateResume(c *gin.Context) {
	id := c.Param("id")
	var resume models.Resume

	if err := database.DB.First(&resume, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Резюме не найдено"})
		return
	}

	var updateData models.Resume
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Model(&resume).Updates(updateData)
	c.JSON(http.StatusOK, resume)
}

// DeleteResume — удаление резюме
func DeleteResume(c *gin.Context) {
	id := c.Param("id")
	if err := database.DB.Delete(&models.Resume{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось удалить резюме"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Резюме удалено"})
}

// FilterResumesByTag — фильтрация резюме по тегам
func FilterResumesByTag(c *gin.Context) {
	tag := c.DefaultQuery("tag", "")
	if tag == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Не указан тег для фильтрации"})
		return
	}

	var resumes []models.Resume
	if err := database.DB.Joins("JOIN tags ON tags.resume_id = resumes.id").
		Where("tags.name = ?", tag).
		Find(&resumes).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось получить резюме по тегу"})
		return
	}

	c.JSON(http.StatusOK, resumes)
}

// AddTagToResume — добавление тега к резюме
func AddTagToResume(c *gin.Context) {
	resumeID := c.Param("id")
	var tag models.Tag
	if err := c.ShouldBindJSON(&tag); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var resume models.Resume
	if err := database.DB.First(&resume, resumeID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Резюме не найдено"})
		return
	}

	tag.ResumeID = resume.ID

	if err := database.DB.Create(&tag).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Не удалось добавить тег"})
		return
	}

	c.JSON(http.StatusOK, tag)
}
