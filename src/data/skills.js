import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useSkills() {
  const { t } = useI18n()

  return computed(() => [
    'HTML',
    'CSS',
    'PHP',
    'JavaScript',
    'Vue.js',
    'Nuxt',
    'React',
    'Next.js',
    'GraphQL',
    'jQuery',
    'Drupal',
    'WordPress/Bedrock',
    'Craft CMS',
    'Tailwind',
    'Bootstrap',
    'SCSS',
    'Vite',
    'Git',
    'VS Code',
    'Lando',
    'Photoshop',
    'Illustrator',
    'Cubase',
    'Toggl',
    'Flash',
    'react native',
    'IE6',
    t('skills.list.coffee'),
    'Chocolate',
    'Paella',
    'Googling',
  ])
}
