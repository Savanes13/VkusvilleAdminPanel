import type { Directive } from 'vue';

// Расширяем интерфейс для добавления пользовательского свойства
interface HTMLElementWithHandlers extends HTMLElement {
  __clickOutsideHandlers__?: Map<unknown, (event: Event) => void>;
  __clickOutsideIgnoreClick?: boolean; // Флаг для игнорирования первого клика
}

// Обрабатывает клик вне элемента
const clickOutside: Directive = {
  beforeMount(el: HTMLElementWithHandlers, binding) {
    // Создаем обработчик для конкретного элемента
    const handleClickOutside = (event: Event) => {
      // Игнорируем первый клик, если установлен флаг
      if (el.__clickOutsideIgnoreClick) {
        el.__clickOutsideIgnoreClick = false; // Сбрасываем флаг
        return;
      }

      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };

    // Инициализируем Map для хранения обработчиков
    if (!el.__clickOutsideHandlers__) {
      el.__clickOutsideHandlers__ = new Map();
    }

    el.__clickOutsideHandlers__.set(binding.value, handleClickOutside);

    // Устанавливаем флаг для игнорирования первого клика
    el.__clickOutsideIgnoreClick = true;

    // Навешиваем обработчик на `document`
    document.addEventListener('click', handleClickOutside);
  },
  updated(el: HTMLElementWithHandlers, binding) {
    // Удаляем старый обработчик, если изменился `binding.value`
    const oldHandler = el.__clickOutsideHandlers__?.get(binding.oldValue);

    if (oldHandler && el.__clickOutsideHandlers__) {
      document.removeEventListener('click', oldHandler);
      el.__clickOutsideHandlers__.delete(binding.oldValue);
    }

    // Добавляем новый обработчик
    const newHandler = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };

    el.__clickOutsideHandlers__?.set(binding.value, newHandler);
    document.addEventListener('click', newHandler);
  },
  unmounted(el: HTMLElementWithHandlers) {
    // Удаляем все обработчики, связанные с этим элементом
    el.__clickOutsideHandlers__?.forEach((handler) => {
      document.removeEventListener('click', handler);
    });

    el.__clickOutsideHandlers__?.clear();
    delete el.__clickOutsideHandlers__;
  },
};

export const globalDirectives = {
  clickOutside,
};