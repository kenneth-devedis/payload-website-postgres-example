import { CollectionSlug, extractJWT, getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

type JWTToken = {
  collection: string
  id: string
}

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })
  const token = extractJWT({ headers: req.headers, payload })
  console.log(token)
  const secretKey = new TextEncoder().encode(payload.secret)
  const { payload: decodedPayload } = await jwtVerify<JWTToken>(token, secretKey)
  console.log(decodedPayload)
  const user = await payload.findByID({
    id: decodedPayload.id,
    collection: decodedPayload.collection as CollectionSlug,
    depth: 0
  })
  console.log(user)

  // if (user && (!collection.config.auth.verify || user._verified)) {
  //   user.collection = collection.config.slug
  //   user._strategy = strategyName
  //   return {
  //     user: user as User,
  //   }
  // } else {
  //   if (headers.get('DisableAutologin') !== 'true') {
  //     return await autoLogin({ isGraphQL, payload, strategyName })
  //   }
  //   return { user: null }
  // }
  // const result = await payload.auth({ headers: req.headers})
  return NextResponse.json(user, { status: 200 })
}
