---
title: "Error Handling Patterns That Don't Crash Your API"
date: "2026-09-02"
excerpt: "A well built API doesn't just work when things go right. It fails gracefully, tells the client what went wrong, and keeps the server running when unexpected errors occur."
---

## The stakes are real

I learned the hard way that error handling is not an afterthought in backend development. A portfolio API that crashes on a bad request looks unprofessional, and an API that returns a 500 error with no explanation leaves both the user and the frontend developer in the dark.

The goal is simple: errors should be predictable, informative, and never bring the entire server down.

## The pattern: wrap, catch, and respond

The foundation of solid error handling is wrapping operations in try-catch blocks and responding with meaningful information. Here's what that looks like in Express:

```js
app.get("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate input
    if (!id || id.trim() === "") {
      return res.status(400).json({ 
        error: "Project ID is required" 
      });
    }
    
    const project = await getProjectById(id);
    
    if (!project) {
      return res.status(404).json({ 
        error: "Project not found" 
      });
    }
    
    res.json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ 
      error: "Failed to fetch project. Please try again later." 
    });
  }
});
```

This pattern handles three layers: validation, business logic, and unexpected errors.

## Use the right HTTP status codes

The HTTP status code you return tells the frontend what kind of problem occurred. The frontend can then decide how to respond.

- `400` (Bad Request): The client sent bad data (missing fields, invalid format)
- `401` (Unauthorized): The user is not authenticated
- `403` (Forbidden): The user is authenticated but not allowed to access this resource
- `404` (Not Found): The resource does not exist
- `500` (Internal Server Error): Something went wrong on the server

```js
if (!req.body.email) {
  // Client error — bad request
  return res.status(400).json({ error: "Email is required" });
}

if (!req.user) {
  // Authentication error
  return res.status(401).json({ error: "You must be logged in" });
}

if (user.role !== "admin") {
  // Authorization error
  return res.status(403).json({ error: "You do not have permission" });
}

if (!database.isConnected) {
  // Server error
  return res.status(500).json({ error: "Database connection lost" });
}
```

Using the right code makes the frontend's job easier and gives clients clear, actionable information.

## Never expose sensitive data in error messages

A common mistake is letting error messages reveal too much. If a database query fails, the frontend does not need to see the full SQL error. If a file operation fails, the user does not need to see the server's file path.

```js
// Bad: exposes internal details
} catch (err) {
  res.status(500).json({ 
    error: `Database error at /var/db/portfolio.sql: ${err.message}` 
  });
}

// Good: user-friendly, logged privately
} catch (err) {
  console.error("Database error:", err); // Log the full error
  res.status(500).json({ 
    error: "Failed to load data. Please try again later." 
  });
}
```

The full error details go to your logs. The client gets a friendly, generic message. This keeps your API secure and your users happy.

## Validation is the first line of defense

Most errors come from bad input, not bad code. Validating early prevents most errors from reaching your business logic:

```js
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  
  // Validate all required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: "Name, email, and message are required" 
    });
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: "Please provide a valid email address" 
    });
  }
  
  // Validate message length
  if (message.length < 10) {
    return res.status(400).json({ 
      error: "Message must be at least 10 characters" 
    });
  }
  
  // If we get here, data is clean — process it
  processContactForm(name, email, message);
  res.json({ success: true });
});
```

When input is validated before processing, half your errors disappear.

## Logging is not optional

Error logs are your window into what went wrong in production. Without them, you are flying blind:

```js
} catch (err) {
  // Log with context: what were we trying to do?
  console.error("Error fetching project:", {
    projectId: req.params.id,
    timestamp: new Date().toISOString(),
    error: err.message,
    stack: err.stack
  });
  
  res.status(500).json({ 
    error: "Failed to fetch project" 
  });
}
```

Good logs include the timestamp, the operation that failed, and the error details. When a user reports a bug, your logs tell you exactly what happened.

## The result

A portfolio API with solid error handling is:

- **Predictable**: Errors return standard status codes and clear messages
- **Secure**: Sensitive details stay in logs, not in responses
- **Debuggable**: Full error context is logged for your review
- **Professional**: Users know what went wrong and what to do about it

That is what separates a hobby project from production-ready code. Error handling is not glamorous, but it is essential.
