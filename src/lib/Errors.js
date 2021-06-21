class RequiredParameterError extends Error {
  constructor(parameter) {
    super();
    this.parameter = parameter;
    this.message = `${parameter} is required`;
    this.name = 'RequiredParameterError';
  }
}

class NotImplementedError extends Error {
  constructor(what) {
    super();
    this.message = `${what} is not implemented`;
    this.what = what;
    this.name = 'NotImplementedError';
  }
}

class HttpError extends Error {
  constructor(response){
    super(`${response.statusCode}: ${response.statusMessage}`);
    this.name = 'HttpError';
    this.statusCode = response.statusCode;
    this.statusMessage = response.statusMessage;
    this.response = response;
  }
}

module.exports = {
  RequiredParameterError,
  NotImplementedError,
  HttpError
};
