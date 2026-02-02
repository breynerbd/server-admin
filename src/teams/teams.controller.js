'use strict';

import Team from './teams.model.js';

export const getTeams = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };

    const teams = await Team.find(filter)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .sort(options.sort);

    const total = await Team.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: teams,
      pagination: {
        currentPage: options.page,
        totalPages: Math.ceil(total / options.limit),
        totalRecords: total,
        limit: options.limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los equipos',
      error: error.message,
    });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Equipo no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el equipo',
      error: error.message,
    });
  }
};

export const createTeam = async (req, res) => {
  try {
    const teamData = req.body;

    const team = new Team(teamData);

    await team.save();

    res.status(201).json({
      success: true,
      message: 'Equipo creado exitosamente',
      data: team,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el equipo',
      error: error.message,
    });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const team = await Team.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Equipo no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Equipo actualizado exitosamente',
      data: team,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el equipo',
      error: error.message,
    });
  }
};

export const changeTeamStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const isActive = req.url.includes('/activate');

    const action = isActive ? 'activado' : 'desactivado';

    const team = await Team.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Equipo no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Equipo ${action} exitosamente`,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar el estado del equipo',
      error: error.message,
    });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findByIdAndDelete(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Equipo no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Equipo eliminado exitosamente',
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el equipo',
      error: error.message,
    });
  }
};
