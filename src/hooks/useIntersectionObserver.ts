import { useEffect, useRef, useState, RefObject } from 'react'

interface UseIntersectionObserverReturn {
  ref: RefObject<HTMLElement | null>;
  isVisible: boolean;
}

export function useIntersectionObserver(options = {}): UseIntersectionObserverReturn {
  const elementRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [options])

  return { ref: elementRef, isVisible }
} 