package main

import (
	"github.com/mmasstug/proj-kct-resume"
	"github.com/mmasstug/proj-kct-resume/pkg/handler"
	"github.com/mmasstug/proj-kct-resume/pkg/repository"
	"github.com/mmasstug/proj-kct-resume/pkg/servise"
	"log"
)

func main() {
	repos := repository.NewReposirory()
	servise := servise.NewService(repos)
	handlers := handler.NewHendler(servise)

	srv := new(proj.Server)
	if err := srv.Run("8000", handlers.InitRoutes()); err != nil {
		log.Fatalf("error running: %s", err.Error())
	}
}
