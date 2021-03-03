interface IStorageConfig {
  driver: string; // 'disk' | 's3';
  disk: {
    development: {
      music: string;
    };
    production: {
      music: string;
    };
  };
  s3: {
    development: {
      music: string;
    };
    production: {
      music: string;
    };
  };
}

const storageConfig: IStorageConfig = {
  driver: process.env.NEXT_PUBLIC_ENV_STORAGE,

  disk: {
    development: {
      music: `http://localhost:${process.env.NEXT_PUBLIC_ENV_API_PORT}/public/music`
    },
    production: {
      music: `https://www.chocoanimato.com/public/music`
    }
  },
  s3: {
    development: {
      music: `https://${process.env.NEXT_PUBLIC_ENV_AWS_MUSIC_BUCKET}.s3.${process.env.NEXT_PUBLIC_ENV_AWS_DEFAULT_REGION}.amazonaws.com`
    },
    production: {
      music: `https://${process.env.NEXT_PUBLIC_ENV_AWS_MUSIC_BUCKET}.s3.${process.env.NEXT_PUBLIC_ENV_AWS_DEFAULT_REGION}.amazonaws.com`
    }
  }
};

export default storageConfig;
