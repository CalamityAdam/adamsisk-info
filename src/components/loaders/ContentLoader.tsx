import { ContentPaths } from '../../constants';
import { useContentLoader } from '../../hooks/useContentLoader';
import MarkdownWrapper from '../layout/MarkdownWrapper';

function ContentLoader({
  params,
  path,
}: {
  params: { slug: string };
  path: ContentPaths;
}) {
  const content = useContentLoader(path, params.slug);
  const interpolatedContent = interpolateEnvVariables(content);

  return <MarkdownWrapper>{interpolatedContent}</MarkdownWrapper>;
}

export { ContentLoader };

// pattern matches {{variableName}}
const placeholderRegex = /\{\{(\w+)\}\}/g;

// TODO: move this to a utility function
function interpolateEnvVariables(markdown: string): string {
  return markdown.replace(placeholderRegex, (match, variableName) => {
    // Prefix the variable name with "VITE_" to match Vite's environment variable naming convention
    const envVariableName = `VITE_${variableName}`;

    // If the environment variable exists, replace the placeholder with its value
    // If it doesn't exist, leave the placeholder as is
    return import.meta.env[envVariableName] || match;
  });
}
