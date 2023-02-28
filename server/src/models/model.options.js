const modelOptions = {
  toJSON: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id
      return obj
    },
  },
  toObejct: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id
      return obj
    },
  },
  versionKey: false,
  timeStamp: true,
}

export default modelOptions
