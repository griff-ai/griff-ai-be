import {
  INestApplicationContext,
  InjectionToken,
  Logger,
  LogLevel,
} from '@nestjs/common'
import { NestContainer } from '@nestjs/core'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { ValidationError } from 'class-validator'
import { createHash, randomInt } from 'crypto'
import { Request } from 'express'
import * as fs from 'fs'
import { Pagination } from 'nestjs-typeorm-paginate'
import { join } from 'path'
import { LoggerOptions } from 'typeorm'
import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions'
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions'

import { IRetryOptions } from './common.type'
import { APP_LOGGING_LEVEL } from './enums'

export function flattenErrors(
  validationErrors: ValidationError[],
  prefix = '',
): Record<string, string> {
  return validationErrors.reduce((acc, { property, constraints, children }) => {
    property = prefix ? prefix + '.' + property : property
    if (constraints) {
      acc = { ...acc, [property]: Object.values(constraints)[0] }
    }
    if (children && children.length) {
      acc = { ...acc, ...flattenErrors(children, property) }
    }
    return acc
  }, {})
}

export function randomString(
  length = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
) {
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export function randomNumberString(length = 10, characters = '0123456789') {
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export function formatSortType(sortType: string) {
  if (!sortType) return 'ASC'
  sortType = sortType.toUpperCase()
  return (['ASC', 'DESC'].includes(sortType) ? sortType : 'ASC') as any
}

export async function formatPaginate<T, CastClass = T>(
  paginateFunction: Promise<Pagination<T>>,
  itemClass?: ClassConstructor<CastClass>,
) {
  const result = await paginateFunction
  return {
    data: itemClass
      ? result.items.map((item: any) => plainToInstance(itemClass, item))
      : result.items,
    pagination: {
      page: result.meta.currentPage,
      limit: result.meta.itemsPerPage,
      total: result.meta.totalItems,
    },
  }
}

export function getEnumNames(e: Record<string, string | number>): string[] {
  return Object.keys(e).filter((key) => isNaN(parseInt(key)))
}

export function getEnumValues(e: Record<string, string | number>) {
  const keys = Object.keys(e).filter((key) => isNaN(parseInt(key)))
  return keys.map((key) => e[key])
}

export function getEnumComment(
  targetEnum: Record<string, string | number>,
): string {
  return getEnumValues(targetEnum)
    .map((val) => `${val} - ${targetEnum[val as string]}`)
    .join(', ')
}

export function arrayUnique(arr: Array<any>) {
  return [...new Set(arr)]
}

export function escapeLikeChars(str: string) {
  return str.replace(/%/g, '\\%').replace(/_/g, '\\_')
}

export function maskEmail(email: string) {
  return email.replace(
    /^(.)(.*)(.@.*)$/,
    (_, a, b, c) => a + b.replace(/./g, '*') + c,
  )
}

export function compareCaseInsensitive(str1: string, str2: string) {
  return (str1 || '').trim().toLowerCase() == (str2 || '').trim().toLowerCase()
}

export function shuffleArray(array: any[]) {
  if (!array) return []
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export function currentUnixTime() {
  return Math.round(new Date().getTime() / 1000)
}

export function currentMillisecond() {
  return new Date().getTime()
}

export function getRealIp(req: Request) {
  const ip = req.header('x-real-ip') || ''
  if (!ip) {
    const logger = new Logger('Helper')
    logger.warn('Can not get IP from request')
  }
  return ip
}

export function maskString(str: string) {
  if (!str) return str
  if (str.length <= 6) return str.replace(/./g, '*')
  return str.slice(0, 3) + '***' + str.slice(-3)
}

export function maskObject(obj: any, keysToMask: string[]) {
  if (typeof obj != 'object' || !obj) return obj
  const clone = { ...obj }
  Object.entries(clone).forEach(([key, value]) => {
    if (typeof value == 'string' && keysToMask.includes(key)) {
      clone[key] = maskString(value)
    }
    if (typeof value == 'object') {
      clone[key] = maskObject(value, keysToMask)
    }
  })
  return clone
}

export function touchFile(filePath: string) {
  const time = new Date()
  try {
    fs.utimesSync(filePath, time, time)
  } catch (err) {
    fs.closeSync(fs.openSync(filePath, 'w'))
  }
}

export function getAllControllers(app: INestApplicationContext) {
  const container = (app as any).container as NestContainer
  const modules = container.getModules()
  const result: InjectionToken[] = []
  modules.forEach((module) => {
    const controllers = module.controllers
    controllers.forEach((controller, type) => {
      result.push(type)
    })
  })
  return result
}

export function stripNull(object: any) {
  if (!object || typeof object !== 'object' || object instanceof Date) {
    return object
  }
  Object.entries(object).forEach(([key, value]) => {
    if (value == null) delete object[key]
    else object[key] = stripNull(value)
  })
  return object
}

export function getLoggingAppByLevel(level: APP_LOGGING_LEVEL): LogLevel[] {
  switch (level) {
    case APP_LOGGING_LEVEL.OFF:
      return []
    case APP_LOGGING_LEVEL.FATAL:
    case APP_LOGGING_LEVEL.ERROR:
      return ['error']
    case APP_LOGGING_LEVEL.WARN:
    case APP_LOGGING_LEVEL.INFO:
      return ['error', 'warn', 'log']
    case APP_LOGGING_LEVEL.DEBUG:
      return ['error', 'warn', 'log', 'debug']
    case APP_LOGGING_LEVEL.TRACE:
      return ['error', 'warn', 'log', 'debug', 'verbose']
    case APP_LOGGING_LEVEL.ALL:
      return ['error', 'warn', 'log', 'debug', 'verbose']
    default:
      return ['error', 'warn', 'log', 'debug']
  }
}

export function getLoggingDatabaseByLevel(
  level: APP_LOGGING_LEVEL,
): LoggerOptions {
  switch (level) {
    case APP_LOGGING_LEVEL.OFF:
      return []
    case APP_LOGGING_LEVEL.FATAL:
    case APP_LOGGING_LEVEL.ERROR:
      return ['error']
    case APP_LOGGING_LEVEL.WARN:
      return ['error', 'warn']
    case APP_LOGGING_LEVEL.INFO:
    case APP_LOGGING_LEVEL.DEBUG:
      return ['error', 'warn', 'info']
    case APP_LOGGING_LEVEL.TRACE:
      return ['error', 'warn', 'info', 'query']
    case APP_LOGGING_LEVEL.ALL:
      return 'all'
    default:
      return ['error', 'warn', 'info']
  }
}

export function getPortgresSlavesOptions(
  config: PostgresConnectionCredentialsOptions,
): PostgresConnectionCredentialsOptions[] {
  if (!config.host.includes(',')) return [config]
  const hosts = config.host.split(',')
  return hosts.map((host) => ({ ...config, host }))
}

export function getMysqlSlavesOptions(
  config: MysqlConnectionCredentialsOptions,
): MysqlConnectionCredentialsOptions[] {
  if (!config.host.includes(',')) return [config]
  const hosts = config.host.split(',')
  return hosts.map((host) => ({ ...config, host }))
}

export function camelToUnderscore(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1')
  return result.split(' ').join('_').toLowerCase()
}

export function formatErrorMessage(text: string) {
  return text.toLocaleUpperCase().replace(/ /g, '_').replace(/\.|,$/g, '')
}

export function isUpperCase(string: any) {
  return /^[A-Z0-9 ]+$/.test(string)
}

export function formatRpcErrorMessage(message: string) {
  const messageSplit = String(message).split('_')
  if (isUpperCase(messageSplit[0])) {
    return String(message).toLocaleUpperCase()
  }
  return `${camelToUnderscore(messageSplit[0])}${String(message).replace(
    messageSplit[0],
    '',
  )}`.toLocaleUpperCase()
}
export function formatRpcErrorMessages(message: string) {
  const errorObject = message.split(' ')

  if (errorObject.length <= 1) return formatRpcErrorMessage(message)
  const errorCode = errorObject[0]

  const messageSplit = String(errorObject[1]).split(',')
  if (messageSplit && messageSplit.length > 0) {
    const messageArray = []
    for (const messageItem of messageSplit) {
      messageArray.push(formatRpcErrorMessage(messageItem))
    }
    return `${errorCode} ${messageArray.join(',')}`
  }

  return `${errorCode} ${formatRpcErrorMessage(message)}`
}

export function getProtoPath(protoFile: string) {
  return join(__dirname, '../../../assets/proto', protoFile)
}

export function addUrlParams(
  url: string,
  params: { [key: string]: string | number | boolean },
  queryAlreadyExists = false,
) {
  let queryStr = queryAlreadyExists === true || url.includes('?') ? '&' : '?'
  const paramsLen = Object.keys(params).length

  Object.keys(params).map(function (key, index) {
    if (index + 1 === paramsLen) queryStr += key + '=' + params[key]
    else queryStr += key + '=' + params[key] + '&'
  })

  return url + queryStr
}

export function generatorReferenceId(prefix: string): string {
  const time = BigInt(new Date().getTime())
  const idUnique =
    (time << BigInt(22)) |
    (BigInt(randomInt(1, 999)) << BigInt(18)) |
    (BigInt(randomInt(1000, 9999)) << BigInt(0))
  return `${prefix}:${idUnique}`
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Chunks an array into smaller arrays of a specified size.
 *
 * @param array - The array to chunk.
 * @param size - The size of each chunk.
 * @returns A new array containing the chunked arrays.
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Size must be greater than 0')
  }
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size)
    result.push(chunk)
  }
  return result
}

export const encryptPassword = (password: string, salt: string): string => {
  return createHash('sha256')
    .update(salt + password)
    .digest()
    .toString('base64')
}

export const checkPasswordRegex = (password: string) => {
  const result = password.match(/^(?=.*[A-Z])(?=.*\d).+/)
  if (result && result.length > 0) {
    return true
  }

  return false
}

export const uniqueArray = (arr: string[]) => {
  return [...new Set(arr)]
}

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const regexLicensePlate = (plate: string) => {
  plate = plate.toUpperCase()
  const patterns = [/^[0-9]{2}[A-Z]{1}[0-9]{5}$/, /^[0-9]{2}[A-Z]{2}[0-9]{5}$/]
  for (const pattern of patterns) {
    if (pattern.test(plate)) {
      return true
    }
  }
  return false
}

export function generatorId(id: number | string): string {
  const time = BigInt(new Date().getTime())
  const idUnique =
    (time << BigInt(22)) |
    (BigInt(randomInt(1, 999)) << BigInt(18)) |
    (BigInt(randomInt(1000, 9999)) << BigInt(0))
  const randomString = generateRandomString(16)

  return `${id}_${idUnique}`
}

export function generateRandomString(length: number) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}
