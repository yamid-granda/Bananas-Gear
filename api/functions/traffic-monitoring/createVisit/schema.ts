export default {
  type: 'object',
  required: ['path', 'width', 'height'],
  properties: {
    path: {
      type: 'string',
      minLength: 1,
      maxLength: 500,
    },
    width: {
      type: 'number',
      minLength: 1,
      maxLength: 10000,
    },
    height: {
      type: 'number',
      minLength: 1,
      maxLength: 10000,
    },
  },
} as const
