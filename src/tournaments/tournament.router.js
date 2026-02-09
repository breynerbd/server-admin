'use strict';

import { Router } from 'express';
import {
    getTournaments,
    getTournamentById,
    createTournament,
    updateTournament,
    changeTournamentStatus,
    deleteTournament
} from './tournament.controller.js';

const router = Router();

router.get(
    '/',
    getTournaments
);

router.get(
    '/:id',
    getTournamentById
);

router.post(
    '/',
    createTournament
);

router.put(
    '/:id',
    updateTournament
);

router.put(
    '/:id/activate',
    changeTournamentStatus
);

router.put(
    '/:id/deactivate',
    changeTournamentStatus
);

router.delete(
    '/:id',
    deleteTournament
);

export default router;
