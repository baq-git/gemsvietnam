import Map, { Marker, type MapLayerMouseEvent } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useEffect, useState } from 'react'
import { useGemLngLat } from '@/stores/home/gemLngLat.store'
import { useQuery } from '@tanstack/react-query'
import { getGems } from '@/services/gems.service'
import type { Gem } from '@/types/home'

export default function GemMap() {
  const [cursor, setCursor] = useState<string>('crosshair')
  const [isSpaceHeld, setIsSpaceHeld] = useState<boolean>(false)
  const [dragPan, setDragPan] = useState<boolean>(false)

  const { gemLngLat, setGemLngLat, locationConfirmed } = useGemLngLat(
    (state) => state
  )

  const { data: gems } = useQuery({
    queryKey: ['gems'],
    queryFn: getGems,
  })

  function handleClick(e: MapLayerMouseEvent) {
    if (!locationConfirmed) {
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
        setCursor('crosshair')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    if (isSpaceHeld) {
      setDragPan(true)
    } else {
      setDragPan(false)
    }
  }, [isSpaceHeld])

  console.log(gems)

  return (
    <ScrollArea className="w-full">
      <Map
        onClick={handleClick}
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
        {gemLngLat.length > 0 && (
          <Marker
            longitude={gemLngLat[0]}
            latitude={gemLngLat[1]}
            draggable={true}
            anchor="bottom"
          />
        )}
        {gems?.map((gem: Gem) => (
          <Marker
            longitude={gem.coordinates[0]}
            latitude={gem.coordinates[1]}
            draggable={false}
            anchor="bottom"
          />
        ))}
      </Map>
    </ScrollArea>
  )
}
