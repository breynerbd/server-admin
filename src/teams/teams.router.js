import { Router } from 'express';
import {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  changeTeamStatus,
  deleteTeam,
} from './teams.controller.js';

import {
  validateCreateTeam,
  validateUpdateTeamRequest,
  validateTeamStatusChange,
  validateGetTeamById,
} from '../../middlewares/teams-validators.js';

const router = Router();

router.get('/', getTeams);

router.get('/:id', validateGetTeamById, getTeamById);

router.post('/', validateCreateTeam, createTeam);

router.put('/:id', validateUpdateTeamRequest, updateTeam);

router.put('/:id/activate', validateTeamStatusChange, changeTeamStatus);

router.put('/:id/deactivate', validateTeamStatusChange, changeTeamStatus);

router.delete('/:id', validateGetTeamById, deleteTeam);

export default router;
