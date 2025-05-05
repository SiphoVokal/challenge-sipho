# Z-Form Frontend

## Technology

You can choose to build the frontend using either **React** or **Svelte**. Please clearly indicate your choice in this README.

## Core User Stories

As a user (form creator):

* I should be able to create a new form with a title.
* I should be able to add different types of questions to my form:
    * Short Text: For single-line text input.
    * Long Text: For multi-line text input.
    * Multiple Choice: Allow selecting one option from a list.
    * Dropdown: Allow selecting one option from a dropdown list.
    * Number: For numerical input.
* For each question, I should be able to:
    * Enter the question text.
    * Mark the question as required or optional.
    * For Multiple Choice and Dropdown questions, I should be able to add, remove, and reorder options.
* I should be able to reorder the questions in my form using drag-and-drop or an intuitive UI.
* I should be able to preview the form as it will appear to respondents.
* I should be able to save my form.

As a respondent:

* I should be able to view a form by visiting a unique URL.
* I should be able to answer all the questions in the form.
* I should be able to submit the completed form.
* I should see a confirmation message upon successful submission.

As an authenticated user (form creator):

* I should be able to see a list of all the forms I have created.
* I should be able to view the responses submitted for each of my forms.

## Technical Requirements

* **Form Builder Interface:**
    * A clear and intuitive interface for creating and editing forms.
    * Real-time preview of the form as it's being built.
* **State Management:** Implement proper state management (e.g., React Context API, Redux, Zustand for React, or Svelte's built-in stores).
* **UI Components:** Utilize a component-based architecture. You can use a UI library (like Material UI, Chakra UI, Tailwind CSS for React, or similar for Svelte) or build your own components.
* **API Interaction:** Implement functions to communicate with the Go backend API for:
    * Creating new forms.
    * Saving form definitions.
    * Fetching form definitions for preview and submission.
    * Submitting form responses.
    * Fetching submitted responses (authentication required).
* **Form Validation:** Implement basic client-side validation (e.g., checking for required fields).
* **Routing:** Implement basic routing to navigate between different views (e.g., form builder, form preview, form list, response view).

## UI/UX Considerations

* Focus on a clean and user-friendly design.
* Provide clear visual cues for different question types and actions.
* Ensure the form preview accurately reflects the final form.

## API Interaction

The frontend will interact with the backend API using standard HTTP requests (likely using `Workspace` or a similar library). You will need to define the API endpoints in the backend README.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Z-Form Backend API

## Technology

This backend is built using **Golang**.

## Core User Stories

As a user (form creator):

* When I create a new form via the frontend, the backend should generate a unique ID for it and store its basic metadata (e.g., title, creation date).
* When I add or modify questions in the form builder, the backend should store the form definition (including question type, text, options, and required status).
* When I request to preview a form, the backend should provide the form definition based on its ID.
* When respondents submit a form, the backend should receive and store their responses, associated with the corresponding form ID and question IDs.
* When I (an authenticated user) request to view the responses for one of my forms, the backend should retrieve and provide these responses.

## Technical Requirements

* **API Endpoints:** Implement the following RESTful API endpoints:
    * `POST /api/forms`: Create a new form. Request body should contain the form title (at least). Returns the ID of the newly created form.
    * `GET /api/forms/{formId}`: Get a specific form definition (for preview and submission).
    * `PUT /api/forms/{formId}`: Update the form definition (when adding or modifying questions). Request body should contain the updated form structure.
    * `POST /api/forms/{formId}/submissions`: Submit a response to a form. Request body should contain the answers to the questions.
    * `GET /api/forms`: Get a list of all forms created by the authenticated user (authentication details below).
    * `GET /api/forms/{formId}/responses`: Get all responses submitted for a specific form (authentication required).
* **Data Storage:** Choose a suitable data storage mechanism (e.g., SQLite, PostgreSQL, MongoDB). For simplicity in this challenge, you could initially use in-memory storage (like a Go map), but clearly document this choice and its limitations. If using a database, provide the schema definition.
* **API Implementation:** Use a suitable Go web framework (e.g., Gin, Echo, Fiber, net/http).
* **JSON Handling:** Use Go's `encoding/json` package or a similar library for handling JSON requests and responses.
* **Basic Validation:** Implement basic backend validation for request data.
* **Error Handling:** Implement proper error handling and return appropriate HTTP status codes.
* **Concurrency:** Ensure your backend can handle concurrent requests.

## API Endpoints (Detailed Request/Response Structure - Example)

**POST /api/forms**

* **Request Body:**
    ```json
    {
      "title": "My New Form"
    }
    ```
* **Response Body (Success - HTTP 201 Created):**
    ```json
    {
      "id": "unique-form-id-123"
    }
    ```

**GET /api/forms/{formId}**

* **Response Body (Success - HTTP 200 OK):**
    ```json
    {
      "id": "unique-form-id-123",
      "title": "My New Form",
      "questions": [
        {
          "id": "q1",
          "type": "short_text",
          "text": "What is your name?",
          "required": true
        },
        {
          "id": "q2",
          "type": "multiple_choice",
          "text": "What is your favorite color?",
          "required": false,
          "options": ["Red", "Blue", "Green"]
        }
        // ... more questions
      ]
    }
    ```

**POST /api/forms/{formId}/submissions**

* **Request Body:**
    ```json
    {
      "q1": "John Doe",
      "q2": "Blue"
      // ... answers to other questions
    }
    ```
* **Response Body (Success - HTTP 201 Created):**
    ```json
    {
      "message": "Form submitted successfully!"
    }
    ```

**(Define the request/response structures for other endpoints similarly)**

## Data Storage (Considerations)

* If using a relational database (like PostgreSQL or SQLite), you might have tables for `forms` and `responses`, with a way to link questions to forms and answers to responses.
* If using a NoSQL database (like MongoDB), you might store the entire form definition and responses as documents.

## Authentication/Authorization (Simplified for Challenge)

For this coding challenge, you can implement a very basic form of authentication. For example, you could assume a single user for simplicity or use a hardcoded API key for accessing the form creation and response viewing endpoints. If you choose to implement more robust authentication, please document your approach.
