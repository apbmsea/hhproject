package main

import (
	_ "github.com/lib/pq"
	"github.com/mmasstug/proj-kct-resume"
	"github.com/mmasstug/proj-kct-resume/pkg/handler"
	"github.com/mmasstug/proj-kct-resume/pkg/repository"
	"github.com/mmasstug/proj-kct-resume/pkg/servise"
	"github.com/spf13/viper"
	"log"
	"os"
)

func main() {
	if err := initConfig(); err != nil {
		log.Fatalf("error initializing configs: %s", err.Error())
	}

	db, err := repository.NewPostgresDB(repository.Config{
		Host:     viper.GetString("db.host"),
		Port:     viper.GetString("db.port"),
		Username: viper.GetString("db.username"),
		DBName:   viper.GetString("db.dbname"),
		SSLMode:  viper.GetString("db.sslmode"),
		Password: os.Getenv("DB_PASSWORD"),
	})

	if err != nil {
		log.Fatalf("failed to initialize db: %s", err.Error())
	}

	repos := repository.NewReposirory()
	servise := servise.NewService(repos)
	handlers := handler.NewHendler(servise)

	srv := new(proj.Server)
	if err := srv.Run(viper.GetString("8000"), handlers.InitRoutes()); err != nil {
		log.Fatalf("error running: %s", err.Error())
	}
}

func initConfig() error {
	viper.AddConfigPath("configs")
	viper.SetConfigName("config")
	return viper.ReadInConfig()
}
