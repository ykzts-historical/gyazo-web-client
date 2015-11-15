import Base from './Base';

class Image extends Base {
  get storeName() {
    return 'Image';
  }

  get schema() {
    return {
      properties: {
        fileName: {
          type: 'string'
        },
        uri: {
          type: 'string'
        },
        uploadedAt: {
          type: 'string'
        }
      }
    };
  }
}

export default Image;
