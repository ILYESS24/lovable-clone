import { toast as sonnerToast } from 'sonner';

export function showError(message: string) {
  sonnerToast.error(message);
}

export function showSuccess(message: string) {
  sonnerToast.success(message);
}

export function showInfo(message: string) {
  sonnerToast.info(message);
}

export function showWarning(message: string) {
  sonnerToast.warning(message);
}

export function showExtraFilesToast() {
  sonnerToast.info('Fichiers supplémentaires ajoutés');
}