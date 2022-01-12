export class ErrorUtil {
  static getParsedError(err) {
    const defaultMessage = 'an error has occurred, contact the restaurant';
    switch (err?.status) {
      case 500:
        return defaultMessage;
      default:
        if (err?.Error) {
          const errors = err?.Error;
          return errors?.length > 0 ? errors[0] : defaultMessage;
        } else {
          return defaultMessage;
        }
    }
  }
}
