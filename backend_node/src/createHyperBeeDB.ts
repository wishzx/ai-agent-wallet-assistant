import Hypercore from 'hypercore';
import Hyperbee from 'hyperbee';

async function createHyperBeeDB() {
  const core = new Hypercore('./transactions');
  const db = new Hyperbee(core, {
    keyEncoding: 'utf-8',
    valueEncoding: 'json',
  });
  await db.ready();
  return db;
}

export default createHyperBeeDB;
