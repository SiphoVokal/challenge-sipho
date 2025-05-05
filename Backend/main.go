package main

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"
)

type Form struct {
	ID        string     `json:"id"`
	Title     string     `json:"title"`
	Questions []Question `json:"questions"`
}

type Question struct {
	ID       string   `json:"id"`
	Type     string   `json:"type"`
	Text     string   `json:"text"`
	Required bool     `json:"required"`
	Options  []string `json:"options,omitempty"`
}

type Submission struct {
	Answers map[string]string `json:"answers"`
}

var (
	forms       = make(map[string]Form)         // In-memory map to store forms
	submissions = make(map[string][]Submission) // In-memory map to store submissions
	mutex       sync.Mutex
)

func init() {
	godotenv.Load() // Load environment variables from .env file
}

func main() {
	router := gin.Default()
	r := router.Group("/auth")

	RegisterAuthRoutes(r)

	// Protected Form Routes
	auth := r.Group("/api/forms", authMiddleware)
	{
		auth.POST("", createForm)
		auth.GET("/:formId", getForm)
		auth.PUT("/:formId", updateForm)
		auth.POST("/:formId/submissions", submitForm)
	}

	router.Run(":8080")
}

// Create a new form
func createForm(c *gin.Context) {
	var newForm Form
	if err := c.ShouldBindJSON(&newForm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	newForm.ID = generateID()

	mutex.Lock()
	forms[newForm.ID] = newForm
	mutex.Unlock()

	c.JSON(http.StatusCreated, gin.H{"id": newForm.ID})
}

// Retrieve a form by ID
func getForm(c *gin.Context) {
	formID := c.Param("formId")

	mutex.Lock()
	form, exists := forms[formID]
	mutex.Unlock()

	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Form not found"})
		return
	}

	c.JSON(http.StatusOK, form)
}

// Update a form by ID
func updateForm(c *gin.Context) {
	formID := c.Param("formId")

	mutex.Lock()
	_, exists := forms[formID]
	mutex.Unlock()

	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Form not found"})
		return
	}

	var updatedForm Form
	if err := c.ShouldBindJSON(&updatedForm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	mutex.Lock()
	updatedForm.ID = formID
	forms[formID] = updatedForm
	mutex.Unlock()

	c.JSON(http.StatusOK, gin.H{"message": "Form updated"})
}

// Submit a form response
func submitForm(c *gin.Context) {
	formID := c.Param("formId")

	mutex.Lock()
	_, exists := forms[formID]
	mutex.Unlock()

	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "Form not found"})
		return
	}

	var submission Submission
	if err := c.ShouldBindJSON(&submission); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	mutex.Lock()
	submissions[formID] = append(submissions[formID], submission)
	mutex.Unlock()

	c.JSON(http.StatusCreated, gin.H{"message": "Form submitted successfully!"})
}

// Generate a unique ID (placeholder function)
func generateID() string {
	return fmt.Sprintf("form-%d", len(forms)+1)
}
