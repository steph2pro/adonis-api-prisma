import type { HttpContext } from '@adonisjs/core/http'

import prisma from '../../services/PrismaClient.js'

export default class CategoryController {
  // Lister toutes les catégories
  public async index({ response }: HttpContext) {
    const categories = await prisma.category.findMany({
      include: {
        books: true,
      },
    })
    return response.json(categories)
  }

  // Créer une nouvelle catégorie
  public async store({ request, response }: HttpContext) {
    const data = request.only(['name'])
    const category = await prisma.category.create({
      data: {
        name: data.name,
      },
    })
    return response.status(201).json({messages:'Category created successufly!'})
  }

  // Afficher une catégorie spécifique
  public async show({ params, response }: HttpContext) {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        books: true,
      },
    })
    if (!category) {
      return response.status(404).json({ message: 'Category not found' })
    }
    return response.json(category)
  }

  // Mettre à jour une catégorie
  public async update({ params, request, response }: HttpContext) {
    const data = request.only(['name'])
    const category = await prisma.category.update({
      where: { id: parseInt(params.id) },
      data: {
        name: data.name,
      },
    })
    return response.json({messages:'Category update successufly!'})
  }

  // Supprimer une catégorie
  public async destroy({ params, response }: HttpContext) {
    await prisma.category.delete({
      where: { id: parseInt(params.id) },
    })
    return response.status(201).json({messages:'Category deleted'})
  }
}
