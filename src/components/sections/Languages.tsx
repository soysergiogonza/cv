import type { LanguagesProps } from '@/types/cv';
import type { Language } from '@/types/cv';

export function Languages({ languages }: LanguagesProps) {
 return (
  <section className='mt-8'>
   <h2 className='text-2xl font-semibold tracking-tight mb-6'>
    {languages('sectionTitle')}
   </h2>
   <div className='space-y-4'>
    {languages.raw('LanguageList').map((lang: Language) => (
     <div key={lang.id} className='flex justify-between items-center'>
      <span>{lang.name}</span>
      <span className='text-muted-foreground'>{lang.level}</span>
     </div>
    ))}
   </div>
  </section>
 );
}
