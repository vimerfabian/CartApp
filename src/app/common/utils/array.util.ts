export class ArrayUtil {
  public static groupBy(xs, key) {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  public static reduce(list: any[], groupPropertyName: string) {
    const groupsList = list.reduce(
      (groups, item) => ({
        ...groups,
        [item[groupPropertyName]]: [
          ...(groups[item[groupPropertyName]] || []),
          item,
        ],
      }),
      {}
    );

    console.log('groups', groupsList);
  }
}
