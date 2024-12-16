class ResponseWrapper {
  status;
  message;
  response;

  constructor(status, message, response) {
    this.status = status;
    this.message = message;
    this.response = response;
  }
}

export default ResponseWrapper;
