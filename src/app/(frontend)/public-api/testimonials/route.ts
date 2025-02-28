import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET({ headers }: NextRequest) {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })
  return NextResponse.json(user, { status: 200 })
}
