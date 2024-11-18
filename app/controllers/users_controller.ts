import type { HttpContext } from '@adonisjs/core/http'
import prisma from '../../services/PrismaClient.js'

import { UserValidator } from '../validators/user.js';
export default class UsersController {
  public async index({ response }: HttpContext) {
    const users = await prisma.user.findMany({ include: { books: true } });
    return response.json(users);
  }

  public async store({ request, response }: HttpContext) {
    // Valider les données entrantes en utilisant un validateur AdonisJS
    const data = await UserValidator.validate(request.only(['name', 'email']));

    // Créer un nouvel utilisateur avec Prisma
    const user = await prisma.user.create({
      data, // Passer les données sous la clé `data`
    });

    // Retourner la réponse avec un statut 201
    return response.status(201).json({ message: 'User Created!', user });
  }


  public async show({ params, response }: HttpContext) {
    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
      include: { books: true },
    });
    if (user) {
      return response.json(user);
    }
    return response.notFound({ message: 'User not found' });
  }

  public async update({ params, request, response }: HttpContext) {
    const data = request.only(['name', 'email']);
      await prisma.user.update({
      where: { id: Number(params.id) },
      data,
    });
    return response.json({messages:'User update successufly!'});
  }

  public async destroy({ params, response }: HttpContext) {
    await prisma.user.delete({ where: { id: Number(params.id) } });
    return response.status(201).json({messages:'User deleted'});
  }
}
