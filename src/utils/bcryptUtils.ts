import bcrypt from 'bcrypt'

export async function hashText(text: string): Promise<string> {
  const saltOrRounds: number = 10
  return bcrypt.hash(text, saltOrRounds)
}
