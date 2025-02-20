import * as fsExtra from 'fs-extra';

import { Config, Translation } from '../types';

import { createTranslation } from './utils/create-translation';
import { getCurrentTranslation } from './utils/get-current-translation';

export interface FileAction {
  path: string;
  type: 'new' | 'modified';
}

interface BuildTranslationOptions
  extends Pick<Config, 'fileFormat'>,
    Partial<Pick<Config, 'replace'>> {
  path: string;
  translation?: Translation;
}

export function buildTranslationFile({
  path,
  translation = {},
  replace = false,
  fileFormat,
}: BuildTranslationOptions): FileAction {
  const currentTranslation = getCurrentTranslation({ path, fileFormat });

  fsExtra.outputFileSync(
    path,
    createTranslation({
      currentTranslation,
      translation,
      replace,
      fileFormat,
    })
  );

  return { type: currentTranslation ? 'modified' : 'new', path };
}
