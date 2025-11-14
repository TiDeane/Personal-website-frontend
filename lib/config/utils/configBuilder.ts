import merge from 'lodash.merge';

export type Config = {
  site?: SiteConfig;
  ui?: unknown;
};

export interface SiteConfig {
  name: string;
  site?: string;
  base?: string;
  trailingSlash?: boolean;
}

export interface UIConfig {
  theme: string;
}

const DEFAULT_SITE_NAME = 'Tiago Deane';

const getSite = (config: Config) => {
  const _default = {
    name: DEFAULT_SITE_NAME,
    site: undefined,
    base: '/',
    trailingSlash: false,
  };

  return merge({}, _default, config?.site ?? {}) as SiteConfig;
};

const getUI = (config: Config) => {
  const _default = {
    theme: 'system',
  };

  return merge({}, _default, config?.ui ?? {});
};


export default (config: Config) => ({
  SITE: getSite(config),
  UI: getUI(config),
});
