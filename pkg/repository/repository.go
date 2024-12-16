package repository

type Authorization interface {
}

type ResumeList interface {
}

type ResumeItem struct {
}

type Reposirory struct {
	Authorization
	ResumeList
	ResumeItem
}

func NewReposirory() *Reposirory {
	return &Reposirory{}
}
