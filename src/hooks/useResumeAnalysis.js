import { useState, useEffect } from 'react'
import { pdfService } from '../services/pdfService'
import { aiService } from '../services/aiService'
import { buildPresenceChecklist } from '../../constants'
import constants from "../../constants"

/**
 * Hook personalisé pour gérer l'analyse de CV
 */