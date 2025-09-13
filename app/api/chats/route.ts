import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { initializeDatabase } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    initializeDatabase()
    
    const { searchParams } = new URL(request.url)
    const appId = searchParams.get('appId')

    let query = db.query.chats.findMany({
      orderBy: [desc(chats.createdAt)],
    })

    if (appId) {
      const appIdNum = parseInt(appId)
      if (!isNaN(appIdNum)) {
        query = db.query.chats.findMany({
          where: eq(chats.appId, appIdNum),
          orderBy: [desc(chats.createdAt)],
        })
      }
    }

    const chatsList = await query

    return NextResponse.json(chatsList)
  } catch (error) {
    console.error('Error fetching chats:', error)
    return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    initializeDatabase()
    
    const body = await request.json()
    const { appId } = body

    if (!appId) {
      return NextResponse.json({ error: 'App ID is required' }, { status: 400 })
    }

    const [newChat] = await db.insert(chats).values({
      appId: parseInt(appId),
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning()

    return NextResponse.json(newChat.id)
  } catch (error) {
    console.error('Error creating chat:', error)
    return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 })
  }
}
