import { computed, isRef, ref } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) => computed(() => {
    const data = args.map(arg => {
      return isRef(arg) ? arg.value : arg
    });

    return func.apply(this, data);
  });
}
