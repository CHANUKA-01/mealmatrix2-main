try {
  require('../src/app/(dashboard)/admin/analytics/page.js');
  console.log('Import OK');
} catch (e) {
  console.error('Import failed:', e);
  process.exit(1);
}
