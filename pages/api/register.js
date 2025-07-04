import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Faltan datos' })
  }
  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(400).json({ error: 'El correo ya existe' })
    }
    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.create({ data: { name, email, password: hashed } })
    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: 'Error en el servidor' })
  } finally {
    await prisma.$disconnect()
  }
}
