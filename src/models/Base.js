import StonSkin from 'stone-skin/with-tv4';

const Base = StonSkin[typeof window !== 'undefined' ? 'IndexedDb' : 'MemoryDb'];

export default Base;
