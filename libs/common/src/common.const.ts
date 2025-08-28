export const BCE_HEADER_UID = 'x-bce-uid'
export const MAX_NUMBER_DECIMALS = 18
export const CURRENCY_MAX_LENGTH = 36
export const GRPC_RETRY_DELAY_TIME = 2000
export const GRPC_RETRY_NUMBER = 3
export const FIVE_MINUTES_MS = 300000 // 5 minutes in milliseconds
export const FIVE_MINUTES_S = 300 // 5 minutes in seconds
export const HOUR_MS = 3600000 // 1 hour milliseconds
export const HOUR_S = 3600 // 1 hour seconds
export const DAY_MS = HOUR_MS * 24 // 1 day in milliseconds
export const DAY_S = HOUR_S * 24 // 1 day in seconds
export const WEEK_MS = DAY_MS * 7 // 7 days in milliseconds
export const WEEK_S = DAY_S * 7 // 7 days in seconds
export const THIRTY_DAYS_MS = DAY_MS * 30 // 30 days in milliseconds
export const THIRTY_DAYS_S = DAY_S * 30 // 30 days in seconds

export const SECURITY_PARKING_DB = 'SECURITY_PARKING_DB'

export const VALIDATION_ERROR = {
  code: '1000',
  message: 'VALIDATION_ERROR',
}

export const DATABASE_ERROR = {
  code: '3000',
  message: 'DATABASE_ERROR',
}

export const COMMON_ERRORS = {
  DB_DEADLOCK: {
    code: '1001',
    message: 'DB_DEADLOCK',
  },
  INTERNAL_SERVER_ERROR: {
    code: '1002',
    message: 'INTERNAL_SERVER_ERROR',
  },
}

export const TOKEN_ERROR = {
  ACCESS_DENIED: { code: 42001, message: 'TOKEN.ACCESS_DENIED' },
  INVALID: { code: 42002, message: 'TOKEN.INVALID' },
  EXPIRED: { code: 42003, message: 'TOKEN.EXPIRED' },
}

export const VALIDATION_ERRORS = {
  IS_NOT_ZERO_NUMBER_STRING: '$property_IS_NOT_ZERO_NUMBER_STRING',
  IS_NEGATIVE_NUMBER_STRING: '$property_IS_NEGATIVE_NUMBER_STRING',
  IS_POSITIVE_NUMBER_STRING: '$property_IS_POSITIVE_NUMBER_STRING',
  IS_GTE_ZERO_NUMBER_STRING: '$property_IS_GTE_ZERO_NUMBER_STRING',
  IS_ENUM: '$property_IS_ENUM',
  IS_NUMBER: '$property_IS_NUMBER',
  IS_NUMBER_STRING: '$property_IS_NUMBER_STRING',
  IS_BOOLEAN: '$property_IS_BOOLEAN',
  IS_DECIMAL: '$property_IS_DECIMAL_' + MAX_NUMBER_DECIMALS,

  IS_INVALID: '$property_IS_INVALID',
  IS_ALPHANUMERIC: '$property_IS_ALPHANUMERIC',
  MAX_LENGTH: '$property_MAX_LENGTH_$constraint1',
  IS_REQUIRED: '$property_IS_REQUIRED',
  IS_STRING: '$property_IS_STRING',
}

export enum RAW_DATA_STATUS {
  NEW = 1,
  PROCESSING = 2,
  DONE = 3,
}

export enum VEHICLE_TICKET_STATUS {
  NEW = 1,
  USING = 2,
  CLOSED = 3,
  DISABLED = 4,
}

export enum VEHICLE_TICKET_STATUS_TEXT {
  NEW = 'Tạo mới',
  USING = 'Đang giao',
  CLOSED = 'Đóng',
  DISABLED = 'Ngừng hoạt động',
}
