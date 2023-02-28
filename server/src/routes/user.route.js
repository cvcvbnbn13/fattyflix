import express from 'express'
import { body } from 'express-validator'
import favoriteController from '../controllers/favorite.controller.js'
import userController from '../controllers/user.controller.js'
import requestHandler from '../handlers/request.handler.js'
import userModel from '../models/user.model.js'
import tokenMiddleware from '../middlewares/token.middleware.js'

const router = express.Router()

router.post(
  '/signup',
  body('username')
    .exists()
    .withMessage('請輸入使用者名稱')
    .isLength({ min: 8 })
    .withMessage('長度不得少於8字')
    .custom(async value => {
      const user = await userModel.findOne({ username: value })
      if (user) return Promise.reject('此使用者名稱已被使用')
    }),
  body('password')
    .exists()
    .withMessage('請輸入密碼')
    .isLength({ min: 8 })
    .withMessage('長度不得少於8字'),

  body('confirmPassword')
    .exists()
    .withMessage('請確認密碼')
    .isLength({ min: 8 })
    .withMessage('長度不得少於8字')
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('確認密碼並不相符')
      return true
    }),

  body('displayName')
    .exists()
    .withMessage('請輸入使用者暱稱')
    .isLength({ min: 2 })
    .withMessage('長度不得少於2字'),
  requestHandler.validate,
  userController.signup
)

router.post(
  '/signin',
  body('username')
    .exists()
    .withMessage('請輸入使用者名稱')
    .isLength({ min: 8 })
    .withMessage('長度不得少於8字'),

  body('password')
    .exists()
    .withMessage('請輸入密碼')
    .isLength({ min: 8 })
    .withMessage('長度不得少於8字'),
  requestHandler.validate,
  userController.signIn
)

router.put(
  '/update-password',
  tokenMiddleware.auth,
  body('password')
    .exists()
    .withMessage('請輸入密碼')
    .isLength({ min: 8 })
    .withMessage('長度不得少於8字'),

  body('newPassword')
    .exists()
    .withMessage('請輸入新密碼')
    .isLength({ min: 8 })
    .withMessage('長度不得少於8字'),

  body('confirmNewPassword')
    .exists()
    .withMessage('請確認新密碼')
    .isLength({ min: 8 })
    .withMessage('長度不得少於8字')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) throw new Error('確認新密碼並不相符')
      return true
    }),
  requestHandler.validate,
  userController.updatePassword
)

router.get('/info', tokenMiddleware.auth, userController.getInfo)

router.get(
  '/favorites',
  tokenMiddleware.auth,
  favoriteController.getFavoritesOfUser
)

router.post(
  '/favorites',
  tokenMiddleware.auth,
  body('mediaType')
    .exists()
    .withMessage('mediaType is required')
    .custom(type => ['movie', 'tv'].includes(type.toLowerCase()))
    .withMessage('mediaType invalid'),
  body('mediaId')
    .exists()
    .withMessage('mediaId is required')
    .isLength({ min: 1 })
    .withMessage('mediaId can not be empty'),
  body('mediaTitle').exists().withMessage('mediaTitle is required'),
  body('mediaPoster').exists().withMessage('mediaPoster is required'),
  body('mediaRate').exists().withMessage('mediaRate is required'),

  requestHandler.validate,

  favoriteController.addFavorite
)

router.delete(
  '/favorites/:favoriteId',
  tokenMiddleware.auth,
  favoriteController.removeFavorite
)

export default router
