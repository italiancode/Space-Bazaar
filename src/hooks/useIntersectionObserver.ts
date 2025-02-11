import { useEffect, useRef, useState, RefObject } from 'react'

interface UseIntersectionObserverReturn {
  ref: RefObject<HTMLElement | null>;
  isVisible: boolean;
}

export function useIntersectionObserver(options = {}): UseIntersectionObserverReturn {
  const elementRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentElement = elementRef.current;
    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries[0].isIntersecting)
    }, options)

    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [elementRef])

  return { ref: elementRef, isVisible }
} 