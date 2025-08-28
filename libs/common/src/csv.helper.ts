import { NotFoundException } from '@nestjs/common'

import { checkIfFileOrDirectoryExists, getFile } from './storage.helper'

export const getExportedCSV = async (filename: string): Promise<string> => {
  const filePath = `exports/${filename}`

  if (!checkIfFileOrDirectoryExists(filePath)) {
    throw new NotFoundException('Users export not found.')
  }

  return (await getFile(filePath, 'utf8')).toString()
}

export const convertToCSV = (arrayObjects: any[]) => {
  const array = [Object.keys(arrayObjects[0])].concat(arrayObjects)
  return array
    .map((it) => {
      return Object.values(it)
        .map((item) => `"${item}"`)
        .toString()
    })
    .join('\n')
}
