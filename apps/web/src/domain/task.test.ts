import { describe, it, expect } from 'vitest';
import {
  getTaskCardBg,
  isNonTodoStatus,
  isValidTaskTitle,
  TASK_CARD_BG,
  STATUS_BUTTON_CONFIG,
  STATUS_EDIT_OPTIONS,
  PRESET_ICONS,
} from './task';
import { TaskStatus } from '@/types/task';

const ALL_STATUSES: TaskStatus[] = ['todo', 'in-progress', 'completed', 'wont-do'];
const NON_TODO_STATUSES: TaskStatus[] = ['in-progress', 'completed', 'wont-do'];

describe('getTaskCardBg', () => {
  it.each([
    ['todo',        'bg-task-todo'],
    ['in-progress', 'bg-task-in-progress'],
    ['completed',   'bg-task-completed'],
    ['wont-do',     'bg-task-wont-do'],
  ] as [TaskStatus, string][])('returns %s for %s status', (status, expected) => {
    expect(getTaskCardBg(status)).toBe(expected);
  });

  it('covers every TaskStatus value', () => {
    ALL_STATUSES.forEach((s) => {
      expect(getTaskCardBg(s)).toBeTruthy();
    });
  });
});

describe('isNonTodoStatus', () => {
  it('returns false for todo', () => {
    expect(isNonTodoStatus('todo')).toBe(false);
  });

  it.each(NON_TODO_STATUSES)('returns true for %s', (status) => {
    expect(isNonTodoStatus(status)).toBe(true);
  });
});

describe('isValidTaskTitle', () => {
  it('returns true for a non-empty title', () => {
    expect(isValidTaskTitle('My Task')).toBe(true);
  });

  it('returns false for an empty string', () => {
    expect(isValidTaskTitle('')).toBe(false);
  });

  it('returns false for a whitespace-only string', () => {
    expect(isValidTaskTitle('   ')).toBe(false);
  });
});

describe('TASK_CARD_BG', () => {
  it('has an entry for every TaskStatus', () => {
    ALL_STATUSES.forEach((s) => {
      expect(TASK_CARD_BG[s]).toBeTruthy();
    });
  });
});

describe('STATUS_BUTTON_CONFIG', () => {
  it('has an entry for every non-todo status', () => {
    NON_TODO_STATUSES.forEach((s) => {
      const config = STATUS_BUTTON_CONFIG[s as keyof typeof STATUS_BUTTON_CONFIG];
      expect(config.label).toBeTruthy();
      expect(config.icon).toBeTruthy();
      expect(config.buttonBg).toBeTruthy();
    });
  });

  it('does not have an entry for todo', () => {
    expect(STATUS_BUTTON_CONFIG).not.toHaveProperty('todo');
  });
});

describe('STATUS_EDIT_OPTIONS', () => {
  it('contains all four statuses', () => {
    const values = STATUS_EDIT_OPTIONS.map((o) => o.value);
    ALL_STATUSES.forEach((s) => expect(values).toContain(s));
  });

  it('each option has a non-empty label', () => {
    STATUS_EDIT_OPTIONS.forEach((o) => expect(o.label.trim().length).toBeGreaterThan(0));
  });
});

describe('PRESET_ICONS', () => {
  it('contains at least one icon', () => {
    expect(PRESET_ICONS.length).toBeGreaterThan(0);
  });

  it('contains only non-empty strings', () => {
    PRESET_ICONS.forEach((icon) => expect(icon.trim().length).toBeGreaterThan(0));
  });
});
