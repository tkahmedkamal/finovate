const asyncWrap = async <T>(
  promise: Promise<T>
): Promise<[T | null, Mapped<Error> | null]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    const err =
      error instanceof Error
        ? new Error(error.message)
        : new Error('Something went wrong, Please try again.');

    return [null, err];
  }
};

export default asyncWrap;
