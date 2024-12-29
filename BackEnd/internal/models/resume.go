package models

import "github.com/lib/pq"

type CV struct {
	CVID         string         `json:"CVID" gorm:"column:cvid;type:varchar(36);primaryKey"`
	Title        string         `json:"Title" gorm:"not null"`
	Name         string         `json:"Name" gorm:"not null"`
	LastName     string         `json:"LastName" gorm:"column:last_name;not null"`
	Speciality   string         `json:"Speciality"`
	Projects     pq.StringArray `json:"Projects" gorm:"type:text[];default:'{}'"`
	Skills       pq.StringArray `json:"Skills" gorm:"type:text[];default:'{}'"`
	PhoneNumbers pq.StringArray `json:"PhoneNumbers" gorm:"column:phone_numbers;type:text[];default:'{}'"`
	Links        pq.StringArray `json:"Links" gorm:"type:text[];default:'{}'"`
	Description  string         `json:"Description" gorm:"column:description"`

}
