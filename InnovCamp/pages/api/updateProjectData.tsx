import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id, newProjectData } = req.body;

  try {
    const updatedProjectData = await prisma.project.update({
      where: {
        id: Number(id),
      },
      data: newProjectData,
    });

    res.status(200).json(updatedProjectData);
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
