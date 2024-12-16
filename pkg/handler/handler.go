package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/mmasstug/proj-kct-resume/pkg/servise"
)

type Handler struct {
	services *servise.Service
}

func NewHendler(services *servise.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	auth := router.Group("/aurh")
	{
		auth.POST("/sing-up", h.singUp)
		auth.POST("/sing-in", h.singIn)
	}

	api := router.Group("/api")
	{
		ResumeList := api.Group("/resume")
		{
			ResumeList.POST("/", h.createResume)
			ResumeList.GET("/", h.getAllResume)
			ResumeList.GET("/:id", h.getResumeById)
			ResumeList.PUT("/:id", h.updateResume)
			ResumeList.DELETE("/:id", h.deleteResume)

			ResumeItem := api.Group(":id/item")
			{
				ResumeItem.POST("/", h.createResume)
				ResumeItem.GET("/", h.getAllItem)
				ResumeItem.GET("/:item_id", h.getItemById)
				ResumeItem.PUT("/:item_id", h.updateItem)
				ResumeItem.DELETE("/:item_id", h.deleteItem)
			}
		}
	}
	return router
}
