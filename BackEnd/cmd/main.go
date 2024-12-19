package main

import (
	"second/internal/db"
	"second/internal/webServer/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	DB := db.InitDB()
	// // Пример: Создание пользователя
	// user := models.User{
	// 	UUID:        "i23s0119",
	// 	Password:    "password",
	// 	Course:      5,
	// 	LFM:         "John Doe",
	// 	IsAdmin:     false,
	// 	ContactData: "email@example.com",
	// 	Status:      "active",
	// }

	// err := userHandler.CreateUser(&user, DB)
	// if err != nil {
	// 	log.Fatalf("Ошибка создания пользователя: %v", err)
	// }

	// // Пример: Создание резюме для пользователя
	// cv := &models.CV{
	// 	UserID:  uuid.New().String(),
	// 	Title:   "Golang Developer",
	// 	Spec:    "Backend Development",
	// 	Tags:    pq.StringArray{"Golang", "Microservices", "REST"}, // Передаем массив строк
	// 	AboutMe: "Experienced Go developer.",
	// }

	// err = resumeHandler.CreateCV(cv, DB)
	// if err != nil {
	// 	log.Println("Ошибка создания резюме:", err)
	// } else {
	// 	log.Println("Резюме успешно создано!")
	// }

	// // Пример: Получение пользователя с его резюме
	// foundUser, err := userHandler.GetUserByUUID(user.UUID, DB)
	// if err != nil {
	// 	log.Fatalf("Ошибка получения пользователя: %v", err)
	// }
	// log.Printf("Пользователь: %+v", foundUser)

	// // Пример: Обновление статуса пользователя
	// err = userHandler.UpdateUser(user.UUID, map[string]interface{}{"Status": "inactive"}, DB)
	// if err != nil {
	// 	log.Fatalf("Ошибка обновления пользователя: %v", err)
	// }

	// // Пример: Удаление резюме
	// err = resumeHandler.DeleteCV(cv.CVID, DB)
	// if err != nil {
	// 	log.Fatalf("Ошибка удаления резюме: %v", err)
	// }

	// // Пример: Удаление пользователя
	// err = userHandler.DeleteUser(user.UUID, DB)
	// if err != nil {
	// 	log.Fatalf("Ошибка удаления пользователя: %v", err)
	// }

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

	// Роуты для пользователей
	r.POST("/users", handler.CreateUserHandler)
	r.GET("/users", handler.GetAllUsersHandler)
	r.GET("/users/:uuid", handler.GetUserByUUIDHandler)
	r.PATCH("/users/:uuid", handler.UpdateUserHandler)
	r.DELETE("/users/:uuid", handler.DeleteUserHandler)

	// Роуты для резюме
	r.POST("/cvs", handler.CreateCVHandler)
	r.GET("/cvs", handler.GetAllCVsHandler)
	r.POST("/cvs/filtered", handler.FilterCVsHandler)
	r.GET("/cvs/:cvid", handler.GetCVByIDHandler)
	r.PATCH("/cvs/:cvid", handler.UpdateCVHandler)
	r.DELETE("/cvs/:cvid", handler.DeleteCVHandler)

	// Запуск сервера
	r.Run(":8080")
}
