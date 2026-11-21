import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_PORTFOLIO } from '../data/defaultPortfolio';
import {
  countProjectsByCategory,
  filterProjects,
  getDeploymentSteps,
  hasValidationErrors,
  validateContactForm,
} from './portfolioLogic';

test('filterProjects returns all projects when category is All', () => {
  const result = filterProjects(DEFAULT_PORTFOLIO.projects, 'All');
  assert.equal(result.length, 3);
});

test('filterProjects filters accurately by specific category', () => {
  const gameProjects = filterProjects(DEFAULT_PORTFOLIO.projects, 'Game Concept');
  assert.equal(gameProjects.length, 1);
  assert.equal(gameProjects[0].title, 'GENESIS: INDIA');

  const designProjects = filterProjects(DEFAULT_PORTFOLIO.projects, 'Design Thinking');
  assert.equal(designProjects.length, 1);
  assert.equal(designProjects[0].id, 'smart-bike-rental');
});

test('countProjectsByCategory tallies each category accurately', () => {
  const counts = countProjectsByCategory(DEFAULT_PORTFOLIO.projects);
  assert.deepEqual(counts, {
    All: 3,
    'Design Thinking': 1,
    'Game Concept': 1,
    Research: 1,
  });
});

test('validateContactForm rejects empty or invalid inputs', () => {
  const errors = validateContactForm({
    name: 'A',
    email: 'invalid-email',
    subject: 'Hi',
    message: 'Too short',
  });

  assert.equal(hasValidationErrors(errors), true);
  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.subject);
  assert.ok(errors.message);
});

test('validateContactForm accepts valid contact submissions', () => {
  const errors = validateContactForm({
    name: 'Ananya Rao',
    email: 'ananya@example.com',
    subject: 'Internship Opportunity',
    message: 'Hello Baji, we would love to discuss an AI/ML engineering internship.',
  });

  assert.equal(hasValidationErrors(errors), false);
});

test('getDeploymentSteps returns structured steps for all targets', () => {
  assert.equal(getDeploymentSteps('local').length, 3);
  assert.equal(getDeploymentSteps('docker').length, 2);
  assert.equal(getDeploymentSteps('cloud').length, 3);
  assert.ok(getDeploymentSteps('local')[1].command.includes('uvicorn backend.main:app'));
});
