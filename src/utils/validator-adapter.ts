import { Validation } from '../presentation/helpers/validators/validation'

export class ValidatorAdapter implements Validation {
  validate (input: any): Error | null {
    return null
  }
}
