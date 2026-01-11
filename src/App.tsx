import React, { Suspense, lazy, useState, useRef, useEffect, useCallback, Component, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './style.css'
import menuData from './menu.json'
import About from './pages/About'
import Projects from './pages/Projects'
import Architecture from './pages/Architecture'
import VueWrapper from './VueWrapper'

const PlaygroundApp = lazy(() => import('playground/App'))
const FlowBuilderApp = lazy(() => import('flowbuilder/App'))
const VuePlaygroundApp = lazy(() => import('vue_playground/mount').then((mod) => ({ default: () => <VueWrapper mountFunctions={mod} /> })))

type LayoutMode = 'sidebar' | 'topbar'
type FontSize = 'small' | 'medium' | 'large'

interface ThemeColor {
  id: string
  name: string
  primary: string
  accent: string
}

const themeColors: ThemeColor[] = [
  { id: 'blue', name: 'Blue', primary: '#6366f1', accent: '#38bdf8' },
  { id: 'purple', name: 'Purple', primary: '#8b5cf6', accent: '#a78bfa' },
  { id: 'pink', name: 'Pink', primary: '#ec4899', accent: '#f472b6' },
  { id: 'orange', name: 'Orange', primary: '#f97316', accent: '#fb923c' },
  { id: 'green', name: 'Green', primary: '#10b981', accent: '#34d399' },
  { id: 'cyan', name: 'Cyan', primary: '#06b6d4', accent: '#22d3ee' },
]

const fontSizes = [
  { id: 'small', label: 'Small', value: '14px' },
  { id: 'medium', label: 'Medium', value: '16px' },
  { id: 'large', label: 'Large', value: '18px' },
] as const

// Icon components mapping
const icons: Record<string, React.ReactNode> = {
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  components: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07l-2.83 2.83m-4.48 4.48l-2.83 2.83m0-10.14l2.83 2.83m4.48 4.48l2.83 2.83" />
    </svg>
  ),
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  flow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <path d="M6 9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9" />
      <path d="M12 15v-3" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
}

// Menu data from JSON
const menuCategories = menuData.categories
const allMenuItems = menuCategories.flatMap((cat) => cat.items)

// Helper to find category by item id
function findCategoryByItemId(itemId: string) {
  return menuCategories.find((cat) => cat.items.some((item) => item.id === itemId))
}

// Helper to get tab label with category
function getTabLabel(itemId: string) {
  const category = findCategoryByItemId(itemId)
  const item = allMenuItems.find((m) => m.id === itemId)
  if (!category || !item) return itemId
  return `${category.label} - ${item.label}`
}

// Error Boundary for remote apps
interface ErrorBoundaryProps {
  children: ReactNode
  onRetry?: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class RemoteErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
    this.props.onRetry?.()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="remote-error">
          <div className="remote-error-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="remote-error-title">앱을 불러오는데 실패했습니다</h3>
          <p className="remote-error-message">
            원격 모듈을 로드하는 중 오류가 발생했습니다.
          </p>
          <button type="button" className="remote-error-retry" onClick={this.handleRetry}>
            다시 시도
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

function LoadingFallback() {


  const { setIsLoading } = useTabContext()

  useEffect(() => {
    setIsLoading(true)
    return () => setIsLoading(false)
  }, [setIsLoading])

  return (
    <div className="remote-loading">
      <div className="loading-spinner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" opacity="0.2" />
          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

function RemoteShell({ remoteId }: { remoteId: string }) {
  switch (remoteId) {
    case 'about':
      return <About />
    case 'projects':
      return <Projects />
    case 'architecture':
      return <Architecture />
    case 'react-playground':
      return (
        <RemoteErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
          <PlaygroundApp />
        </Suspense>
        </RemoteErrorBoundary>
      )
    case 'flow-builder':
      return (
        <RemoteErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
          <FlowBuilderApp />
        </Suspense>
        </RemoteErrorBoundary>
      )
    case 'vue-playground':
      return (
        <RemoteErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <VuePlaygroundApp />
          </Suspense>
        </RemoteErrorBoundary>
      )
    case 'react-dashboard':
    case 'vue-dashboard':
    default:
      return (
        <div className="remote-placeholder">
          {remoteId} 페이지는 아직 준비 중입니다.
        </div>
      )
  }
}

function Breadcrumb({ itemId }: { itemId: string }) {
  const category = findCategoryByItemId(itemId)
  const item = allMenuItems.find((i) => i.id === itemId)

  if (!category || !item) return null

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <span className="breadcrumb-item">{category.label}</span>
      <span className="breadcrumb-separator">/</span>
      <span className="breadcrumb-item is-current">{item.label}</span>
    </nav>
  )
}

function TabMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { closeTab, closeOtherTabs, closeAllTabs, refreshCurrentTab, toggleMaximize, activeTab } = useTabContext()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleAction = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  return (
    <div className="tab-menu-wrapper" ref={menuRef}>
      <button
        type="button"
        className="tab-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Tab menu"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      </button>
      {isOpen && (
        <div className="tab-menu-popover">
          <button type="button" onClick={() => handleAction(refreshCurrentTab)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            새로고침
          </button>
          <button type="button" onClick={() => handleAction(toggleMaximize)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
            최대화
          </button>
          <div className="tab-menu-divider" />
          <button type="button" onClick={() => handleAction(() => closeTab(activeTab))}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            현재 탭 닫기
          </button>
          <button type="button" onClick={() => handleAction(closeOtherTabs)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="9" x2="15" y2="15" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
            다른 탭 닫기
          </button>
          <button type="button" onClick={() => handleAction(closeAllTabs)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14" />
            </svg>
            모든 탭 닫기
          </button>
        </div>
      )}
    </div>
  )
}

function LoadingProgressBar() {
  const { isLoading } = useTabContext()

  if (!isLoading) return null

  return (
    <div className="loading-progress-bar">
      <div className="loading-progress-track">
        <div className="loading-progress-fill" />
      </div>
    </div>
  )
}

function TabBar() {
  const { tabs, activeTab, setActiveTab, closeTab } = useTabContext()
  const tabListRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = tabListRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [])

  useEffect(() => {
    checkScroll()
    const el = tabListRef.current
    if (!el) return

    el.addEventListener('scroll', checkScroll)
    const resizeObserver = new ResizeObserver(checkScroll)
    resizeObserver.observe(el)

    return () => {
      el.removeEventListener('scroll', checkScroll)
      resizeObserver.disconnect()
    }
  }, [checkScroll, tabs])

  const scroll = (direction: 'left' | 'right') => {
    const el = tabListRef.current
    if (!el) return
    const scrollAmount = 150
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="tab-bar-wrapper">
      <div className="tab-bar">
        <button
          type="button"
          className={`tab-scroll-btn tab-scroll-left ${canScrollLeft ? 'is-visible' : ''}`}
          onClick={() => scroll('left')}
          aria-label="Scroll tabs left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="tab-list" ref={tabListRef}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab-item ${activeTab === tab.id ? 'is-active' : ''}`}
            >
              <button
                type="button"
                className="tab-button"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
              <button
                type="button"
                className="tab-close"
                onClick={(e) => {
                  e.stopPropagation()
                  closeTab(tab.id)
                }}
                aria-label={`Close ${tab.label}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={`tab-scroll-btn tab-scroll-right ${canScrollRight ? 'is-visible' : ''}`}
          onClick={() => scroll('right')}
          aria-label="Scroll tabs right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <TabMenu />
      </div>
      <LoadingProgressBar />
    </div>
  )
}

function RemoteContent() {
  const { activeTab, refreshKey, isMaximized, toggleMaximize } = useTabContext()
  const active = allMenuItems.find((item) => item.id === activeTab) ?? allMenuItems[0]

  return (
    <main className={`content ${isMaximized ? 'is-maximized' : ''}`}>
      {isMaximized && (
        <button
          type="button"
          className="maximize-exit-btn"
          onClick={toggleMaximize}
          aria-label="Exit maximize"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
      <TabBar />
      <div className="content-body">
        <header className="content-header">
          <Breadcrumb itemId={activeTab} />
          <h1>{active.label}</h1>
          <p className="lede">{active.description}</p>
        </header>

        <section className="remote-shell">
          <RemoteShell key={refreshKey} remoteId={activeTab} />
        </section>
      </div>
    </main>
  )
}

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`collapse-icon ${collapsed ? 'is-collapsed' : ''}`}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function SidebarLayoutIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 48 36" className={`layout-icon ${active ? 'is-active' : ''}`}>
      <rect x="1" y="1" width="46" height="34" rx="4" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
      <rect x="1" y="1" width="14" height="34" rx="4" fill="currentColor" opacity={active ? 0.4 : 0.2} stroke="currentColor" strokeWidth="2" />
      <rect x="19" y="5" width="24" height="4" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="19" y="12" width="24" height="20" rx="2" fill="currentColor" opacity="0.15" />
    </svg>
  )
}

function TopbarLayoutIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 48 36" className={`layout-icon ${active ? 'is-active' : ''}`}>
      <rect x="1" y="1" width="46" height="34" rx="4" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
      <rect x="1" y="1" width="46" height="10" rx="4" fill="currentColor" opacity={active ? 0.4 : 0.2} stroke="currentColor" strokeWidth="2" />
      <rect x="5" y="15" width="38" height="4" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="22" width="38" height="10" rx="2" fill="currentColor" opacity="0.15" />
    </svg>
  )
}

interface SettingsPopoverProps {
  isOpen: boolean
  onClose: () => void
  layout: LayoutMode
  onLayoutChange: (layout: LayoutMode) => void
  themeColor: string
  onThemeColorChange: (color: string) => void
  fontSize: FontSize
  onFontSizeChange: (size: FontSize) => void
  collapsed: boolean
}

function SettingsPopover({
  isOpen,
  onClose,
  layout,
  onLayoutChange,
  themeColor,
  onThemeColorChange,
  fontSize,
  onFontSizeChange,
  collapsed,
}: SettingsPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={popoverRef}
      className={`settings-popover ${collapsed ? 'from-collapsed' : ''}`}
    >
      <div className="popover-header">
        <h3>Settings</h3>
        <button type="button" className="popover-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="popover-content">
        <fieldset className="settings-fieldset">
          <legend>Layout</legend>
          <div className="layout-options">
            <label className={`layout-option ${layout === 'sidebar' ? 'is-selected' : ''}`}>
              <input
                type="radio"
                name="layout"
                value="sidebar"
                checked={layout === 'sidebar'}
                onChange={() => onLayoutChange('sidebar')}
              />
              <SidebarLayoutIcon active={layout === 'sidebar'} />
              <span>Sidebar</span>
            </label>
            <label className={`layout-option ${layout === 'topbar' ? 'is-selected' : ''}`}>
              <input
                type="radio"
                name="layout"
                value="topbar"
                checked={layout === 'topbar'}
                onChange={() => onLayoutChange('topbar')}
              />
              <TopbarLayoutIcon active={layout === 'topbar'} />
              <span>Topbar</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="settings-fieldset">
          <legend>Theme Color</legend>
          <div className="color-options">
            {themeColors.map((color) => (
              <button
                key={color.id}
                type="button"
                className={`color-option ${themeColor === color.id ? 'is-selected' : ''}`}
                style={{ '--color': color.primary } as React.CSSProperties}
                onClick={() => onThemeColorChange(color.id)}
                aria-label={color.name}
                title={color.name}
              >
                {themeColor === color.id && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="settings-fieldset">
          <legend>Font Size</legend>
          <div className="fontsize-options">
            {fontSizes.map((size) => (
              <button
                key={size.id}
                type="button"
                className={`fontsize-option ${fontSize === size.id ? 'is-selected' : ''}`}
                onClick={() => onFontSizeChange(size.id)}
              >
                {size.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  )
}

interface TabItem {
  id: string
  label: string
}

interface TabContextValue {
  tabs: TabItem[]
  activeTab: string
  refreshKey: number
  isMaximized: boolean
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  openTab: (id: string) => void
  closeTab: (id: string) => void
  closeOtherTabs: () => void
  closeAllTabs: () => void
  setActiveTab: (id: string) => void
  refreshCurrentTab: () => void
  toggleMaximize: () => void
}

const TabContext = React.createContext<TabContextValue | null>(null)

function useTabContext() {
  const context = React.useContext(TabContext)
  if (!context) throw new Error('useTabContext must be used within TabProvider')
  return context
}

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false)
  const [layout, setLayout] = useState<LayoutMode>('sidebar')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [themeColor, setThemeColor] = useState('blue')
  const [fontSize, setFontSize] = useState<FontSize>('medium')
  const [tabs, setTabs] = useState<TabItem[]>([{ id: 'about', label: getTabLabel('about') }])
  const [activeTab, setActiveTabState] = useState('about')
  const [refreshKey, setRefreshKey] = useState(0)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Sync activeTab with URL on location change
  useEffect(() => {
    const pathId = location.pathname.slice(1)

    // Redirect to /about if no path
    if (!pathId) {
      navigate('/about', { replace: true })
      return
    }

    const item = allMenuItems.find((m) => m.id === pathId)

    if (item) {
      // Add to tabs if not exists
      setTabs((prev) => {
        if (prev.find((t) => t.id === pathId)) return prev
        return [...prev, { id: pathId, label: getTabLabel(pathId) }]
      })
      setActiveTabState(pathId)
    } else {
      // Invalid path, redirect to about
      navigate('/about', { replace: true })
    }
  }, [location.pathname, navigate])

  const openTab = useCallback((id: string) => {
    const item = allMenuItems.find((m) => m.id === id)
    if (!item) return

    if (!tabs.find((t) => t.id === id)) {
      setTabs([...tabs, { id, label: getTabLabel(id) }])
    }
    navigate(`/${id}`)
  }, [tabs, navigate])

  const closeTab = useCallback((id: string) => {
    const newTabs = tabs.filter((t) => t.id !== id)
    if (newTabs.length === 0) {
      setTabs([{ id: 'about', label: getTabLabel('about') }])
      navigate('/about')
    } else {
      setTabs(newTabs)
      if (activeTab === id) {
        const newActiveTab = newTabs[newTabs.length - 1].id
        navigate(`/${newActiveTab}`)
      }
    }
  }, [tabs, activeTab, navigate])

  const setActiveTab = useCallback((id: string) => {
    navigate(`/${id}`)
  }, [navigate])

  const closeOtherTabs = useCallback(() => {
    const currentTab = tabs.find((t) => t.id === activeTab)
    if (currentTab) {
      setTabs([currentTab])
    }
  }, [tabs, activeTab])

  const closeAllTabs = useCallback(() => {
    setTabs([{ id: 'about', label: getTabLabel('about') }])
    navigate('/about')
  }, [navigate])

  const refreshCurrentTab = useCallback(() => {
    setRefreshKey((prev) => prev + 1)
  }, [])

  const toggleMaximize = useCallback(() => {
    setIsMaximized((prev) => !prev)
  }, [])

  const tabContextValue: TabContextValue = {
    tabs,
    activeTab,
    refreshKey,
    isMaximized,
    isLoading,
    setIsLoading,
    openTab,
    closeTab,
    closeOtherTabs,
    closeAllTabs,
    setActiveTab,
    refreshCurrentTab,
    toggleMaximize,
  }

  const currentTheme = themeColors.find((c) => c.id === themeColor) ?? themeColors[0]
  const currentFontSize = fontSizes.find((f) => f.id === fontSize) ?? fontSizes[1]

  const appClassName = [
    'app',
    `layout-${layout}`,
    collapsed && layout === 'sidebar' ? 'sidebar-collapsed' : '',
    isMaximized ? 'is-maximized' : '',
  ].filter(Boolean).join(' ')

  const cssVariables = {
    '--theme-primary': currentTheme.primary,
    '--theme-accent': currentTheme.accent,
    '--base-font-size': currentFontSize.value,
  } as React.CSSProperties

  return (
    <div className={appClassName} style={cssVariables}>
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="brand">
            <span className="brand-avatar" aria-hidden>T</span>
            <div className="brand-text">
              <p className="brand-title">Toby's Lab</p>
              <p className="brand-sub">Frontend Developer</p>
            </div>
          </div>
          {layout === 'sidebar' && (
            <button
              type="button"
              className="collapse-btn"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <CollapseIcon collapsed={collapsed} />
            </button>
          )}
        </div>
        <nav className="menu" aria-label="Remote apps">
          {menuCategories.map((category) => (
            <div key={category.id} className="menu-category">
              <span className="menu-category-label">{category.label}</span>
              <div className="menu-category-items">
                {category.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`menu-item ${activeTab === item.id ? 'is-active' : ''}`}
                    onClick={() => openTab(item.id)}
                    title={collapsed && layout === 'sidebar' ? item.label : undefined}
                  >
                    <span className="menu-icon">{icons[item.icon]}</span>
                    <div className="menu-text">
                      <span>{item.label}</span>
                      <small>{item.description}</small>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="settings-wrapper">
            <button
              type="button"
              className="settings-btn"
              onClick={() => setSettingsOpen(!settingsOpen)}
              aria-label="Settings"
              title={collapsed && layout === 'sidebar' ? 'Settings' : undefined}
            >
              <span className="menu-icon">
                <SettingsIcon />
              </span>
              <span className="settings-text">Settings</span>
            </button>
            <SettingsPopover
              isOpen={settingsOpen}
              onClose={() => setSettingsOpen(false)}
              layout={layout}
              onLayoutChange={setLayout}
              themeColor={themeColor}
              onThemeColorChange={setThemeColor}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              collapsed={collapsed}
            />
          </div>
        </div>
      </aside>

      <TabContext.Provider value={tabContextValue}>
        <RemoteContent />
      </TabContext.Provider>
    </div>
  )
}
