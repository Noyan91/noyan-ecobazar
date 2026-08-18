import { Minus, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function QuantityStepper({ value, onChange, min = 1, max = 99, size = 'md', className }) {
  const dimensions = size === 'sm' ? 'h-9 w-[104px] text-sm' : 'h-[46px] w-[130px]'
  const button =
    'grid h-7 w-7 place-items-center rounded-full text-gray-600 transition-colors hover:bg-white hover:text-primary disabled:opacity-40 disabled:hover:bg-transparent'

  return (
    <div className={cn('flex items-center justify-between rounded-full bg-gray-50 px-2', dimensions, className)}>
      <button
        type="button"
        className={button}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <input
        type="number"
        className="w-10 [appearance:textfield] bg-transparent text-center font-medium text-gray-900 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={value}
        min={min}
        max={max}
        onChange={(event) => {
          const next = Number(event.target.value)
          if (!Number.isNaN(next)) onChange(Math.min(max, Math.max(min, next)))
        }}
        aria-label="Quantity"
      />
      <button
        type="button"
        className={button}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
