import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { firstname, lastname, email, phone, address, city, country, birth_date, description } = req.body;

  try {
    const newPost = await prisma.me.create({
      data: {
        firstname,
        lastname,
        email,
        phone,
        address,
        city,
        country,
        birth_date,
        description,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
