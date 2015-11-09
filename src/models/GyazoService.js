import StoneSkin from 'stone-skin/with-tv4';

const Base = StoneSkin[typeof window !== 'undefined' ? 'IndexedDb' : 'MemoryDb'];

class GyazoService extends Base {
  storeName: 'GyazoService';

  schema: {
    properties: {
      name: {
        type: 'string'
      },
      uri: {
        type: 'string'
      },
      gyazoId: {
        type: 'string'
      },
      useProxy: {
        type: 'boolean'
      }
    }
  }
}

export default GyazoService;
