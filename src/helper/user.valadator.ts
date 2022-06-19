class UserValidator {
  validateBody(body: any): boolean {
    const isExistslRequiredFields =
      body.hasOwnProperty('username') &&
      body.hasOwnProperty('age') &&
      body.hasOwnProperty('hobbies') &&
      Array.isArray(body.hobbies)
        ? true
        : false;

    return isExistslRequiredFields;
  }
}

export const userValidator: UserValidator = new UserValidator();
