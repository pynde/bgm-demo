import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import React, { Activity, useEffect, useRef, useState } from 'react'

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
    const img = imgRef.current;
    if (img && img.complete) {
      requestAnimationFrame(() => setLoading(false));
    }
  }, []);

  const handleLoad = () => {
    requestAnimationFrame(() => setLoading(false));
  }

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
    <>
      <img loading="lazy" onLoad={() => handleLoad()} ref={imgRef} src={src} alt={alt} onError={handleError} className={clsx(className, loading ? "opacity-0" : "opacity-100")} style={style} {...rest} />
      <LoadingImageAnimation loading={loading} />
    </>
  )
}

export const LoadingImageAnimation = (props: React.HTMLAttributes<HTMLDivElement> & { loading: boolean }) => {

  return (
    <Activity mode={props.loading ? "visible" : "hidden"}>
      <div className={clsx("w-full h-full absolute inset-0 flex items-center justify-center")}>
        <LoaderCircle className={'animate-spin animate-infinite'} />
      </div>
    </Activity>
  )
}