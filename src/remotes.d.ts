declare module 'playground/App' {
  const App: React.ComponentType
  export default App
}

declare module 'dashboard/App' {
  const App: React.ComponentType
  export default App
}

declare module 'kanban/App' {
  const App: React.ComponentType
  export default App
}

declare module 'flowbuilder/App' {
  const App: React.ComponentType
  export default App
}

declare module 'vue_playground/mount' {
  export function mount(options: { container: HTMLElement }): void
  export function unmount(): void
}
