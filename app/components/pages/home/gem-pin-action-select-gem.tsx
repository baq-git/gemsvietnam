import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getGems } from '@/services/gems.service'
import { useCreateUpdateForm } from '@/stores/home/form.store'
import { useGemLngLat } from '@/stores/home/gemLngLat.store'
import type { Gem } from '@/types/home'
import { useQuery } from '@tanstack/react-query'

export default function GemPinActionSelectGem() {
  const { setGemId, setFormAction } = useCreateUpdateForm((state) => state)
  const { setGemLngLat } = useGemLngLat((state) => state)

  const { data: gems } = useQuery({
    queryKey: ['gems'],
    queryFn: getGems,
  })

  function handleChangeValue(id: string) {
    const gem: Gem = gems.find((gem: Gem) => gem.id === id)
    setGemId(id)
    setFormAction('update')
    setGemLngLat([gem.coordinates[0], gem.coordinates[1]])
  }

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={'gem'}>Select Gems to view and update info</Label>
      <Select onValueChange={handleChangeValue}>
        <SelectTrigger
          id="gem"
          className="h-auto ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0 w-full"
        >
          <SelectValue placeholder="Choose a plan" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          {gems?.map((gem: Gem) => (
            <SelectItem key={gem.id} value={gem.id} className="w-full">
              <span className="flex items-center gap-2 w-full">
                <span>
                  <span className="block font-medium">{gem.gemName}</span>
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
