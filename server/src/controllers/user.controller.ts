import {Response, Request, NextFunction} from 'express'
import AsyncCatch from '@utils/asyncCatch'
import ErrorHandler from '@utils/errorHandler'
import {
  getAllUser,
  updateUser as updateUserService,
} from '@services/user.service'
import {Types} from 'mongoose'

const filterObj = (obj: {[x: string]: string}, ...allowedFields: string[]) => {
  const newObj: {[x: string]: string} = {}
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}

export const getAllUsers = AsyncCatch(async (_: Request, res: Response) => {
  const users = await getAllUser({})
  console.log(users)
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users?.length,
    data: {
      users,
    },
  })
})

export const getUser = AsyncCatch(async (response: Response) => {
  //TODO: get user by id
  // const user = await getAllUser({_id: Types.ObjectId(response.params.id)})
  response.status(500).json({
    message: 'failed',
    result: '<route not define yeat>',
  })
})

export const updateUser = AsyncCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.body
    // 1) Create error if user send password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new ErrorHandler({
          message:
            'This route is not for password updates. Please use /update-password.',
          statusCode: 400,
        }),
      )
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email')

    // 3) Update user document
    const updatedUser = await updateUserService(
      id as Types.ObjectId,
      filteredBody,
      {
        new: true,
        runValidators: true,
      },
    )

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    })
  },
)

export const createUser = AsyncCatch(async (req: Request, res: Response) => {
  // add logic here
})
