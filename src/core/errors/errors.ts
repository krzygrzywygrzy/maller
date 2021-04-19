class DbError extends Error {
  constructor(m: string) {
    super();
    this.message = m;
  }
}

export { DbError };
