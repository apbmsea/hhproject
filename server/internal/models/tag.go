package models

import "gorm.io/gorm"

// Tag — модель для тегов резюме
type Tag struct {
	gorm.Model
	Name     string `json:"name"`
	ResumeID uint   `json:"resume_id"` // Связь с резюме
}
