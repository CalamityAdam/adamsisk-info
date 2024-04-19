import { useEffect, useState } from 'react';
import { ContentPaths } from '../constants';

function useContentLoader(path: ContentPaths, fileName: string): string {
  const [content, setContent] = useState('');

  useEffect(() => {
    async function loadContent() {
      try {
        const contentModule = await import(
          `../content/${path}/${fileName}.md?raw`
        );

        setContent(contentModule.default);
      } catch (error) {
        console.error(error);
        setContent(
          '# 404 - oops 😬\nError loading the content.\n[Go home.](/)'
        );
      }
    }

    loadContent();
  }, [path]);

  return content;
}

export { useContentLoader };
