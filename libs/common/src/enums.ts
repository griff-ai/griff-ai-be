export enum Environment {
  Local = 'local',
  Development = 'dev',
  Production = 'prod',
  Staging = 'staging',
}

export enum LogLevel {
  Debug = 'debug',
  Error = 'error',
  Log = 'log',
  Verbose = 'verbose',
  Warn = 'warn',
}

export enum SortType {
  asc = 'ASC',
  desc = 'DESC',
}

export enum APP_LOGGING_LEVEL {
  OFF = 'OFF',
  FATAL = 'FATAL',
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  TRACE = 'TRACE',
  ALL = 'ALL',
}

export enum USER_STATUS {
  NEW = 1,
  ACTIVATED = 2,
  DEACTIVATED = 3,
  REJECTED = 4,
}

export enum USER_ROLE {
  ADMIN = 1,
  NORMAL = 2,
  PROVIDER = 3,
  SUPER_ADMIN = 9,
}

export enum COMMON_STATUS {
  ACTIVATED = 1,
  IN_ACTIVATED = 2,
}

export enum GATE_TYPE {
  IN = 1,
  OUT = 2,
}
