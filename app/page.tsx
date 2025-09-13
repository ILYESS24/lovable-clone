import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirect to the main app interface
  redirect('/apps')
}
