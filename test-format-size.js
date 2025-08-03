// Test script for formatSize function

// Import the formatSize function
const { formatSize } = require('./app/lib/utils');

// Test cases with different file sizes
const testCases = [
  { bytes: 0, expected: '0 Bytes' },
  { bytes: 500, expected: '500 Bytes' },
  { bytes: 1023, expected: '1023 Bytes' },
  { bytes: 1024, expected: '1 KB' },
  { bytes: 1500, expected: '1.46 KB' },
  { bytes: 1024 * 1024, expected: '1 MB' },
  { bytes: 1.5 * 1024 * 1024, expected: '1.5 MB' },
  { bytes: 1024 * 1024 * 1024, expected: '1 GB' },
  { bytes: 2.5 * 1024 * 1024 * 1024, expected: '2.5 GB' },
  { bytes: 20 * 1024 * 1024, expected: '20 MB' }, // Max file size in FileUploader
];

// Run the tests
console.log('Testing formatSize function:');
console.log('----------------------------');

testCases.forEach(({ bytes, expected }) => {
  const result = formatSize(bytes);
  const passed = result === expected;
  console.log(`${passed ? '✓' : '✗'} ${bytes} bytes => "${result}" ${passed ? '' : `(expected "${expected}")`}`);
});