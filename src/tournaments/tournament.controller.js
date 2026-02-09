'use strict';

import Tournament from './tournament.model.js';

export const getTournaments = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;

        const filter = { isActive };

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 },
        };

        const tournaments = await Tournament.find(filter)
            .limit(options.limit)
            .skip((options.page - 1) * options.limit)
            .sort(options.sort);

        const total = await Tournament.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: tournaments,
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
            message: 'Error al obtener los torneos',
            error: error.message,
        });
    }
};

export const getTournamentById = async (req, res) => {
    try {
        const { id } = req.params;

        const tournament = await Tournament.findById(id);

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: 'Torneo no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            data: tournament,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el torneo',
            error: error.message,
        });
    }
};

export const createTournament = async (req, res) => {
    try {
        const tournamentData = req.body;

        const tournament = new Tournament(tournamentData);

        await tournament.save();

        res.status(201).json({
            success: true,
            message: 'Torneo creado exitosamente',
            data: tournament,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el torneo',
            error: error.message,
        });
    }
};

export const updateTournament = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const tournament = await Tournament.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: 'Torneo no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Torneo actualizado exitosamente',
            data: tournament,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el torneo',
            error: error.message,
        });
    }
};

export const changeTournamentStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const isActive = req.url.includes('/activate');

        const action = isActive ? 'activado' : 'desactivado';

        const tournament = await Tournament.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: 'Torneo no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: `Torneo ${action} exitosamente`,
            data: tournament,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado del torneo',
            error: error.message,
        });
    }
};

export const deleteTournament = async (req, res) => {
    try {
        const { id } = req.params;

        const tournament = await Tournament.findByIdAndDelete(id);

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: 'Torneo no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Torneo eliminado exitosamente',
            data: tournament,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el torneo',
            error: error.message,
        });
    }
};
