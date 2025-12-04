import clsx from 'clsx';
import React, { Suspense, useEffect, useRef, useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement> & { key?: string }) {
  const [didError, setDidError] = useState(false);
  const [loading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleError = () => {
    setDidError(true)
  }

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoading(false)
    }
    console.log(imgRef.current, 'complete: ' + imgRef.current?.complete);
  }, [imgRef.current]);



  const { src, alt, style, className, ...rest } = props
  if (!src) return null;
  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <div className={clsx(loading && 'animate-pulse animate-infinite bg-slate-500/80', 'w-full h-full')}>
      <img loading="lazy" onLoad={() => setLoading(false)} ref={imgRef} src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
    </div>
  )
}

const LoadingImage = () => {
  return (
    <div className="flex items-center justify-center w-full h-full animate-pulse animate-infinite" />
  )
}
