import type { AstroIntegration } from 'astro';
import configBuilder, { type Config } from './utils/configBuilder';
import loadConfig from './utils/loadConfig';

export default ({ config: _themeConfig = 'src/config.yaml' } = {}): AstroIntegration => {
  return {
    name: 'astrowind-integration',

    hooks: {
      'astro:config:setup': async ({ config, updateConfig, addWatchFile }) => {
        const virtualModuleId = 'astrowind:config';
        const resolvedVirtualModuleId = '\0' + virtualModuleId;

        const rawJsonConfig = (await loadConfig(_themeConfig)) as Config;
        const { SITE, UI } = configBuilder(rawJsonConfig);

        updateConfig({
          vite: {
            plugins: [
              {
                name: 'vite-plugin-astrowind-config',
                resolveId(id) {
                  if (id === virtualModuleId) return resolvedVirtualModuleId;
                },
                load(id) {
                  if (id === resolvedVirtualModuleId) {
                    return `
                      export const SITE = ${JSON.stringify(SITE)};
                      export const UI = ${JSON.stringify(UI)};
                    `;
                  }
                },
              },
            ],
          },
        });

        if (typeof _themeConfig === 'string') {
          addWatchFile(new URL(_themeConfig, config.root));
        }
      },
    },
  };
};
