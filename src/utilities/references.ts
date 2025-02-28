export type Ref<T extends object = {}> = string | T

export function isRefObject<T extends object = {}>(subject: Ref<T>): subject is T {
  return typeof subject !== 'string'
}

export function assertRefObject<T extends object = {}>(
  subject: Ref<T> | null | undefined,
): T | null | undefined {
  if (typeof subject === 'string') {
    throw new Error('Reference is not resolved')
  }
  return subject
}
