import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
  if (!name) return res.status(400).json({ message: 'Nome é obrigatório.' });
  if (!email) return res.status(400).json({ message: 'E-mail é obrigatório.' });
  if (!password) return res.status(400).json({ message: 'Senha é obrigatória.' });
}


  try {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(newUser);

    return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    return res.status(400).json({ message: 'Credenciais inválidas.' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Credenciais inválidas.' });
  }

  const token = jwt.sign(
    { id: user.id }, 
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  return res.status(200).json({
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email
  }
});

};


export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "As senhas não coincidem." });
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await userRepository.save(user);

    return res.status(200).json({ message: "Senha atualizada com sucesso." });
  } catch {
    return res.status(500).json({ message: "Erro ao atualizar a senha." });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const userId = (req.user as any).id;

    const user = await userRepository.findOne({
      where: { id: userId },
      select: ['id', 'name', 'email'], 
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return res.status(500).json({ message: 'Erro interno ao buscar perfil' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, surname, email, password } = req.body;
  const userId = (req.user as any).id;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  user.name = name || user.name;
  user.surname = surname || user.surname;
  user.email = email || user.email;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await userRepository.save(user);

  return res.status(200).json({ message: 'Perfil atualizado com sucesso.' });
};
