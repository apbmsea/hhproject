package servise

import "github.com/mmasstug/proj-kct-resume/pkg/repository"

type Authorization interface {
}

type ResumeList interface {
}

type ResumeItem struct {
}

type Service struct {
	Authorization
	ResumeList
	ResumeItem
}

func NewService(repos *repository.Reposirory) *Service {
	return &Service{}
}
