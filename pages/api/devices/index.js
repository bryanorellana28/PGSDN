import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const devices = await prisma.device.findMany()
      return res.status(200).json(devices)
    } catch (err) {
      return res.status(500).json({ error: 'Error al obtener dispositivos' })
    } finally {
      await prisma.$disconnect()
    }
  }

  if (req.method === 'POST') {
    const data = req.body
    try {
      const device = await prisma.device.create({ data })
      return res.status(201).json(device)
    } catch (err) {
      return res.status(400).json({ error: 'Error al crear dispositivo' })
    } finally {
      await prisma.$disconnect()
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}
