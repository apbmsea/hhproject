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

func NewReposirory(db *sqlx.BD) *Reposirory {
	return &Reposirory{}
}
