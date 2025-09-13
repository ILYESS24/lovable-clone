import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { apps } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { initializeDatabase } from '@/lib/db'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    initializeDatabase()
    
    const appId = parseInt(params.id)
    if (isNaN(appId)) {
      return NextResponse.json({ error: 'Invalid app ID' }, { status: 400 })
    }

    const app = await db.query.apps.findFirst({
      where: eq(apps.id, appId),
    })

    if (!app) {
      return NextResponse.json({ error: 'App not found' }, { status: 404 })
    }

    return NextResponse.json(app)
  } catch (error) {
    console.error('Error fetching app:', error)
    return NextResponse.json({ error: 'Failed to fetch app' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    initializeDatabase()
    
    const appId = parseInt(params.id)
    if (isNaN(appId)) {
      return NextResponse.json({ error: 'Invalid app ID' }, { status: 400 })
    }

    await db.delete(apps).where(eq(apps.id, appId))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting app:', error)
    return NextResponse.json({ error: 'Failed to delete app' }, { status: 500 })
  }
}
