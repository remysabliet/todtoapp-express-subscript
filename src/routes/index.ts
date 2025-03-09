import { Router } from 'express'

import { userRoutes } from '@/routes/userRoutes'
import { projectRoutes } from '@/routes/projectRoutes'
import { taskRoutes } from '@/routes/taskRoutes'

export const apiRouter = Router()

apiRouter.use('/users', userRoutes)
apiRouter.use('/projects', projectRoutes)
apiRouter.use('/tasks', taskRoutes)