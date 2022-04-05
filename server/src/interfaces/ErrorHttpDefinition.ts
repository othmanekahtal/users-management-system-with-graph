export interface ErrorHttpDefinition {
  [x: string]: unknown
  message: string
  statusCode: number
  status: string
  name?: string
  value?: string
}
