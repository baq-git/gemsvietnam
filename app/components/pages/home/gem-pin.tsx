import GemPinForm from './gem-pin-form'
import GemMap from './gem-map'

interface GemPinProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function GemPin({}: GemPinProps) {
  return (
    <div className="flex">
      <GemPinForm />
      <GemMap />
    </div>
  )
}
