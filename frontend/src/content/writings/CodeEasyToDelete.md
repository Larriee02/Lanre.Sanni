---
title: "Writing Code That's Easy to Delete"
date: "2026-09-06"
excerpt: "The best code is not just good — it is expendable. When you can delete a component without breaking ten other things, that is when you know your architecture is sound."
---

## The lesson from production

I learned this the hard way. I built a feature for my portfolio that seemed like a great idea at the time, but after three months, it was clear it did not fit the design. The problem was not removing the feature — it was that removing it required touching code in five different places.

The component had too many dependencies, too many props being drilled through child components, and too many side effects tied to its lifecycle. It was not designed to be temporary; it was designed to be permanent and central.

That is the wrong approach. The best code is written with deletion in mind.

## Single responsibility is the foundation

A component should do one thing, and do it well. When a component tries to handle rendering, data fetching, validation, and navigation all at once, it becomes hard to remove:

```jsx
// Bad: too many responsibilities
export default function ProjectCard({ projectId }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data
    fetchProject(projectId).then(setProject);
  }, [projectId]);

  const handleDelete = async () => {
    // Delete project
    await deleteProject(projectId);
    // Navigate away
    navigate("/projects");
  };

  // Conditional rendering, error handling, loading states...
  // 150 lines of code that all depend on each other
}
```

Good luck deleting this component without breaking the projects page navigation.

## Good: separated concerns

Instead, break it into smaller pieces:

```jsx
// Separate data fetching
function useProject(id) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProject(id).then(setProject);
  }, [id]);

  return { project, loading, error };
}

// Separate presentation
function ProjectCardDisplay({ project, onDelete }) {
  return (
    <div className="card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

// Separate logic
export default function ProjectCard({ projectId, onProjectDeleted }) {
  const { project, loading, error } = useProject(projectId);
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteProject(projectId);
    onProjectDeleted();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading project</p>;

  return <ProjectCardDisplay project={project} onDelete={handleDelete} />;
}
```

Now if you need to delete the project card, you only need to understand what it does — not how five different concerns are tangled together.

## Prop contracts make deletion safe

When a component's props are explicit and required, it is clear what it needs to function. If you remove it, you know exactly which props you need to remove from its parent:

```jsx
// Good: clear contract
function ProjectCard({ 
  project,        // { name, description, image, link }
  onDelete,       // function
  onNavigate      // function
}) {
  // Component knows exactly what it needs
}

// Bad: unclear props, lots of spreading
function ProjectCard({ 
  ...props 
}) {
  // What does it actually need? Who knows.
  // You cannot safely remove it without guessing.
}
```

Explicit props are self-documenting. They tell future you (and other developers) what the component depends on.

## Avoid prop drilling by using composition

Prop drilling — passing props through multiple layers of components just to get them to a leaf component — creates hidden dependencies:

```jsx
// Bad: deeply nested prop drilling
<Layout theme={theme}>
  <Sidebar theme={theme}>
    <Menu theme={theme}>
      <MenuItem theme={theme} />
    </Menu>
  </Sidebar>
</Layout>
```

Remove `MenuItem`, and you need to trace back through three layers to clean up the props. Now use composition:

```jsx
// Good: composition reduces dependencies
<Layout>
  <Sidebar>
    <Menu>
      <MenuItem />
    </Menu>
  </Sidebar>
</Layout>
```

With a context or hook providing the theme, components do not need to know about it explicitly. Deleting a component does not require updating parent components.

## Keep side effects contained

A component should not trigger side effects outside of its own responsibility. If a component updates a global store, triggers analytics, or modifies the URL, removing it will have ripple effects:

```jsx
// Bad: side effects everywhere
export default function ProjectCard({ project }) {
  useEffect(() => {
    // Updates global store
    dispatch({ type: "PROJECT_VIEWED", id: project.id });
    
    // Triggers analytics
    trackEvent("project_card_mounted");
    
    // Modifies global state
    updatePageTitle(project.name);
  }, [project.id]);

  // ...
}

// Good: contained, obvious
export default function ProjectCard({ project, onView }) {
  useEffect(() => {
    onView(project.id); // Parent decides what to do with this
  }, [project.id, onView]);

  // ...
}
```

The parent component controls the side effects, not the child. That makes the component portable and deletable.

## The architecture that supports deletion

A codebase that is easy to delete is one where:

- Components have clear, single responsibilities
- Props are explicit and intentional
- Side effects are owned by parent components
- Composition and hooks replace prop drilling
- Dependencies between features are minimal

When you build this way, you can delete a feature in an afternoon without fear of breaking something else. That is the sign of good architecture.

## The real benefit

The funny thing is that code written to be deletable is also easier to understand, easier to test, and easier to extend. You are not sacrificing anything by following these principles — you are gaining clarity.

The best code is code that does not have to exist forever.