import Map, {
  Marker,
  type MarkerInstance,
  type MapLayerMouseEvent,
  type MarkerDragEvent,
} from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useEffect, useState, useRef } from 'react'
import { useGemLngLat } from '@/stores/home/gemLngLat.store'
import { useQuery } from '@tanstack/react-query'
import { getGems } from '@/services/gems.service'
import { useCreateUpdateForm } from '@/stores/home/form.store'
import type { Gem } from '@/types/home'
import clsx from 'clsx'

// All the logic here should be used for increasing uxui user select gem, pin gem, and updated gem
// User adds pin, and selects on map to adds gem
// User selects on marker to updates gem infomation

export default function GemMap() {
  const [cursor, setCursor] = useState<string>('crosshair')
  const [isSpaceHeld, setIsSpaceHeld] = useState<boolean>(false)
  const [dragPan, setDragPan] = useState<boolean>(false)
  const { formAction, setFormAction, gemId, setGemId, resetFormState } =
    useCreateUpdateForm((state) => state)
  const { gemLngLat, setGemLngLat, locationConfirmed, resetGemLngLatState } =
    useGemLngLat((state) => state)

  const markerRef = useRef<maplibregl.Marker>(null)

  const { data: gems } = useQuery({
    queryKey: ['gems'],
    queryFn: getGems,
  })

  function handleClickMap(e: MapLayerMouseEvent) {
    if (!locationConfirmed) {
      const { lng, lat } = e.lngLat
      setGemLngLat([lng, lat])
    }
  }

  function handleOnDragEnd(e: MarkerDragEvent) {
    if (!locationConfirmed && formAction !== 'none') {
      const { lng, lat } = e.lngLat
      setGemLngLat([lng, lat])
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setIsSpaceHeld(true)
        setCursor('grab')
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        setIsSpaceHeld(false)
        if (formAction === 'create') {
          setCursor('crosshair')
        } else {
          setCursor('default')
        }
      }
    }

    if (formAction === 'create') {
      setCursor('crosshair')
    } else {
      setCursor('default')
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [formAction])

  useEffect(() => {
    if (isSpaceHeld) {
      setDragPan(true)
    } else {
      setDragPan(false)
    }
  }, [isSpaceHeld])

  function handleReset(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      resetGemLngLatState()
      resetFormState()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleReset)
    return () => {
      window.removeEventListener('keydown', handleReset)
    }
  }, [])

  useEffect(() => {
    if (markerRef) {
      markerRef.current?.addClassName('')
    }
  }, [markerRef])

  return (
    <ScrollArea className="w-full">
      <Map
        id="mainMap"
        onClick={handleClickMap}
        dragPan={dragPan}
        cursor={cursor}
        initialViewState={{
          longitude: 107.83333333,
          latitude: 16.16666666,
          zoom: 5,
        }}
        style={{
          width: '100%',
          height: 'calc(100vh - 144px)',
          display: 'flex',
        }}
        mapStyle="https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json"
      >
        {/* This marker used for create new gem */}
        {gemLngLat.length > 0 && formAction === 'create' && (
          <Marker
            onDragEnd={handleOnDragEnd}
            longitude={gemLngLat[0]}
            latitude={gemLngLat[1]}
            draggable={!locationConfirmed}
            color="oklch(0.72 0.219 149.579)"
            anchor="center"
            className=""
          />
        )}
        {gems?.map((gem: Gem) => (
          <Marker
            key={gem.id}
            className={clsx(
              formAction === 'create' ? 'cursor-not-allowed' : 'cursor-pointer',
              gemId === gem.id && '[&>svg>g>g:nth-child(2)]:fill-red-500'
            )}
            ref={gemId === gem.id ? markerRef : null}
            onDragEnd={handleOnDragEnd}
            longitude={gemId === gem.id ? gemLngLat[0] : gem.coordinates[0]}
            latitude={gemId === gem.id ? gemLngLat[1] : gem.coordinates[1]}
            draggable={gemId === gem.id && !locationConfirmed}
            anchor="center"
          />
        ))}
      </Map>
    </ScrollArea>
  )
}
