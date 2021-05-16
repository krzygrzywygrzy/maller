class DbError extends Error {
  constructor(m: string) {
    super();
    this.message = m;
  }
}

class UnauthenticatedError extends Error {}

export { DbError, UnauthenticatedError };
