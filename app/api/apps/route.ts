import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { apps } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { initializeDatabase } from '@/lib/db'

export async function GET() {
  try {
    initializeDatabase()
    
    const appsList = await db.query.apps.findMany({
      orderBy: [desc(apps.createdAt)],
    })

    return NextResponse.json({ apps: appsList, appBasePath: '/apps' })
  } catch (error) {
    console.error('Error fetching apps:', error)
    return NextResponse.json({ error: 'Failed to fetch apps' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    initializeDatabase()
    
    const body = await request.json()
    const { name, templateId } = body

    if (!name) {
      return NextResponse.json({ error: 'App name is required' }, { status: 400 })
    }

    // Create new app
    const [newApp] = await db.insert(apps).values({
      name,
      path: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      templateId: templateId || 'default',
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning()

    return NextResponse.json({ app: newApp })
  } catch (error) {
    console.error('Error creating app:', error)
    return NextResponse.json({ error: 'Failed to create app' }, { status: 500 })
  }
}
