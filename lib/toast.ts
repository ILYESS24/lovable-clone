import { toast } from 'sonner'

export function showError(error: Error | string) {
  const message = typeof error === 'string' ? error : error.message
  toast.error(message)
}

export function showSuccess(message: string) {
  toast.success(message)
}

export function showInfo(message: string) {
  toast.info(message)
}
