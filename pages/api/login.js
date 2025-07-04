import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan datos' })
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' })
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(400).json({ error: 'Credenciales inválidas' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: 'Error en el servidor' })
  } finally {
    await prisma.$disconnect()
  }
}
