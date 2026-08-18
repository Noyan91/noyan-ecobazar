import { useStore } from '../../context/StoreContext'
import Modal from '../ui/Modal'
import ProductGallery from './ProductGallery'
import ProductSummary from './ProductSummary'

/** Opened from the eye icon on any product card. */
export default function QuickView() {
  const { quickView, setQuickView } = useStore()

  return (
    <Modal open={Boolean(quickView)} onClose={() => setQuickView(null)} className="max-w-5xl">
      {quickView && (
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
          <ProductGallery product={quickView} />
          <ProductSummary product={quickView} compact />
        </div>
      )}
    </Modal>
  )
}
