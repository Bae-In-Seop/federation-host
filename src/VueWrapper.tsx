import { useEffect, useRef } from 'react'

interface VueMountFunctions {
  mount: (options: { container: HTMLElement }) => void
  unmount: () => void
}

interface VueWrapperProps {
  mountFunctions: VueMountFunctions
}

export default function VueWrapper({ mountFunctions }: VueWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && mountFunctions) {
      // Let the Vue remote handle its own mounting
      mountFunctions.mount({ container: containerRef.current })
    }

    return () => {
      // Let the Vue remote handle its own unmounting
      mountFunctions?.unmount()
    }
  }, [mountFunctions])

  return <div ref={containerRef} />
}
