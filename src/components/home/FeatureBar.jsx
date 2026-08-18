import { Box, Headset, ShieldCheck, Truck } from 'lucide-react'
import { features } from '../../data/content'

const ICONS = { truck: Truck, headset: Headset, shield: ShieldCheck, box: Box }

/** Trust bar under the hero: shipping, support, payment, guarantee. */
export default function FeatureBar({ className = '' }) {
  return (
    <section className={`container-x ${className}`}>
      <ul className="grid gap-2 rounded-lg border border-gray-50 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = ICONS[feature.icon]
          return (
            <li
              key={feature.title}
              className="group flex items-center gap-4 rounded-md p-4 transition-colors hover:bg-gray-50"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-surface text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon size={22} />
              </span>
              <span>
                <span className="block font-semibold text-gray-900">{feature.title}</span>
                <span className="block text-sm text-gray-500">{feature.text}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
