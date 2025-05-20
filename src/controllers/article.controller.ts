import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Article } from '../entities/Article';
import { User } from '../entities/User';

export const createArticle = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const userId = (req.user as any).userId;

  try {
    const articleRepository = AppDataSource.getRepository(Article);
    const userRepository = AppDataSource.getRepository(User);

    const author = await userRepository.findOneBy({ id: userId });
    if (!author) return res.status(404).json({ message: 'Autor não encontrado.' });

    const article = articleRepository.create({
      title,
      content,
      coverImage: req.file?.filename || undefined,
      author,
    });

    await articleRepository.save(article);
    return res.status(201).json(article);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar artigo.' });
  }
};

export const listArticles = async (_: Request, res: Response) => {
  try {
    const articles = await AppDataSource.getRepository(Article).find({
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar artigos.' });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = (req.user as any).userId;

  try {
    const articleRepository = AppDataSource.getRepository(Article);
    const article = await articleRepository.findOne({
      where: { id: Number(id) },
      relations: ['author'],
    });

    if (!article) return res.status(404).json({ message: 'Artigo não encontrado.' });
    if (article.author.id !== userId) return res.status(403).json({ message: 'Acesso negado.' });

    article.title = title || article.title;
    article.content = content || article.content;
    if (req.file?.filename) article.coverImage = req.file.filename;

    await articleRepository.save(article);
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar artigo.' });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req.user as any).userId;

  try {
    const articleRepository = AppDataSource.getRepository(Article);
    const article = await articleRepository.findOne({
      where: { id: Number(id) },
      relations: ['author'],
    });

    if (!article) return res.status(404).json({ message: 'Artigo não encontrado.' });
    if (article.author.id !== userId) return res.status(403).json({ message: 'Acesso negado.' });

    await articleRepository.remove(article);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao excluir artigo.' });
  }
};
