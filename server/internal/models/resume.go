package models

import "gorm.io/gorm"

// Resume — модель для резюме
type Resume struct {
	gorm.Model
	Name        string `json:"name"`
	Email       string `json:"email"`
	Skills      string `json:"skills"`
	Description string `json:"description"`
	Tags        []Tag  `json:"tags" gorm:"many2many:resume_tags;"`
}
