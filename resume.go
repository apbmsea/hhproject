package proj

type ResumeList struct {
	Id          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type UserList struct {
	Id       int `json:"id"`
	UserId   int `json:"userId"`
	ResumeId int `json:"resumeId"`
}

type ResumeItem struct {
	Id    int    `json:"id"`
	Title string `json:"title"`
	Desc  string `json:"description"`
}

type ListItem struct {
	Id     int
	ListId int
	ItemId int
}
