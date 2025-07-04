import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const id = parseInt(req.query.id)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' })
  }

  if (req.method === 'PUT') {
    const data = req.body
    try {
      const device = await prisma.device.update({ where: { id }, data })
      return res.status(200).json(device)
    } catch (err) {
      return res.status(400).json({ error: 'Error al actualizar dispositivo' })
    } finally {
      await prisma.$disconnect()
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.device.delete({ where: { id } })
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ error: 'Error al eliminar dispositivo' })
    } finally {
      await prisma.$disconnect()
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}
