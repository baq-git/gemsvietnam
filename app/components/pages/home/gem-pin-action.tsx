import { Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreateUpdateForm, type formAction } from '@/stores/home/form.store'
import { useGemLngLat } from '@/stores/home/gemLngLat.store'
import GemPinActionSelectGem from './gem-pin-action-select-gem'
import { useEffect } from 'react'

interface GemPinFormActionProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function GemPinFormAction({}: GemPinFormActionProps) {
  const { gemLngLat } = useGemLngLat((state) => state)
  const { formAction, setFormAction, resetFormState } = useCreateUpdateForm(
    (state) => state
  )
  const { resetGemLngLatState } = useGemLngLat((state) => state)

  function handleFormAction(payload: formAction) {
    setFormAction(payload)
  }

  return (
    <div className="flex flex-col gap-4 px-6 mt-2">
      {formAction === 'none' && (
        <>
          <Button
            variant="outline"
            size="lg"
            className="py-6 w-full"
            onClick={() => handleFormAction('create')}
          >
            <Plus /> Add New Pin
          </Button>

          <GemPinActionSelectGem />
        </>
      )}
      {formAction !== 'none' && (
        <div className="flex gap-4 w-full">
          <Button
            variant="outline"
            size="lg"
            className="py-6 flex-1 text-destructive"
            onClick={() => {
              resetGemLngLatState()
              resetFormState()
            }}
          >
            <Minus /> Close Pinner
          </Button>

          {formAction === 'update' && (
            <Button
              variant="outline"
              size="lg"
              className="py-6 flex-1"
              onClick={() => handleFormAction('create')}
            >
              <Plus /> Add New Pin
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
