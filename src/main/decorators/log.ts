import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErroeRepository: LogErrorRepository

  constructor (controller: Controller, logErroeRepository: LogErrorRepository) {
    this.controller = controller
    this.logErroeRepository = logErroeRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErroeRepository.log(httpResponse.body.stack)
    }
    return httpResponse
  }
}
