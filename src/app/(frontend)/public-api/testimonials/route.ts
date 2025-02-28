import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST() {
  const payload = await getPayload({ config: configPromise })
}
