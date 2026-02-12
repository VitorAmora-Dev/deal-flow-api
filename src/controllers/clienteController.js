const Cliente = require('../models/Cliente');

function calcularComissao(valorPotencial) {
  return valorPotencial * 0.05;
}

function validarDadosCliente(body) {
  const { nome, status, valorPotencial } = body;

  if (!nome || typeof nome !== 'string') {
    return 'O campo "nome" é obrigatório e deve ser uma string.';
  }

  if (!status || typeof status !== 'string') {
    return 'O campo "status" é obrigatório e deve ser uma string.';
  }

  const statusNormalizado = status.toLowerCase();
  if (!['lead', 'proposta', 'fechado'].includes(statusNormalizado)) {
    return 'O campo "status" deve ser um dos valores: lead, proposta ou fechado.';
  }

  if (valorPotencial === undefined || isNaN(Number(valorPotencial))) {
    return 'O campo "valorPotencial" é obrigatório e deve ser numérico.';
  }

  if (Number(valorPotencial) < 0) {
    return 'O campo "valorPotencial" não pode ser negativo.';
  }

  return null;
}

async function getAllClientes(req, res) {
  try {
    const clientes = await Cliente.findAll();
    return res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return res.status(500).json({ erro: 'Erro ao buscar clientes.' });
  }
}

async function getClienteById(req, res) {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }

    return res.json(cliente);
  } catch (error) {
    console.error('Erro ao buscar cliente por ID:', error);
    return res.status(500).json({ erro: 'Erro ao buscar cliente.' });
  }
}

async function createCliente(req, res) {
  try {
    const { nome, email, telefone, status, valorPotencial } = req.body;

    const erroValidacao = validarDadosCliente({ nome, status, valorPotencial });
    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }

    const valor = Number(valorPotencial);
    const statusNormalizado = status.toLowerCase();

    const comissao = calcularComissao(valor);

    const novoCliente = await Cliente.create({
      nome,
      email,
      telefone,
      status: statusNormalizado,
      valorPotencial: valor,
      comissao,
    });

    return res.status(201).json(novoCliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return res.status(500).json({ erro: 'Erro ao criar cliente.' });
  }
}

async function updateCliente(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, telefone, status, valorPotencial } = req.body;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }

    const dadosParaValidar = {
      nome: nome ?? cliente.nome,
      status: status ?? cliente.status,
      valorPotencial: valorPotencial ?? cliente.valorPotencial,
    };

    const erroValidacao = validarDadosCliente(dadosParaValidar);
    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }

    if (nome !== undefined) cliente.nome = nome;
    if (email !== undefined) cliente.email = email;
    if (telefone !== undefined) cliente.telefone = telefone;
    if (status !== undefined) cliente.status = status.toLowerCase();
    if (valorPotencial !== undefined) {
      const valor = Number(valorPotencial);
      cliente.valorPotencial = valor;
      cliente.comissao = calcularComissao(valor);
    }

    await cliente.save();

    return res.json(cliente);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    return res.status(500).json({ erro: 'Erro ao atualizar cliente.' });
  }
}

async function deleteCliente(req, res) {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }

    await cliente.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    return res.status(500).json({ erro: 'Erro ao deletar cliente.' });
  }
}

async function getRelatorio(req, res) {
  try {
    const clientes = await Cliente.findAll();

    let totalLeads = 0;
    let totalPropostas = 0;
    let totalFechados = 0;
    let valorTotalFechado = 0;
    let comissaoTotal = 0;

    for (const cliente of clientes) {
      const status = (cliente.status || '').toLowerCase();

      if (status === 'lead') {
        totalLeads += 1;
      } else if (status === 'proposta') {
        totalPropostas += 1;
      } else if (status === 'fechado') {
        totalFechados += 1;
        valorTotalFechado += cliente.valorPotencial || 0;
        comissaoTotal += cliente.comissao || 0;
      }
    }

    return res.json({
      totalLeads,
      totalPropostas,
      totalFechados,
      valorTotalFechado,
      comissaoTotal,
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    return res.status(500).json({ erro: 'Erro ao gerar relatório.' });
  }
}

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  getRelatorio,
};

