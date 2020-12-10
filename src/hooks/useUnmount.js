import { useEffect, useRef } from 'react'

export default function useUnmount (onUnmount) {
  const unmountingRef = useRef(false)

  useEffect(() => {
    return () => {
      unmountingRef.current = true
      onUnmount && onUnmount()
    }
  }, []) // NOTE: empty array means that this hook is a direct replacement of componentDidMount
  return unmountingRef
}
