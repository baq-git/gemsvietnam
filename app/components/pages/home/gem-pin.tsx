import GemPinForm from './gem-pin-form'
import GemMap from './gem-map'
import GemPinAction from './gem-pin-action'
import { useCreateUpdateForm } from '@/stores/home/form.store'

interface GemPinProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function GemPin({}: GemPinProps) {
  const { formAction } = useCreateUpdateForm((state) => state)
  return (
    <div className="flex">
      <div className="w-[25vw] overflow-y-auto border-r bg-background shadow-lg">
        <GemPinAction />
        {formAction !== 'none' && <GemPinForm />}
      </div>
      <GemMap />
    </div>
  )
}
