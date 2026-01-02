/**
 * Comprehensive Test Suite for ProcessingLockManager
 * 
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' lib/conversation/__tests__/processing-lock.test.ts
 * Or add to Jest config and run: npm test
 */

import { ProcessingLockManager } from '../processing-lock';

// Test utilities
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class TestRunner {
  private passed = 0;
  private failed = 0;
  private tests: { name: string; fn: () => Promise<void> }[] = [];

  test(name: string, fn: () => Promise<void>) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('\n🧪 ProcessingLockManager Test Suite\n');
    console.log('='.repeat(50));

    for (const { name, fn } of this.tests) {
      try {
        await fn();
        console.log(`✅ ${name}`);
        this.passed++;
      } catch (error: any) {
        console.log(`❌ ${name}`);
        console.log(`   Error: ${error.message}`);
        this.failed++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`Results: ${this.passed} passed, ${this.failed} failed`);
    console.log('='.repeat(50) + '\n');

    return this.failed === 0;
  }
}

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`);
  }
}

// ========================================
// Test Suite
// ========================================

const runner = new TestRunner();

// ----------------------------------------
// Basic Lock Operations
// ----------------------------------------

runner.test('should acquire a lock on an unlocked conversation', async () => {
  const manager = new ProcessingLockManager();
  const result = manager.acquireLock('conv-1', 'bot_processing');
  assert(result === true, 'Lock should be acquired');
  manager.clearAll();
  manager.stopCleanup();
});

runner.test('should fail to acquire lock on already locked conversation', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-2', 'bot_processing');
  const result = manager.acquireLock('conv-2', 'owner_sending');
  assert(result === false, 'Second lock should fail');
  manager.clearAll();
  manager.stopCleanup();
});

runner.test('should release lock correctly', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-3', 'bot_processing');
  manager.releaseLock('conv-3');
  const lockInfo = manager.isLocked('conv-3');
  assert(lockInfo === null, 'Lock should be released');
  manager.stopCleanup();
});

runner.test('should return lock info when locked', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-4', 'bot_processing');
  const lockInfo = manager.isLocked('conv-4');
  assert(lockInfo !== null, 'Lock info should exist');
  assertEqual(lockInfo!.lock_type, 'bot_processing', 'Lock type mismatch');
  assert(lockInfo!.locked === true, 'Lock should be active');
  manager.clearAll();
  manager.stopCleanup();
});

runner.test('should return null for unlocked conversation', async () => {
  const manager = new ProcessingLockManager();
  const lockInfo = manager.isLocked('conv-nonexistent');
  assert(lockInfo === null, 'Lock info should be null for unlocked conversation');
  manager.stopCleanup();
});

// ----------------------------------------
// Lock Type Checking
// ----------------------------------------

runner.test('should correctly identify lock type with isLockedBy', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-5', 'bot_processing');
  
  const isBotLock = manager.isLockedBy('conv-5', 'bot_processing');
  const isOwnerLock = manager.isLockedBy('conv-5', 'owner_sending');
  
  assert(isBotLock === true, 'Should be locked by bot_processing');
  assert(isOwnerLock === false, 'Should not be locked by owner_sending');
  
  manager.clearAll();
  manager.stopCleanup();
});

// ----------------------------------------
// TTL Expiration
// ----------------------------------------

runner.test('should allow lock acquisition after TTL expires', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-6', 'bot_processing', 100); // 100ms TTL
  
  // Wait for lock to expire
  await delay(150);
  
  const result = manager.acquireLock('conv-6', 'owner_sending');
  assert(result === true, 'Should acquire lock after TTL expires');
  
  manager.clearAll();
  manager.stopCleanup();
});

runner.test('should return null for expired lock in isLocked', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-7', 'bot_processing', 100);
  
  await delay(150);
  
  const lockInfo = manager.isLocked('conv-7');
  assert(lockInfo === null, 'Expired lock should return null');
  manager.stopCleanup();
});

runner.test('getRemainingTime should return 0 for expired lock', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-8', 'bot_processing', 100);
  
  await delay(150);
  
  const remaining = manager.getRemainingTime('conv-8');
  assertEqual(remaining, 0, 'Remaining time should be 0');
  manager.stopCleanup();
});

runner.test('getRemainingTime should return positive value for active lock', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-9', 'bot_processing', 5000);
  
  await delay(100);
  
  const remaining = manager.getRemainingTime('conv-9');
  assert(remaining > 0 && remaining < 5000, 'Remaining time should be between 0 and 5000');
  
  manager.clearAll();
  manager.stopCleanup();
});

// ----------------------------------------
// waitForLock
// ----------------------------------------

runner.test('waitForLock should resolve true when lock is released', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-10', 'bot_processing');
  
  // Release lock after 200ms
  setTimeout(() => manager.releaseLock('conv-10'), 200);
  
  const result = await manager.waitForLock('conv-10', 1000);
  assert(result === true, 'Should resolve true when lock released');
  manager.stopCleanup();
});

runner.test('waitForLock should resolve true immediately if not locked', async () => {
  const manager = new ProcessingLockManager();
  
  const startTime = Date.now();
  const result = await manager.waitForLock('conv-unlocked', 1000);
  const elapsed = Date.now() - startTime;
  
  assert(result === true, 'Should resolve true for unlocked conversation');
  assert(elapsed < 200, 'Should resolve quickly for unlocked conversation');
  manager.stopCleanup();
});

runner.test('waitForLock should resolve false on timeout', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-11', 'bot_processing', 10000); // Long TTL
  
  const startTime = Date.now();
  const result = await manager.waitForLock('conv-11', 300);
  const elapsed = Date.now() - startTime;
  
  assert(result === false, 'Should resolve false on timeout');
  assert(elapsed >= 300, 'Should wait at least timeout duration');
  
  manager.clearAll();
  manager.stopCleanup();
});

runner.test('waitForLock should resolve true when lock expires during wait', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-12', 'bot_processing', 200); // 200ms TTL
  
  const result = await manager.waitForLock('conv-12', 1000);
  assert(result === true, 'Should resolve true when lock expires');
  manager.stopCleanup();
});

// ----------------------------------------
// Concurrent Lock Scenarios
// ----------------------------------------

runner.test('should handle multiple different conversations independently', async () => {
  const manager = new ProcessingLockManager();
  
  const lock1 = manager.acquireLock('conv-a', 'bot_processing');
  const lock2 = manager.acquireLock('conv-b', 'owner_sending');
  const lock3 = manager.acquireLock('conv-c', 'general');
  
  assert(lock1 === true, 'Lock 1 should succeed');
  assert(lock2 === true, 'Lock 2 should succeed');
  assert(lock3 === true, 'Lock 3 should succeed');
  
  assertEqual(manager.getLockCount(), 3, 'Should have 3 locks');
  
  manager.clearAll();
  manager.stopCleanup();
});

runner.test('should handle rapid lock/unlock cycles', async () => {
  const manager = new ProcessingLockManager();
  
  for (let i = 0; i < 100; i++) {
    const acquired = manager.acquireLock(`conv-rapid-${i}`, 'bot_processing');
    assert(acquired === true, `Lock ${i} should be acquired`);
    manager.releaseLock(`conv-rapid-${i}`);
  }
  
  assertEqual(manager.getLockCount(), 0, 'All locks should be released');
  manager.stopCleanup();
});

runner.test('should handle re-locking same conversation after release', async () => {
  const manager = new ProcessingLockManager();
  
  manager.acquireLock('conv-relock', 'bot_processing');
  manager.releaseLock('conv-relock');
  
  const reacquired = manager.acquireLock('conv-relock', 'owner_sending');
  assert(reacquired === true, 'Should re-acquire lock after release');
  
  const lockInfo = manager.isLocked('conv-relock');
  assertEqual(lockInfo!.lock_type, 'owner_sending', 'Lock type should be updated');
  
  manager.clearAll();
  manager.stopCleanup();
});

// ----------------------------------------
// Race Condition Simulation
// ----------------------------------------

runner.test('should prevent simultaneous bot and owner processing', async () => {
  const manager = new ProcessingLockManager();
  const results: string[] = [];
  
  // Simulate bot acquiring lock
  manager.acquireLock('conv-race', 'bot_processing', 500);
  results.push('bot_started');
  
  // Simulate owner trying to send (should fail)
  const ownerLock = manager.acquireLock('conv-race', 'owner_sending');
  if (ownerLock) {
    results.push('owner_started');
  } else {
    results.push('owner_blocked');
  }
  
  assert(results.includes('owner_blocked'), 'Owner should be blocked');
  assert(!results.includes('owner_started'), 'Owner should not start');
  
  manager.clearAll();
  manager.stopCleanup();
});

runner.test('should allow waiting for lock in race scenario', async () => {
  const manager = new ProcessingLockManager();
  const events: string[] = [];
  
  // Bot acquires lock
  manager.acquireLock('conv-wait-race', 'bot_processing', 300);
  events.push('bot_started');
  
  // Owner waits for lock
  const waitPromise = (async () => {
    const released = await manager.waitForLock('conv-wait-race', 1000);
    if (released && manager.acquireLock('conv-wait-race', 'owner_sending')) {
      events.push('owner_started');
    }
  })();
  
  // Bot finishes after 150ms
  await delay(150);
  manager.releaseLock('conv-wait-race');
  events.push('bot_finished');
  
  await waitPromise;
  
  assert(events[0] === 'bot_started', 'Bot should start first');
  assert(events.includes('owner_started'), 'Owner should eventually start');
  
  manager.clearAll();
  manager.stopCleanup();
});

// ----------------------------------------
// Edge Cases
// ----------------------------------------

runner.test('should handle releasing non-existent lock gracefully', async () => {
  const manager = new ProcessingLockManager();
  // Should not throw
  manager.releaseLock('conv-nonexistent');
  manager.stopCleanup();
});

runner.test('should handle zero TTL', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-zero-ttl', 'bot_processing', 0);
  
  // With 0 TTL, lock should expire immediately
  await delay(10);
  const lockInfo = manager.isLocked('conv-zero-ttl');
  assert(lockInfo === null, 'Lock with 0 TTL should expire');
  manager.stopCleanup();
});

runner.test('should handle very long TTL', async () => {
  const manager = new ProcessingLockManager();
  manager.acquireLock('conv-long-ttl', 'bot_processing', 3600000); // 1 hour
  
  const lockInfo = manager.isLocked('conv-long-ttl');
  assert(lockInfo !== null, 'Long TTL lock should exist');
  
  manager.clearAll();
  manager.stopCleanup();
});

runner.test('clearAll should remove all locks', async () => {
  const manager = new ProcessingLockManager();
  
  for (let i = 0; i < 10; i++) {
    manager.acquireLock(`conv-clear-${i}`, 'bot_processing');
  }
  
  assertEqual(manager.getLockCount(), 10, 'Should have 10 locks');
  
  manager.clearAll();
  
  assertEqual(manager.getLockCount(), 0, 'Should have 0 locks after clear');
  manager.stopCleanup();
});

// ----------------------------------------
// Performance Tests
// ----------------------------------------

runner.test('should handle 1000 locks without performance issues', async () => {
  const manager = new ProcessingLockManager();
  const startTime = Date.now();
  
  for (let i = 0; i < 1000; i++) {
    manager.acquireLock(`conv-perf-${i}`, 'bot_processing');
  }
  
  const elapsed = Date.now() - startTime;
  assert(elapsed < 1000, `Should complete 1000 locks in under 1s, took ${elapsed}ms`);
  
  assertEqual(manager.getLockCount(), 1000, 'Should have 1000 locks');
  
  manager.clearAll();
  manager.stopCleanup();
});

// ----------------------------------------
// Run All Tests
// ----------------------------------------

async function main() {
  const success = await runner.run();
  process.exit(success ? 0 : 1);
}

main().catch(console.error);
