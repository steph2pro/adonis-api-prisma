import type { HttpContext } from '@adonisjs/core/http'

import prisma from '../../services/PrismaClient.js'

export default class BookController {
  // Lister tous les livres
  public async index({ response }: HttpContext) {
    const books = await prisma.book.findMany({
      include: {
        author: true,
        categories: true,
      },
    })
    return response.json(books)
  }

  // Créer un nouveau livre
  public async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'description', 'authorId', 'categories'])
    const book = await prisma.book.create({
      data: {
        title: data.title,
        description: data.description,
        authorId: data.authorId,
        categories: {
          connect: data.categories.map((categoryId: number) => ({ id: categoryId })),
        },
      },
    })
    return response.status(201).json({messages:'Book created successufly!'})
  }

  // Afficher un livre spécifique
  public async show({ params, response }: HttpContext) {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        author: true,
        categories: true,
      },
    })
    if (!book) {
      return response.status(404).json({ message: 'Book not found' })
    }
    return response.json(book)
  }

  // Mettre à jour un livre
  public async update({ params, request, response }: HttpContext) {
    const data = request.only(['title', 'description', 'authorId', 'categories'])
    const book = await prisma.book.update({
      where: { id: parseInt(params.id) },
      data: {
        title: data.title,
        description: data.description,
        authorId: data.authorId,
        categories: {
          set: data.categories.map((categoryId: number) => ({ id: categoryId })),
        },
      },
    })
    return response.json({messages:'Book update successufly!'})
  }

  // Supprimer un livre
  public async destroy({ params, response }: HttpContext) {
    await prisma.book.delete({
      where: { id: parseInt(params.id) },
    })
    return response.status(201).json({messages:'book deleted'})
  }
}
