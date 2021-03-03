interface IAppConfig {
  node_env: string;
  api_port: number;

  aws: {
    buckets: {
      templates: string;
      projects: string;
    };
  };
  // api_url: string;
  // web_url: string;
}

const appConfig: IAppConfig = {
  node_env: process.env.NEXT_PUBLIC_ENV_NODE_ENV,
  api_port: Number(process.env.NEXT_PUBLIC_ENV_API_PORT),

  aws: {
    buckets: {
      templates: 'chocoanimato-backend-templates',
      projects: 'chocoanimato-backend-projects'
    }
  }
  // api_url: `${process.env.NEXT_PUBLIC_ENV_API_URL}/api`,
  // web_url: process.env.NEXT_PUBLIC_ENV_WEB_URL
};

export default appConfig;
