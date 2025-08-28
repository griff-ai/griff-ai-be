export enum LOG_FUNCTION {}

export function formatLogMessage(
  logFunc: LOG_FUNCTION,
  message: string,
  orderId?: string,
  data?: object | string,
) {
  const stringData = data
    ? `: ${typeof data === 'string' ? data : JSON.stringify(data)}`
    : ''
  return orderId
    ? `[${orderId}][${logFunc}] ${message} ${stringData}`
    : `[${logFunc}] ${message} ${stringData}`
}
